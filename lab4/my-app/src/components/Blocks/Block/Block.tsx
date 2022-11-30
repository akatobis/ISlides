import {Block} from "../../../types";
import styles from "./Block.module.css";

type BlockProps = {
    block: Block;
}

const SlideBlock = (props: BlockProps) => {
    return(
        <div className={styles.block}>

        </div>
    );
}

export {
    SlideBlock,
}