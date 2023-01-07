import {SlideBlock} from "./../Block/Block";
import styles from './BlockHelp.module.css'
import {Block} from "../../../types";
import React, {CSSProperties, useState} from 'react'
import {selectBlock} from "./../../../actions/block";
import {dispatch} from "./../../../state";
import useDragger from "../../../hooks/useDragger";
import useResizer from "../../../hooks/useResizer";
import {elemInArray} from "../../../auxiliaryFunctions";

type propsBlockHelp = {
    idsSelectedBlocks: string[],
    slideId: string,
    block: Block,
    refs: React.MutableRefObject<HTMLDivElement[]>,
    from: string,
}

export function BlockHelper(props:propsBlockHelp) {    
    const [pos,setPos] = React.useState<
    {
        x:number,
        y:number
    }>(
        {
            x:props.block.coordinatesX,
            y:props.block.coordinatesY,
        });

    const [size,setSize] = React.useState<
    {
        width:number,
        height:number
    }>(
        {
            width:props.block.width,
            height:props.block.height
        });

    const addRef = (el: HTMLDivElement|null , id:string) => {
        if(el && !props.refs.current.includes(el) && !props.idsSelectedBlocks.includes(id)){
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
        refs: {
            ref: ref,
            refBottom: refBottom,
            refLeft: refLeft,
            refRight: refRight,
            refTop: refTop,
        },
        setSize,
        setPos,
    });

    useDragger(
    {
        block: props.block,
        node: document.getElementById(props.block.id),
        ref: ref,
        setPos,
    });

    let dragStyle = {} as CSSProperties;
    if (!elemInArray(props.idsSelectedBlocks, props.block.id)) {
        dragStyle = {
            border: "none",
            width: "0px"
        }
    }

    let blockStyle = {} as CSSProperties;
    if (props.from !== "navigation") {
        blockStyle = {
            top:`${pos.y}`+`px`,
            left:`${pos.x}`+`px`,
            width:`${size.width}`+`px`,
            height:`${size.height}`+`px`,
        }
    } else {
        let slideCoordinates = {} as DOMRect;
        /*if (document.getElementById("WorkZone")) {
            let workZoneCoordinates = document.getElementById("workZone")!.getBoundingClientRect();
            console.log("wzTop: " + workZoneCoordinates.top, "wzLeft: " + workZoneCoordinates.left);
        }*/
        if (document.getElementById(props.slideId)) {
            slideCoordinates = document.getElementById(props.slideId)!.getBoundingClientRect();
        }
        blockStyle = {
            position: "absolute",
            top:`${props.block.coordinatesY - slideCoordinates.top}`+`px`,
            left:`${props.block.coordinatesX - slideCoordinates.left}`+`px`,
            width:`${props.block.width}`+`px`,
            height:`${props.block.height}`+`px`,
        }
    }

    return (
        <div id={props.block.id} className={styles.resizeable} style={
            {
                ...dragStyle,
            position: "absolute",
                ...blockStyle

        }}>

            <div ref={refLeft} className={styles.resizer_l} style={dragStyle}></div>
            <div ref={refTop} className={styles.resizer_t} style={dragStyle}></div>
            <div ref={refRight} className={styles.resizer_r} style={dragStyle}></div>
            <div ref={refBottom} className={styles.resizer_b} style={dragStyle}></div>
            <div className={styles.block}  ref={ref}
                onMouseDown={()=>{ if (props.from !== "navigation") {dispatch(selectBlock, props.block.id)}}}>
                <SlideBlock slideId={props.slideId} block={props.block} idsSelectedBlocks={props.idsSelectedBlocks}/>
            </div>
        </div>
)
}