import {SlideBlock} from "./../Block/Block";
import styles from './BlockHelp.module.css'
import {Block} from "../../../types";
import React from 'react'
import {selectBlock} from "./../../../actions/blocks/blocks";
import {dispatch} from "./../../../state";

type propsBlockHelp = {
    idsSelectedBlocks: string[],
    block: Block,
    refs: React.MutableRefObject<HTMLDivElement[]>,
}

export function BlockHelper(props:propsBlockHelp) {
    const [pos,setPos] = React.useState<{x:number,y:number}>();
    const addRef = (el: HTMLDivElement|null , id:string) => {
        if(el && !props.refs.current.includes(el) && props.idsSelectedBlocks.includes(id)){
            props.refs.current.push(el);
        }
    }
    return (
        <div className={styles.block} ref={(el)=>addRef(el,props.block.id)} key={props.block.id} id={props.block.id} style={
            {
                position: "absolute",
                top:`${props.block.coordinatesY}`+`px`,
                left:`${props.block.coordinatesX}`+`px`,
            }
        }>
            <div className="resizer-l" id={`${props.block.id}-l`}></div>
            <div className="resizer-t" id={`${props.block.id}-t`}></div>
            <div className="resizer-r" id={`${props.block.id}-r`}></div>
            <div className="resizer-b" id={`${props.block.id}-b`}></div>
            <button
                className={styles.blockButton}
                onClick={()=>{dispatch(selectBlock, props.block.id)}
                }
            >
                <SlideBlock block={props.block} idsSelectedBlocks={props.idsSelectedBlocks}
            />
            </button>
        </div>
)
}