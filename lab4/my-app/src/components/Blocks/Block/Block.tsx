import {Block, FigureType, TypeBlock, Figure} from "../../../types";
import {Ellipse} from "./Figures/Ellipse";
import {Rectangle} from "./Figures/Rectangle";
import {Triangle} from "./Figures/Triangle";
import styles from "./Block.module.css";
import {Text} from "./Text/Text";

type BlockProps = {
    block: Block,
    slideId: string,
    idsSelectedBlocks: string[],
    pos: {x: number, y: number},
    size: {width: number, height: number}
}

const SlideBlock = (props: BlockProps) => {

    let textBlockStyle = {};
    if (props.block.content.typeBlock === TypeBlock.text) {
        const textBlock = props.block.content;
        textBlockStyle = {
            fontFamily: textBlock.font,
            color: textBlock.color,
            fontSize: textBlock.fontSize.toString() + 'px',
        }

        if (textBlock.isBold) {
            textBlockStyle = {
                ...textBlockStyle,
                fontWeight: 700,
            }
        }
        if (textBlock.isItalic) {
            textBlockStyle = {
                ...textBlockStyle,
                fontStyle: 'italic',
            }
        }
        if (textBlock.isStrikethrough) {
            textBlockStyle = {
                ...textBlockStyle,
                textDecoration: 'line-through ' + textBlock.color,
            }
        }
        if (textBlock.isUnderline) {
            textBlockStyle = {
                ...textBlockStyle,
                textDecoration: 'underline ' + textBlock.color,
            }
        }

        if (props.idsSelectedBlocks.includes(props.block.id) || props.block.content.innerString === '' || props.block.content.innerString === undefined) {
            textBlockStyle = {
                ...textBlockStyle,
                border: '1px solid #000',
            }
        }
    }

    if (props.block.content.typeBlock === TypeBlock.text) {
         return (
            <Text size={props.size} pos={props.pos} block={props.block} idsSelectedBlocks={props.idsSelectedBlocks}></Text>
        );
    }
    if (props.block.content.typeBlock === TypeBlock.figure) {
        const figure: Figure = props.block.content;

        if (figure.type.figureType === FigureType.ellipse) {
            return (
                <Ellipse size={props.size} pos={props.pos} block={props.block} figure={figure}/>
            );
        }

        if (figure.type.figureType === FigureType.rectangle) {
            return (
                <Rectangle size={props.size} pos={props.pos} block={props.block} figure={figure}/>
            );
        }

        if (figure.type.figureType === FigureType.triangle) {
            return (
                <Triangle size={props.size} pos={props.pos} block={props.block} figure={figure}/>
            );
        }
         return (
            <div className={styles.block} ></div>
        );
    }
    if (props.block.content.typeBlock === TypeBlock.image) {
         return (
            <img style={{
                width: props.size.width,
                height: props.size.height,
                zIndex: 1,
                pointerEvents: "fill"
            }} 
            src={props.block.content.imageBase64} alt=""></img>
        );
    }
    return (
        <div className={styles.block} ></div>
    );
}

export {
    SlideBlock,
}