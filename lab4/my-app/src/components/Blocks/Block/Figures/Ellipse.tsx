import {Block, Figure} from "../../../../types";
import React from 'react'

type FigureProps = {
    block: Block;
    figure: Figure;
    pos: {x: number, y: number};
    size: {width: number, height: number};
}

const Ellipse = (props: FigureProps) => {
    return (   
        <svg width={props.size.width} height={props.size.height}>
            <ellipse
                cx={props.size.width/2}
                cy={props.size.height/2}
                rx={props.size.width / 2 - props.figure.border / 2}
                ry={props.size.height / 2 - props.figure.border / 2}
                stroke={props.figure.colorBorder}
                fill={props.figure.colorFill}
                strokeWidth={props.figure.border}
            />
        </svg>
    );
}

export {
    Ellipse,
}