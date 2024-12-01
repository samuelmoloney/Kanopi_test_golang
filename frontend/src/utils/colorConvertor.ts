import { BRGBColor, Color, COLOR_TYPES, HSLColor, RGBColor } from "../types/colors";

export const convertToCSSColor = (color: Color): string => {

    switch (color.type as COLOR_TYPES) {
        case COLOR_TYPES.RGB:
            { 
            const rgbColor = color as RGBColor;
            return `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`;
        }
        case COLOR_TYPES.HSL:
            {
            const hslColor = color as HSLColor;
            return `hsl(${hslColor.hue}, ${hslColor.saturation}%, ${hslColor.lightness}%)`;
            }
        case COLOR_TYPES.BRGB:
            {
            const brgbColor = color as BRGBColor;
            return BRGBtoRGBstring(brgbColor);
            }
        default:
            throw new Error(`Unknown color type`);
        }
};

const BRGBtoRGBstring = (color: BRGBColor): string => {

    // because these functions are only used in the convertToCSSColor function, we can define them here
    const normalize = (value: number) => value / 10000;
    const scaleToRgb = (value: number, brightness: number) =>
        Math.round(normalize(value) * normalize(brightness) * 255);

 
    const red = scaleToRgb(color.red, color.brightness);
    const green = scaleToRgb(color.green, color.brightness);
    const blue = scaleToRgb(color.blue, color.brightness);

    return`rgb(${red}, ${green}, ${blue})`;
}

export const coverntColorToText = (color: Color): string => {

    if(Object.values(COLOR_TYPES).includes(color.type as COLOR_TYPES) === false) {
        throw new Error(`Unknown color type`);
    }

    switch (color.type as COLOR_TYPES) {
        case COLOR_TYPES.RGB:
            { const rgbColor = color as RGBColor;
            return `RGB: ${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue}`; }
        case COLOR_TYPES.HSL:
            {
            const hslColor = color as HSLColor;
            return `HSL: ${hslColor.hue.toFixed(0)}, ${hslColor.saturation.toFixed(0)}%, ${hslColor.lightness.toFixed(0)}%`;
            }
        case COLOR_TYPES.BRGB:
            {
            const brgbColor = color as BRGBColor;
            return `BRGB: ${brgbColor.red}, ${brgbColor.green}, ${brgbColor.blue}, ${brgbColor.brightness.toFixed(0)}`;
            }
        default:
            throw new Error(`Unknown color type`);
    }



};


