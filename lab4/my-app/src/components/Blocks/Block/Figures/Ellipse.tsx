import {Block, Figure, TypeBlock} from "../../../../types";

type FigureProps = {
    block: Block;
    figure: Figure;
}

const Ellipse = (props: FigureProps) => {
    return (
        <svg width={props.block.width} height={props.block.height}>
            <ellipse
                cx={props.block.width / 2}
                cy={props.block.height / 2}
                rx={props.block.width / 2 - props.figure.border / 2}
                ry={props.block.height / 2 - props.figure.border / 2}
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