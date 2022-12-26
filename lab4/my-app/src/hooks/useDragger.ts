import React, { useEffect, useRef } from "react";
import {Block} from "./../types";
import {dispatch} from './../state';
import {moveBlock} from './../actions/block';
import { BlockHelper } from "../components/Blocks/DopHelper/BlockHelp";

type porpsUseDragger = {
  block:Block,
  ref: React.RefObject<HTMLDivElement>,
}

function useDragger(props:porpsUseDragger): void {

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
    const el = props.ref.current!;

    const container = document.getElementById("WorkZone")!;

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    }

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      coords.current.lastX = el.offsetLeft;
      coords.current.lastY = el.offsetTop;
      props.block.coordinatesX = coords.current.lastX;
      props.block.coordinatesY = coords.current.lastY;
      dispatch(moveBlock, {rejectedCoordinatX:coords.current.lastX,rejectedCoordinatY:coords.current.lastY,id:props.block.id})
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      el.style.top = `${nextY}px`;
      el.style.left = `${nextX}px`;
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
  }, [props.block.id, props.ref])

}

export default useDragger;