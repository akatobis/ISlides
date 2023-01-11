import React, { useEffect, useRef } from "react";
import { Block } from "../types";
import { dispatch } from "../state";
import { moveBlock, selectBlock } from "../actions/block";

type propsUseDragAndDrop = {
  block: Block;
  ref: React.RefObject<HTMLDivElement>;
  setPos: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  idsSelectedBlocks: string[];
};

function useDragAndDrop(props: propsUseDragAndDrop): void {
  const isClicked = useRef<boolean>(false);

  const Moved = useRef<boolean>(false);

  const coords = useRef<{
    X: number;
    Y: number;
    oldX: number;
    oldY: number;
  }>({
    X: props.block.coordinatesX,
    Y: props.block.coordinatesY,
    oldX: 0,
    oldY: 0,
  });

  useEffect(() => {
    const el = props.ref.current!;

    const block = document.getElementById(props.block.id)!;

    const container = document.getElementById("WorkZone")!;

    const onMouseDown = (e: MouseEvent) => {
      if (!props.idsSelectedBlocks.includes(props.block.id)) return;
      e.preventDefault();

      isClicked.current = true;

      coords.current.X = e.pageX;
      coords.current.Y = e.pageY;

      coords.current.oldX = parseInt(block.style.left, 10);
      coords.current.oldY = parseInt(block.style.top, 10);
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!isClicked.current) return;
      e.preventDefault();
      isClicked.current = false;
      if (!Moved.current) {
        setTimeout(() => {
          dispatch(selectBlock, props.block.id);
        }, 150);
        return;
      }
      Moved.current = false;
      dispatch(moveBlock, {
        rejectedCoordinateX: el.getBoundingClientRect().left,
        rejectedCoordinateY: el.getBoundingClientRect().top,
        id: props.block.id,
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;
      if(!props.idsSelectedBlocks.includes(props.block.id))
        return;
      e.preventDefault();
      setTimeout(() => {
        Moved.current = true;
      }, 150);
      props.setPos({
        x: e.pageX - coords.current.X + coords.current.oldX,
        y: e.pageY - coords.current.Y + coords.current.oldY,
      });
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };
  }, [props.block.id, props.ref, props.setPos, props.idsSelectedBlocks]);
}

export default useDragAndDrop;
