import {Block} from "../../types";
import styles from "./Blocks.module.css";
import {SlideBlock} from "./Block/Block";
import {selectBlock} from "../../actions/block";
import {dispatch} from "../../state";
import React from 'react';
import { BlockHelper } from "./DopHelper/BlockHelp";

type BlocksProps = {
    blocks: Block[],
    idsSelectedBlocks: string[],
    slideId: string,
    from: string,
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
        <>
            {props.blocks.map(block => (
                <BlockHelper slideId={props.slideId} idsSelectedBlocks={props.idsSelectedBlocks} block={block} refs={refs} from={props.from} key={block.id}/>
            ))}
        </>
    );
}

export {
    Blocks,
}