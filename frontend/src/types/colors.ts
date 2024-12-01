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

export interface BRGBColor {
    type: "brgb";
    red: number;
    green: number;
    blue: number;
    brightness: number;
}

export enum COLOR_TYPES { RGB = "rgb", HSL = "hsl", BRGB = "brgb" }

export type Color = RGBColor | HSLColor | BRGBColor;