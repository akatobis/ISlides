import {Block, Figure, TypeBlock} from "../../../../types";
import React from 'react'

type FigureProps = {
    block: Block;
    figure: Figure;
}

const Triangle = (props: FigureProps) => {
    return (
        <svg width={props.block.width} height={props.block.height}>
            <polygon
                points={props.figure.border + "," + (props.block.height - props.figure.border) + " " + (props.block.width / 2) + "," + props.figure.border + " " + (props.block.width - props.figure.border) + "," + (props.block.height - props.figure.border)}
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