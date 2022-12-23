import React, { useEffect, useRef } from "react";
import {Block} from "./../types";
import {dispatch} from './../state'
import {moveBlock} from './../actions/block'

interface propsUseDragger {
  refs: React.MutableRefObject<HTMLDivElement[]>,
  block: Block,
}

function useDragger(props: propsUseDragger): void {

  const isClicked = useRef<boolean>(false);

  const coords = useRef<{
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
  }>({
    startX: props.block.coordinatesX,
    startY: props.block.coordinatesY,
    lastX: props.block.coordinatesX,
    lastY: props.block.coordinatesY
  })

  useEffect(() => {

    const target = document.getElementById(props.block.id);
    if (!target) throw new Error("Element with given id doesn't exist");

    const container = document.getElementById("WorkZone")
    if (!container) throw new Error("target element must have a parent");

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    }

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
      dispatch(moveBlock, {rejectedCoordinatX:coords.current.lastX,rejectedCoordinatY:coords.current.lastY})
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;
    }

    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    //container.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      target.removeEventListener('mousedown', onMouseDown);
      target.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      //container.removeEventListener('mouseleave', onMouseUp);
    }

    return cleanup;
  }, [props])

}

export default useDragger;