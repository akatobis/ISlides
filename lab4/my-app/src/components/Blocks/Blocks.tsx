import {Block} from "../../types";
import styles from "./Blocks.module.css";
import {SlideBlock} from "./Block/Block";
import {selectBlock} from "../../actions/blocks/blocks";
import {dispatch} from "../../state";
import {useRef, useEffect, useState} from 'react'
import React from 'react-dom';
import { moveBlock } from "../../actions/block";

type BlocksProps = {
    blocks: Block[],
    idsSelectedBlocks: string[],
}

const Blocks = (props: BlocksProps) => {
    
    const[cords, setCords] = useState({rejectedCoordinatX: 0, rejectedCoordinatY: 0})

    const containerRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
  
    const isClicked = useRef<boolean>(false);
  
    const coords = useRef<{
      startX: number,
      startY: number,
      lastX: number,
      lastY: number
    }>({
      startX: 200,
      startY: 200,
      lastX: 200,
      lastY: 200
    })
  
    useEffect(() => {
      if (!boxRef.current || !containerRef.current) return;
  
      const box = boxRef.current;
      const container = containerRef.current;
  
  
      const onMouseDown = (e: MouseEvent) => {
        isClicked.current = true;
        coords.current.startX = e.clientX;
        coords.current.startY = e.clientY;
      }
  
      const onMouseUp = (e: MouseEvent) => {
        isClicked.current = false;
        coords.current.lastX = box.offsetLeft;
        coords.current.lastY = box.offsetTop;
      }
  
      const onMouseMove = (e: MouseEvent) => {
        if (!isClicked.current) return;
  
        const nextX = e.clientX - coords.current.startX + coords.current.lastX;
        const nextY = e.clientY - coords.current.startY + coords.current.lastY;
  
        box.style.top = `${nextY}px`;
        box.style.left = `${nextX}px`;
        setCords({rejectedCoordinatX:nextX,rejectedCoordinatY:nextY});
        dispatch(moveBlock,cords);
      }
  
      box.addEventListener('mousedown', onMouseDown);
      box.addEventListener('mouseup', onMouseUp);
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseUp);
  
      const cleanup = () => {
        box.removeEventListener('mousedown', onMouseDown);
        box.removeEventListener('mouseup', onMouseUp);
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseUp);
      }
  
      return cleanup;
    }, [])
  

    return (
        <div className={styles.blockCanvas} ref={containerRef}>
            {props.blocks.map(block => (
                <div ref={boxRef} className={styles.block} key={block.id} style={
                    {
                        position: "absolute",
                        top:`${block.coordinatesY}`+`px`,
                        left:`${block.coordinatesX}`+`px`,
                    }
                }>
                <button
                    className={styles.blockButton}
                    onClick={()=>{dispatch(selectBlock, block.id)}
                    }
                >
                    <SlideBlock block={block} idsSelectedBlocks={props.idsSelectedBlocks}
                />
                </button>
            </div>
            ))}
        </div>
    );
}

export {
    Blocks,
}