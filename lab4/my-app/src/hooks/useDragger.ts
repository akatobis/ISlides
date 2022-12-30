import React, { useEffect, useRef } from "react";
import {Block} from "./../types";
import {dispatch} from './../state';
import {moveBlock} from './../actions/block';

type porpsUseDragger = {
  block:Block,
  ref: React.RefObject<HTMLDivElement>,
  setPos: React.Dispatch<React.SetStateAction<{
    x: number;
    y: number;
  }>>,
}

function useDragger(props:porpsUseDragger): void {

  const isClicked = useRef<boolean>(false);

  const coords = useRef<{
    startX: number,
    startY: number,
    lastX: number,
    lastY: number,
  }>({
    startX: props.block.coordinatesX,
    startY: props.block.coordinatesY,
    lastX: props.block.coordinatesX,
    lastY: props.block.coordinatesY,
  })

  useEffect(() => {
    const el = props.ref.current!;

    const container = document.getElementById("WorkZone")!;

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.pageX;
      coords.current.startY = e.pageY;
      console.log(el.getBoundingClientRect(), props.block)
    }

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      coords.current.lastX = el.getBoundingClientRect().left;
      coords.current.lastY = el.getBoundingClientRect().top;
      
      dispatch(moveBlock, {
        rejectedCoordinatX: coords.current.lastX,
        rejectedCoordinatY: coords.current.lastY,
        id: props.block.id,
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;
      props.setPos({
        x: e.pageX - coords.current.startX + coords.current.lastX,
        y: e.pageY - coords.current.startY + coords.current.lastY
      })
    }

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    //container.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      //container.removeEventListener('mouseleave', onMouseUp);
    }

    return cleanup;
  }, [props.block.id, props.ref, props.setPos])

}

export default useDragger;