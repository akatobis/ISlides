import {Block, Figure} from "../../../../types";
import React from 'react'

type FigureProps = {
    block: Block;
    figure: Figure;
    pos: {x: number, y: number};
    size: {width: number, height: number};
}

const Rectangle = (props: FigureProps) => {
    return (
        <svg width={props.size.width} height={props.size.height}>
            <rect
                x={props.figure.border}
                y={props.figure.border}
                width={props.size.width - props.figure.border * 2}
                height={props.size.height - props.figure.border * 2}
                stroke={props.figure.colorBorder}
                fill={props.figure.colorFill}
                strokeWidth={props.figure.border}
            />
        </svg>
    );
}

export {
    Rectangle,
}