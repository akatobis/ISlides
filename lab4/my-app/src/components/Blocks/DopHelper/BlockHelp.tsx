import {SlideBlock} from "./../Block/Block";
import styles from './BlockHelp.module.css'
import {Block} from "../../../types";
import React from 'react'
import {selectBlock} from "./../../../actions/blocks/blocks";
import {dispatch} from "./../../../state";
import {resizeBlock} from './../../../actions/block';
import useDragger from "../../../hooks/useDragger";
import useResizer from "../../../hooks/useResizer";

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
    const ref = React.useRef<HTMLDivElement>(null);
    const refLeft = React.useRef<HTMLDivElement>(null);
    const refTop = React.useRef<HTMLDivElement>(null);
    const refRight = React.useRef<HTMLDivElement>(null);
    const refBottom = React.useRef<HTMLDivElement>(null);

    useResizer(
        {
            block: props.block, 
            refs:{
                ref: ref,
                refBottom: refBottom,
                refLeft: refLeft,
                refRight: refRight,
                refTop: refTop
            }
        })
    useDragger(
        {
            block: props.block,
            ref: ref
        })

    return (
        <div ref={ref} id={props.block.id} className={styles.resizeable} style={
            { 
                position: "absolute",
                top:`${props.block.coordinatesY}`+`px`,
                left:`${props.block.coordinatesX}`+`px`,
                width:`${props.block.width}`+`px`,
                height:`${props.block.height}`+`px`,
            }
        }>
            <div ref={refLeft} className={styles.resizer_l}></div>
            <div ref={refTop} className={styles.resizer_t}></div>
            <div ref={refRight} className={styles.resizer_r}></div>
            <div ref={refBottom} className={styles.resizer_b}></div>
            <div className={styles.block} id={props.block.id} ref={(el)=>addRef(el,props.block.id)} 
                onMouseUp={()=>{dispatch(selectBlock, props.block.id)}}>
                <SlideBlock block={props.block} idsSelectedBlocks={props.idsSelectedBlocks}/>
            </div>
        </div>
)
}