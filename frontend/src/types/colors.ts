export interface RGBColor {
    type: "rgb";
    red: number;
    green: number;
    blue: number;
}

export interface HSLColor {
    type: "hsl";
    hue: number;
    saturation: number;
    lightness: number;
}

export type Color = RGBColor | HSLColor;