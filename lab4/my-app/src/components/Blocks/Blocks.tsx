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
        <div>
            {props.blocks.map(block => (
                <BlockHelper slideId={props.slideId} idsSelectedBlocks={props.idsSelectedBlocks} block={block} refs={refs} key={block.id}/>
            ))}
        </div>
    );
}

export {
    Blocks,
}