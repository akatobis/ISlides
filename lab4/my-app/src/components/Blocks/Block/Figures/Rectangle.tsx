import {Block, Figure} from "../../../../types";

type FigureProps = {
    block: Block;
    figure: Figure;
}

const Rectangle = (props: FigureProps) => {
    return (
        <svg width={props.block.width} height={props.block.height}>
            <rect
                x={props.figure.border}
                y={props.figure.border}
                width={props.block.width - props.figure.border * 2}
                height={props.block.height - props.figure.border * 2}
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