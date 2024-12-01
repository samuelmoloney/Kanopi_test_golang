package healthcheck

import (
	"context"
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/sirupsen/logrus"
)

// HealthCheckResponse represents the greeting operation response.
type HealthCheckRequest struct {
	Echo string `path:"echo" maxLength:"30" example:"Hello World!" doc:"Simple echo for debug"`
}

// HealthCheckOutput represents the greeting operation request.
type HealthCheckResponse struct {
	Body struct {
		Message string `json:"message" example:"Hello world!" doc:"Echo response"`
	}
}

var HealthCheckOperation = huma.Operation{
	OperationID: "health-check",
	Method:      http.MethodGet,
	Path:        "/healthcheck/{echo}",
	Summary:     "Echo the path variable",
	Description: "Echo the path variable",
	// Middlewares: huma.Middlewares{auth.Authorizer},
	Tags: []string{"health", "check", "echo"},
}

func HealthCheckEcho(ctx context.Context, input *HealthCheckRequest) (*HealthCheckResponse, error) {
	resp := &HealthCheckResponse{}
	resp.Body.Message = input.Echo
	logrus.Infof("Echo: %s", input.Echo)
	return resp, nil
}
