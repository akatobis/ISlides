import {elemInArray} from "../../../auxiliaryFunctions";
import {Block, FigureType, TypeBlock, Figure} from "../../../types";
import {Ellipse} from "./Figures/Ellipse";
import {Rectangle} from "./Figures/Rectangle";
import {Triangle} from "./Figures/Triangle";
import { useState } from "react";
import { changeText } from "../../../actions/block";
import { dispatch } from "../../../state";
import styles from "./Block.module.css"

type BlockProps = {
    block: Block,
    idsSelectedBlocks: string[],
}

// type TextBlock = {
//   typeBlock: TypeBlock.text;
//   innerString: string;
//   isBold: boolean;
//   isItalic: boolean;
//   isStrikethrough: boolean;
//   isUnderline: boolean;
//   color: string;
//   font: string;
//   fontSize: number;
// };

const SlideBlock = (props: BlockProps) => {
    let textBlockStyle = {};
    if (props.block.content.typeBlock === TypeBlock.text) {
        const textBlock = props.block.content;
        textBlockStyle = {
            fontFace: textBlock.font,
            color: textBlock.color,
            fontSize: textBlock.fontSize.toString() + 'px',
        }

        if (textBlock.isBold) {
            textBlockStyle = {
                ...textBlockStyle,
                fontWeight: 'bold',
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
                textDecoration: 'line-through',
            }
        }
        if (textBlock.isUnderline) {
            textBlockStyle = {
                ...textBlockStyle,
                textDecoration: 'underline ' + textBlock.color,
            }
        }

        if (elemInArray(props.idsSelectedBlocks, props.block.id) || props.block.content.innerString === '' || props.block.content.innerString === undefined) {
            textBlockStyle = {
                ...textBlockStyle,
                border: '1px solid #000',
            }
        }
    }

    if (props.block.content.typeBlock === TypeBlock.text) {
         return (
            <input className={styles.textBlock} style={textBlockStyle} onChange={(e) => dispatch(changeText, e.target.value)}></input>
        );
    }
    if (props.block.content.typeBlock === TypeBlock.figure) {
        const figure: Figure = props.block.content;

        if (figure.type.figureType === FigureType.ellipse) {
            return (
                <Ellipse block={props.block} figure={figure}/>
            );
        }

        if (figure.type.figureType === FigureType.rectangle) {
            return (
                <Rectangle block={props.block} figure={figure}/>
            );
        }

        if (figure.type.figureType === FigureType.triangle) {
            return (
                <Triangle block={props.block} figure={figure}/>
            );
        }
         return (
            <div className={styles.block} ></div>
        );
    }
    if (props.block.content.typeBlock === TypeBlock.image) {
         return (
            <img className={styles.image} src={props.block.content.imageBase64}></img>
        );
    }
    return (
        <div className={styles.block} ></div>
    );
}

export {
    SlideBlock,
}