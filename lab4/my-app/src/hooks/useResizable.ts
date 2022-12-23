import React, { useEffect, useRef } from "react";
import {Block} from "../types";

function useResizable(block: Block): void {
{
    React.useEffect(() => {
        const ref = document.getElementById(block.id)!;
        const refLeft = document.getElementById(`${block.id}-l`);
        const refTop = document.getElementById(`${block.id}-t`);
        const refRight = document.getElementById(`${block.id}-r`);
        const refBottom = document.getElementById(`${block.id}-b`);
        
        //if(!ref){throw new Error("ref error")}

        //const resizeableEle = ref.current;
        //if(!resizeableEle) throw new Error("error resibleEle")
        const styles = window.getComputedStyle(ref);
        let width = parseInt(styles.width, 10);
        let height = parseInt(styles.height, 10);
        let x = 0;
        let y = 0;

        (ref as HTMLElement).style.top = `${block.coordinatesY}`;
        (ref as HTMLElement).style.left = `${block.coordinatesX}`;

        // Right resize
        const onMouseMoveRightResize = (event:MouseEvent) => {
        const dx = event.clientX - x;
        x = event.clientX;
        width = width + dx;
        (ref as HTMLElement).style.width = `${width}px`;
        };

        const onMouseUpRightResize = (event:MouseEvent) => {
        document.removeEventListener("mousemove", onMouseMoveRightResize);
        };

        const onMouseDownRightResize = (event:MouseEvent) => {
        x = event.clientX;
        (ref as HTMLElement).style.left = styles.left;
        (ref as HTMLElement).style.right = `0px`;
        document.addEventListener("mousemove", onMouseMoveRightResize);
        document.addEventListener("mouseup", onMouseUpRightResize);
        };

        // Top resize
        const onMouseMoveTopResize = (event:MouseEvent) => {
        const dy = event.clientY - y;
        height = height - dy;
        y = event.clientY;
        (ref as HTMLElement).style.height = `${height}px`;
        };

        const onMouseUpTopResize = (event:MouseEvent) => {
        document.removeEventListener("mousemove", onMouseMoveTopResize);
        };

        const onMouseDownTopResize = (event:MouseEvent) => {
        y = event.clientY;
        const styles = window.getComputedStyle(ref);
        (ref as HTMLElement).style.bottom = styles.bottom;
        (ref as HTMLElement).style.top = `0px`;
        document.addEventListener("mousemove", onMouseMoveTopResize);
        document.addEventListener("mouseup", onMouseUpTopResize);
        };

        // Bottom resize
        const onMouseMoveBottomResize = (event:MouseEvent) => {
        const dy = event.clientY - y;
        height = height + dy;
        y = event.clientY;
        (ref as HTMLElement).style.height = `${height}px`;
        };

        const onMouseUpBottomResize = (event:MouseEvent) => {
        document.removeEventListener("mousemove", onMouseMoveBottomResize);
        };

        const onMouseDownBottomResize = (event:MouseEvent) => {
        y = event.clientY;
        const styles = window.getComputedStyle(ref);
        (ref as HTMLElement).style.top = styles.top;
        (ref as HTMLElement).style.bottom = `0px`;
        document.addEventListener("mousemove", onMouseMoveBottomResize);
        document.addEventListener("mouseup", onMouseUpBottomResize);
        };

        // Left resize
        const onMouseMoveLeftResize = (event:MouseEvent) => {
        const dx = event.clientX - x;
        x = event.clientX;
        width = width - dx;
        (ref as HTMLElement).style.width = `${width}px`;
        };

        const onMouseUpLeftResize = (event:MouseEvent) => {
        document.removeEventListener("mousemove", onMouseMoveLeftResize);
        };

        const onMouseDownLeftResize = (event:MouseEvent) => {
        x = event.clientX;
        (ref as HTMLElement).style.right = styles.right;
        (ref as HTMLElement).style.left = `0px`;
        document.addEventListener("mousemove", onMouseMoveLeftResize);
        document.addEventListener("mouseup", onMouseUpLeftResize);
        };

        // Add mouse down event listener
        //const resizerRight = refRight.current;
        //if(!resizerRight) {throw new Error("resizerRight")}
        (refRight as HTMLElement).addEventListener("mousedown", onMouseDownRightResize);
        //const resizerTop = refTop.current;
        //if(!resizerTop){throw new Error("resizerTop")}
        (refTop as HTMLElement).addEventListener("mousedown", onMouseDownTopResize);
        //const resizerBottom = refBottom.current;
        //if(!resizerBottom){throw new Error("resizerBottom")}
        (refBottom as HTMLElement).addEventListener("mousedown", onMouseDownBottomResize);
        //const resizerLeft = refLeft.current;
        //if(!resizerLeft) {throw new Error("resizerLeft")}
        (refLeft as HTMLElement).addEventListener("mousedown", onMouseDownLeftResize);

        return () => {
            (refRight as HTMLElement).removeEventListener("mousedown", onMouseDownRightResize);
            (refTop as HTMLElement).removeEventListener("mousedown", onMouseDownTopResize);
            (refBottom as HTMLElement).removeEventListener("mousedown", onMouseDownBottomResize);
            (refLeft as HTMLElement).removeEventListener("mousedown", onMouseDownLeftResize);
        };
  }, []);
}
}
export default useResizable;