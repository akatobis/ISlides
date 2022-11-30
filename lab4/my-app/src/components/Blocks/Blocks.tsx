import {Block} from "../../types";
import styles from "./Blocks.module.css";
import {SlideBlock} from "./Block/Block";
import {selectBlock} from "../../actions/blocks/blocks";
import {dispatch} from "../../state";

type BlocksProps = {
    blocks: Block[];
}

const Blocks = (props: BlocksProps) => {

    return (
        <div className={styles.blockCanvas}>
            {props.blocks.map(block => (
                <div key={block.id} className={styles.block}>
                    <button
                        className={styles.blockButton}
                        onClick={(e) => {
                            dispatch(selectBlock, block.id);
                            e.target.classList.toggle(styles.blockBorderOn);
                        }}
                    >
                        <SlideBlock block={block}/>
                    </button>
                </div>
            ))}
        </div>
    );
}

export {
    Blocks,
}