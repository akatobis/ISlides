import {Block} from "../../types";
import styles from "./Blocks.module.css";
import {SlideBlock} from "./Block/Block";
import React from 'react';
import { BlockHelper } from "./DopHelper/BlockHelp";

type BlocksProps = {
    blocks: Block[],
    idsSelectedBlocks: string[],
}

const Blocks = (props: BlocksProps) => {
    const refs = React.useRef<HTMLDivElement[]>([])
    refs.current = [];
    React.useEffect(()=>{
        refs.current.forEach((element,index) => {
            if(!props.idsSelectedBlocks.includes(element.id)) {
                refs.current.splice(index,1);
            }
        });
    },[])
    return (
        <div className={styles.blockCanvas}>
            {props.blocks.map(block => (
                <BlockHelper refs={refs} block={block} idsSelectedBlocks={props.idsSelectedBlocks}/>
            ))}
        </div>
    );
}

export {
    Blocks,
}