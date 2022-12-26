import React, { useEffect, useRef } from "react";
import {Block} from "./../types";
import {dispatch} from './../state'
import {resizeBlock} from './../actions/block';
import {moveBlock} from './../actions/block'

type propsUseResizer =  {
  block:Block,
  refs:{
    ref: React.RefObject<HTMLDivElement>,
    refLeft:React.RefObject<HTMLDivElement>,
    refTop:React.RefObject<HTMLDivElement>,
    refRight:React.RefObject<HTMLDivElement>,
    refBottom:React.RefObject<HTMLDivElement>,
  }
}

function useResizer(props: propsUseResizer): void {

  const coords = useRef<{
    startX: number,
    startY: number,
  }>({
    startX: props.block.coordinatesX,
    startY: props.block.coordinatesY,
  })

  const size = useRef<{
    height: number,
    width: number,
  }>({
    height: props.block.height,
    width: props.block.width,
  })

  React.useEffect(() => {
    const main = document.getElementById("main")!;
    const styleMain = window.getComputedStyle(main);
    const width = parseInt(styleMain.width, 10);
    const height = parseInt(styleMain.height, 10);

    const el = props.refs.ref.current!;
    const elRight = props.refs.refRight.current!;
    const elBottom = props.refs.refBottom.current!;
    const elLeft = props.refs.refLeft.current!;
    const elTop = props.refs.refTop.current!;

    // Right resize
    const onMouseMoveRightResize = (event:MouseEvent) => {
        if(event.clientX > el.getBoundingClientRect().left)
        {
          const dx = event.clientX - coords.current.startX;
          coords.current.startX = event.clientX;
          if(size.current.width <= 5) 
            size.current.width = 5;
          size.current.width = size.current.width + dx;
          el.style.width = `${size.current.width}px`;
          const a = event.clientX - size.current.width;
          el.style.left = `${a}px`;
          el.style.top = `${props.block.coordinatesY}px`;
          const b = height - (props.block.coordinatesY + size.current.height);
          el.style.bottom = `${b}px`;
        }
    };

    const onMouseUpRightResize = (event:MouseEvent) => {
        props.block.coordinatesX = el.getBoundingClientRect().left;
        dispatch(resizeBlock,{
          width:size.current.width, 
          height:size.current.height, 
          id:props.block.id,
          rejectedCoordinatY:el.getBoundingClientRect().top,
          rejectedCoordinatX:el.getBoundingClientRect().left,
        });
        document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event:MouseEvent) => {
        coords.current.startX = event.clientX;
        document.addEventListener("mousemove", onMouseMoveRightResize);
        el.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Left resize
    const onMouseMoveLeftResize = (event:MouseEvent) => {
      if(event.clientX < el.getBoundingClientRect().right)
      {
        const dx = event.clientX - coords.current.startX;
        if(size.current.width <= 5) 
            size.current.width = 5;
        coords.current.startX = event.clientX;
        size.current.width = size.current.width - dx;
        el.style.width = `${size.current.width}px`;
        el.style.left = `${event.clientX}px`;
        el.style.top = `${props.block.coordinatesY}px`;
        const b = height - (props.block.coordinatesY + size.current.height);
        el.style.bottom = `${b}px`;
      }
    };

    const onMouseUpLeftResize = (event:MouseEvent) => {
        props.block.coordinatesX = el.getBoundingClientRect().left;
        dispatch(resizeBlock,{
          width:size.current.width, 
          height:size.current.height, 
          id:props.block.id,
          rejectedCoordinatY:el.getBoundingClientRect().top,
          rejectedCoordinatX:el.getBoundingClientRect().left
        });
        document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (event:MouseEvent) => {
        coords.current.startX = event.clientX;
        document.addEventListener("mousemove", onMouseMoveLeftResize);
        el.addEventListener("mouseup", onMouseUpLeftResize);
    };

    // Bottom resize
    const onMouseMoveBottomResize = (event:MouseEvent) => {
      if(event.clientY > el.getBoundingClientRect().top)
      {
        const dy = event.clientY - coords.current.startY;
        if(size.current.height <= 5) 
            size.current.height = 5;
        size.current.height = size.current.height + dy;
        coords.current.startY = event.clientY;
        el.style.height = `${size.current.height}px`;
        const a = event.clientY - size.current.height;
        el.style.top = `${a}px`;
        el.style.left = `${props.block.coordinatesX}px`;
        const b = width - (props.block.coordinatesX + size.current.width);
        el.style.right = `${b}px`;
      }
    };

    const onMouseUpBottomResize = (event:MouseEvent) => {
        props.block.coordinatesY = el.getBoundingClientRect().top;
        dispatch(resizeBlock,{
          width:size.current.width, 
          height:size.current.height, 
          id:props.block.id,
          rejectedCoordinatY:el.getBoundingClientRect().top,
          rejectedCoordinatX:el.getBoundingClientRect().left
        });
        document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event:MouseEvent) => {
        coords.current.startY = event.clientY;
        document.addEventListener("mousemove", onMouseMoveBottomResize);
        el.addEventListener("mouseup", onMouseUpBottomResize);
    };
    
    // Top resize
    const onMouseMoveTopResize = (event:MouseEvent) => {
      if(event.clientY < el.getBoundingClientRect().bottom)
      {
        const dy = event.clientY - coords.current.startY;
        if(size.current.height <= 5) 
            size.current.height = 5;
        size.current.height = size.current.height - dy;
        coords.current.startY = event.clientY;
        el.style.height = `${size.current.height}px`;
        el.style.top = `${coords.current.startY}px`;
        el.style.left = `${props.block.coordinatesX}px`;
        const b = width - (props.block.coordinatesX + size.current.width);
        el.style.right = `${b}px`;
      }
    };

    const onMouseUpTopResize = (event:MouseEvent) => {
        props.block.coordinatesY = el.getBoundingClientRect().top;
        dispatch(resizeBlock,{
          width: size.current.width, 
          height: size.current.height, 
          id: props.block.id,
          rejectedCoordinatY: el.getBoundingClientRect().top,
          rejectedCoordinatX: el.getBoundingClientRect().left,
        });
        document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (event:MouseEvent) => {
        coords.current.startY = event.clientY;
        document.addEventListener("mousemove", onMouseMoveTopResize);
        el.addEventListener("mouseup", onMouseUpTopResize);
    };

    elRight.addEventListener("mousedown", onMouseDownRightResize);
    elTop.addEventListener("mousedown", onMouseDownTopResize);
    elBottom.addEventListener("mousedown", onMouseDownBottomResize);
    elLeft.addEventListener("mousedown", onMouseDownLeftResize);

    return () => {    
      elRight.removeEventListener("mousedown", onMouseDownRightResize);
      elTop.removeEventListener("mousedown", onMouseDownTopResize);
      elBottom.removeEventListener("mousedown", onMouseDownBottomResize);
      elLeft.removeEventListener("mousedown", onMouseDownLeftResize);
      el.removeEventListener("mouseup", onMouseUpTopResize);
      el.removeEventListener("mouseup", onMouseUpBottomResize);
      el.removeEventListener("mouseup", onMouseUpLeftResize);
      el.removeEventListener("mouseup", onMouseUpRightResize);
    };
  }, []);
}

export default useResizer;