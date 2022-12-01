import { useState } from "react";
import { changeText } from "../../../actions/block";
import { elemInArray } from "../../../auxiliaryFunctions";
import { dispatch } from "../../../state";
import {Block, TypeBlock} from "../../../types";
import styles from "./Block.module.css";

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

        if (elemInArray(props.idsSelectedBlocks, props.block.id) || props.block.content.innerString === '' || props.block.content.innerString === undefined) {
            textBlockStyle = {
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