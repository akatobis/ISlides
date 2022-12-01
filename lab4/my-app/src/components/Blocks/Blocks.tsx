import {Block} from "../../types";
import styles from "./Blocks.module.css";
import {SlideBlock} from "./Block/Block";
import {selectBlock} from "../../actions/blocks/blocks";
import {dispatch} from "../../state";

type BlocksProps = {
    blocks: Block[],
    idsSelectedBlocks: string[],
}

const Blocks = (props: BlocksProps) => {

    return (
        <div className={styles.blockCanvas}>
            {props.blocks.map(block => (
                <div key={block.id} className={styles.block}>
                    <button
                        className={styles.blockButton}
                        onClick={() => {dispatch(selectBlock, block.id);}}
                    >
                        <SlideBlock block={block} idsSelectedBlocks={props.idsSelectedBlocks}/>
                    </button>
                </div>
            ))}
        </div>
    );
}

export {
    Blocks,
}