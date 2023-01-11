import {Block, Figure} from "../../../../types";
import React from 'react'

type FigureProps = {
    block: Block;
    figure: Figure;
    pos: {x: number, y: number};
    size: {width: number, height: number};
}

const Triangle = (props: FigureProps) => {
    return (
        <svg width={props.size.width} height={props.size.height}>
            <polygon
                points={props.figure.border + "," + (props.size.height - props.figure.border) + " " + (props.size.width / 2) + "," + props.figure.border + " " + (props.size.width - props.figure.border) + "," + (props.size.height - props.figure.border)}
                stroke={props.figure.colorBorder}
                fill={props.figure.colorFill}
                strokeWidth={props.figure.border}
            />
        </svg>
    );
}

export {
    Triangle,
}