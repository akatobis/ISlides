import {SlideBlock} from "../Block/Block";
import styles from './BlockHelp.module.css'
import {Block} from "../../../types";
import React, {CSSProperties} from 'react'
import {selectBlock} from "../../../actions/block";
import {dispatch} from "../../../state";
import useDragAndDrop from "../../../hooks/useDragAndDrop";
import useResizer from "../../../hooks/useResizer";
import { elemInArray } from "../../../auxiliaryFunctions";

type propsBlockHelp = {
    idsSelectedBlocks: string[],
    slideId: string,
    block: Block,
    from: string,
}

export function BlockHelper(props:propsBlockHelp) {
    const [pos,setPos] = React.useState<
    {
        x: number,
        y: number,
    }>(
        {
            x: props.block.coordinatesX,
            y: props.block.coordinatesY,
        })

    const [size,setSize] = React.useState<
    {
        width: number,
        height: number,
    }>(
        {
            width: props.block.width,
            height: props.block.height,
        })

    React.useEffect(()=>{
        if(props.block.coordinatesX != pos.x || props.block.coordinatesY != pos.y)
        {
            setPos({
                x: props.block.coordinatesX,
                y: props.block.coordinatesY,
            })

        }
        if(props.block.width != size.width || props.block.height != size.height)
        {
            setSize({
                width: props.block.width,
                height: props.block.height,
            })
        }
    },[props.block])

    const ref = React.useRef<HTMLDivElement>(null)
    const refLeft = React.useRef<HTMLDivElement>(null)
    const refTop = React.useRef<HTMLDivElement>(null)
    const refRight = React.useRef<HTMLDivElement>(null)
    const refBottom = React.useRef<HTMLDivElement>(null)

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
    })

    useDragAndDrop(
    {
        block: props.block,
        ref: ref,
        setPos,
        idsSelectedBlocks: props.idsSelectedBlocks,
    })

    let dragStyle = {} as CSSProperties;
    if (!elemInArray(props.idsSelectedBlocks, props.block.id)) {
        dragStyle = {
            border: "none",
            width: "0px",
            position:"absolute",
        }
    } else {
        dragStyle = {
            border: `2px solid black`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            position:"absolute",
        }
    }

    let borderStyle = {} as CSSProperties
    if(!props.idsSelectedBlocks.includes(props.block.id))
    {
        borderStyle = {
            border: "none",
            width: "0px",
            height: "0px",
            position:"absolute",
        }
    } else {
        borderStyle = {
            border: `0.5px solid black`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            position:"absolute",
        }
    }

    let blockStyle = {} as CSSProperties;
    let id: string = props.block.id;
    if (props.from !== "navigation") {
        blockStyle = {
            top:`${pos.y}px`,
            left:`${pos.x}px`,
            width:`${size.width}px`,
            height:`${size.height}px`,
        }
    } else {
        id += "-nav";
        let slideCoordinates = {} as DOMRect;
        if (document.getElementById("slide")) {
            slideCoordinates = document.getElementById("slide")!.getBoundingClientRect();
        }
        blockStyle = {
            position: "absolute",
            top:`${props.block.coordinatesY - slideCoordinates.top}px`,
            left:`${props.block.coordinatesX - slideCoordinates.left}px`,
            width:`${props.block.width}px`,
            height:`${props.block.height}px`,
        }
    }

    return (
        <div id={id} style={
            {
                ...blockStyle,
                ...dragStyle,
                position: "absolute",
            }
        }>
            <div style={
                {
                    ...borderStyle,
                    height:`${size.height+2}px`,
                    width:`-2x`,
                    top:`-2px`,
                    left:`-2px`,
                    zIndex: 2,
                }
            }>
                <div ref={refLeft} className={styles.resizer_l} style={dragStyle}></div>
            </div>
            <div style={
                {
                    ...borderStyle,
                    height:`${size.height+2}px`,
                    width:'-2px',
                    top:"-2px",
                    left:"auto",
                    right:"-2px",
                    zIndex: 2,
                }
            }>
                <div ref={refRight} className={styles.resizer_r} style={dragStyle}></div>
            </div>
            <div style={
                {
                    ...borderStyle,
                    height:`0px`,
                    width:`${size.width}px`,
                    top:"-2px",
                    left:"auto",
                    zIndex: 2,
                }
            }>
                <div ref={refTop} className={styles.resizer_t} style={dragStyle}></div>
            </div>
            <div style={
                {
                    ...borderStyle,
                    height:`0px`,
                    width:`${size.width}px`,
                    top:"auto",
                    bottom:"-2px",
                    left:"auto",
                    zIndex: 2,
                }}>
                <div ref={refBottom} className={styles.resizer_b} style={dragStyle}></div>
            </div>
            <div className={styles.block}  ref={ref} onClick={()=>{
                if(!props.idsSelectedBlocks.includes(props.block.id))
                    dispatch(selectBlock,props.block.id)
            }}>
                <SlideBlock slideId={props.slideId} block={props.block} idsSelectedBlocks={props.idsSelectedBlocks}/>
            </div>
        </div>
    )

    /*return (
        <div id={props.block.id} className={styles.resizeable} style={
            {
            position: "absolute",
                ...blockStyle

        }}>
            <div className={styles.block}  ref={ref}
                onMouseDown={()=>{ if (props.from !== "navigation") {dispatch(selectBlock, props.block.id)}}}>
                <SlideBlock slideId={props.slideId} block={props.block} idsSelectedBlocks={props.idsSelectedBlocks}/>
            </div>
        </div>
)*/
}