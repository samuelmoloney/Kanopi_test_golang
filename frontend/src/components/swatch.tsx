import React from "react";
import { Color } from "../types/colors"; // Assume the Color type is defined here
import { convertToCSSColor, coverntColorToText } from "../utils/colorConvertor";


interface SwatchProps {
    color: Color;
}

class Swatch extends React.Component<SwatchProps> {
    render() {
        const { color } = this.props;
        
        const style = {
            backgroundColor: convertToCSSColor(color),
            width: "100px",
            height: "100px",
            margin: "5px",
        };
        const containerStyle = {
            display: "flex",
            flexDirection: "column" as const,
            justifyContent: "center",
            alignItems: "center",
     
            margin: "10px",
        };

        return (
            <div style={containerStyle}>
                {/* Swatch */}
                <div style={style}></div>

                {/* Color Details */}
                <div style={{ marginTop: "5px" }}>
                    <p>{coverntColorToText(color)}</p>
                </div>
            </div>
        );
    }
}

export default Swatch;
