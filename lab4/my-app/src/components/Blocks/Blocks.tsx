import {Block} from "../../types";
import styles from "./Blocks.module.css";
import {SlideBlock} from "./Block/Block";
import {selectBlock} from "../../actions/blocks/blocks";
import {dispatch} from "../../state";
import {useRef} from 'react'
import Draggable, {DraggableCore, DraggableEvent} from 'react-draggable';
import React from 'react-dom';

type BlocksProps = {
    blocks: Block[],
    idsSelectedBlocks: string[],
}

const Blocks = (props: BlocksProps) => {
    const nodeRef = useRef(null);

    const eventHandler = (e:DraggableEvent) => {
        console.log('Event Type', e.type);
        console.log({e});
      }
    
    return (
        <div className={styles.blockCanvas}>
            {props.blocks.map(block => (
                <Draggable key={block.id} nodeRef={nodeRef}
                    defaultPosition={{x: block.coordinatesX, y: block.coordinatesY}}
                    onMouseDown={(e:DraggableEvent)=>eventHandler(e)}
                    onStart={(e:DraggableEvent)=>eventHandler(e)}
                    onDrag={(e:DraggableEvent)=>eventHandler(e)}
                    onStop={(e:DraggableEvent)=>eventHandler(e)}
                    bounds={{left: -50, top: 0, right: 450, bottom: 340}}//задать стили слайда большого
                    //offsetParent={}
                >
                    <div ref={nodeRef} className={styles.block}>
                        <button
                            className={styles.blockButton}
                            onClick={()=>{dispatch(selectBlock, block.id)}
                            }
                        >
                            <SlideBlock block={block} idsSelectedBlocks={props.idsSelectedBlocks}
                        />
                        </button>
                    </div>
                </Draggable>
            ))}
        </div>
    );
}

export {
    Blocks,
}