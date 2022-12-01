import { elemInArray } from "../../../auxiliaryFunctions";
import {Block, TypeBlock} from "../../../types";
import styles from "./Block.module.css";

type BlockProps = {
    block: Block,
    idsSelectedBlocks: string[],
}

const SlideBlock = (props: BlockProps) => {
    let textBlockStyle = {};
    if (props.block.content.typeBlock === TypeBlock.text) {
        if (elemInArray(props.idsSelectedBlocks, props.block.id) || props.block.content.innerString === '') {
            textBlockStyle = {
                border: '1px solid #000',
            }
        }
    }

    if (props.block.content.typeBlock === TypeBlock.text) {
         return (
            <input className={styles.textBlock} style={textBlockStyle}></input>
        );
    }
    if (props.block.content.typeBlock === TypeBlock.figure) {
         return (
            <div className={styles.block} ></div>
        );
    }
    return (
        <div className={styles.block} ></div>
    );
}

export {
    SlideBlock,
}