import {elemInArray} from "../../../auxiliaryFunctions";
import {Block, FigureType, TypeBlock, Figure} from "../../../types";
import {Ellipse} from "./Figures/Ellipse";
import styles from "./Block.module.css";
import {Rectangle} from "./Figures/Rectangle";
import {Triangle} from "./Figures/Triangle";

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
    return (
        <div className={styles.block} ></div>
    );
}

export {
    SlideBlock,
}