import {Block} from "../../types";
import React from 'react';
import { BlockHelper } from "./DopHelper/BlockHelp";

type BlocksProps = {
    blocks: Block[],
    idsSelectedBlocks: string[],
}

const Blocks = (props: BlocksProps) => {

    return (
        <>
            {props.blocks.map(block => (
                <BlockHelper idsSelectedBlocks={props.idsSelectedBlocks} block={block} key={block.id}/>
            ))}
        </>
    );
}

export {
    Blocks,
}