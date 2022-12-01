import { elemInArray } from "../../../auxiliaryFunctions";
import {Block} from "../../../types";
import styles from "./Block.module.css";

type BlockProps = {
    block: Block,
    idsSelectedBlocks: string[],
}

const SlideBlock = (props: BlockProps) => {
    let blockStyle = {};
    if (elemInArray(props.idsSelectedBlocks, props.block.id)) {
        blockStyle = {
            border: '1px solid #000',
        }
    }
    return(
        <div className={styles.block} style={blockStyle}>

        </div>
    );
}

export {
    SlideBlock,
}