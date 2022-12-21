import {Block} from "../../types";
import styles from "./Blocks.module.css";
import {SlideBlock} from "./Block/Block";
import {selectBlock} from "../../actions/blocks/blocks";
import {dispatch} from "../../state";
import React from 'react-dom';

type BlocksProps = {
    blocks: Block[],
    idsSelectedBlocks: string[],
}

const Blocks = (props: BlocksProps) => {
    return (
        <div className={styles.blockCanvas}>
            {props.blocks.map(block => (
                <div className={styles.block} key={block.id} id={block.id} style={
                    {
                        position: "absolute",
                        top:`${block.coordinatesY}`+`px`,
                        left:`${block.coordinatesX}`+`px`,
                    }
                }>
                <button
                    className={styles.blockButton}
                    onClick={()=>{dispatch(selectBlock, block.id)}
                    }
                >
                    <SlideBlock block={block} idsSelectedBlocks={props.idsSelectedBlocks}
                />
                </button>
            </div>
            ))}
        </div>
    );
}

export {
    Blocks,
}