import { Color } from "../types/colors";

export const convertToCSSColor = (color: Color): string => {
    if (color.type === "rgb") {
        // Convert RGB color to CSS `rgb()` format
        return `rgb(${color.red}, ${color.green}, ${color.blue})`;
    } else if (color.type === "hsl") {
        // Convert HSL color to CSS `hsl()` format
        return `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;
    } else {
        throw new Error(`Unknown color type`);
    }
};

export const coverntColorToText = (color: Color): string => {
    if (color.type === "rgb") {
        return `RGB: ${color.red}, ${color.green}, ${color.blue}`;
    } else if (color.type === "hsl") {
        return `HSL: ${color.hue.toFixed(0)}, ${color.saturation.toFixed(0)}%, ${color.lightness.toFixed(0)}%`;
    }
    throw new Error(`Unknown color type`);
};