import {Block} from "../../types";
import React from 'react';
import { BlockHelper } from "./DopHelper/BlockHelp";

type BlocksProps = {
    blocks: Block[],
    idsSelectedBlocks: string[],
    slideId: string,
    from: string,
}

const Blocks = (props: BlocksProps) => {

    return (
        <>
            {props.blocks.map(block => (
                <BlockHelper slideId={props.slideId} idsSelectedBlocks={props.idsSelectedBlocks} block={block} from={props.from} key={block.id}/>
            ))}
        </>
    );
}

export {
    Blocks,
}