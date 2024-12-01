package swatches

import (
	"context"
	"math/rand"
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/sirupsen/logrus"
)

// the color structure, based on type we will fill the respective fields
type Color struct {
	Type string `json:"type"`
	// RGB color fields
	Red   *int `json:"red,omitempty"`
	Green *int `json:"green,omitempty"`
	Blue  *int `json:"blue,omitempty"`
	// HSL color fields
	Hue        *float32 `json:"hue,omitempty"`
	Saturation *float32 `json:"saturation,omitempty"`
	Lightness  *float32 `json:"lightness,omitempty"`
}

func generateRandomColor(colorType string) (*Color, error) {
	switch colorType {
	case "rgb":
		return RGBColor(rand.Intn(256), rand.Intn(256), rand.Intn(256)), nil
	case "hsl":
		return HSLColor(rand.Float32()*360, rand.Float32()*100, rand.Float32()*100), nil
	default:
		return &Color{}, huma.NewError(http.StatusBadRequest, "Invalid color type")
	}
}

func RGBColor(R int, G int, B int) *Color {
	return &Color{Type: "rgb", Red: &R, Green: &G, Blue: &B}
}

func HSLColor(H float32, S float32, L float32) *Color {
	return &Color{Type: "hsl", Hue: &H, Saturation: &S, Lightness: &L}
}

// ////// Get a single random color
var SwatchesGetColorOperation = huma.Operation{
	OperationID: "swatches-get-random-color",
	Method:      http.MethodGet,
	Path:        "/swatches/get-random-color/{colorType}",
	Summary:     "",
	Description: "",
}

type ColorRequest struct {
	ColorType string `path:"colorType" doc:" 'rgb' or 'hsl'" `
}

type ColorResponse struct {
	Body struct {
		Color Color `json:"color" doc:"returns a color object"`
	}
}

func GetRandomColor(ctx context.Context, input *ColorRequest) (*ColorResponse, error) {

	var color, err = generateRandomColor(input.ColorType)
	if err != nil {
		return nil, err
	}
	resp := &ColorResponse{}
	resp.Body.Color = *color
	logrus.Info("Generated color: ", resp.Body.Color)
	return resp, nil
}

//////// Get multiple random colors

var SwatchesGetMultipleColorsOperation = huma.Operation{
	OperationID: "swatches-get-multiple-random-colors",
	Method:      http.MethodGet,
	Path:        "/swatches/get-multiple-random-colors/{amount}",
	Summary:     "",
	Description: "",
}

type MultipleColorsRequest struct {
	Amount int `path:"amount" doc:"The number of colors to generate"`
}
type MultipleColorsResponse struct {
	Body struct {
		Colors []Color `json:"colors" doc:"returns a list of color objects"`
	}
}

func GetMultipleRandomColors(ctx context.Context, input *MultipleColorsRequest) (*MultipleColorsResponse, error) {

	var colors []Color
	for i := 0; i < input.Amount; i++ {
		colorType := []string{"rgb", "hsl"}[rand.Intn(2)]
		color, err := generateRandomColor(colorType)
		if err != nil {
			return nil, err
		}
		colors = append(colors, *color)
	}
	resp := &MultipleColorsResponse{}
	resp.Body.Colors = colors
	logrus.Info("Generated colors: ", resp.Body.Colors)
	return resp, nil
}
