import React, { useEffect, useRef } from "react";
import { Block } from "../types";
import { dispatch } from "../state";
import { resizeBlock } from "../actions/block";

type propsUseResizer = {
  block: Block;
  refs: {
    ref: React.RefObject<HTMLDivElement>;
    refLeft: React.RefObject<HTMLDivElement>;
    refTop: React.RefObject<HTMLDivElement>;
    refRight: React.RefObject<HTMLDivElement>;
    refBottom: React.RefObject<HTMLDivElement>;
  };
  setSize: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
    }>
  >;
  setPos: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  edit: React.MutableRefObject<boolean>;
};

function useResizer(props: propsUseResizer): void {
  const coords = useRef<{
    x: number;
    y: number;
    delta: number;
  }>({
    x: props.block.coordinatesX,
    y: props.block.coordinatesY,
    delta: 0,
  });

  const size = useRef<{
    height: number;
    width: number;
  }>({
    height: props.block.height,
    width: props.block.width,
  });

  const isClickedR = useRef<boolean>(false);
  const isClickedL = useRef<boolean>(false);
  const isClickedB = useRef<boolean>(false);
  const isClickedT = useRef<boolean>(false);

  useEffect(() => {
    const main = document.getElementById("main")!;
    const styleMain = window.getComputedStyle(main);
    const width = parseInt(styleMain.width, 10);
    const height = parseInt(styleMain.height, 10);

    const el = document.getElementById(props.block.id)!;
    const elRight = props.refs.refRight.current!;
    const elBottom = props.refs.refBottom.current!;
    const elLeft = props.refs.refLeft.current!;
    const elTop = props.refs.refTop.current!;

    // Right resize
    const onMouseMoveRightResize = (event: MouseEvent) => {
      if (!isClickedR.current) return;
      coords.current.delta = event.pageX - coords.current.x;
      coords.current.x = event.pageX;
      size.current.width = size.current.width + coords.current.delta;
      if (size.current.width <= 8) {
        size.current.width = 8;
        isClickedR.current = false;
        dispatch(resizeBlock, {
          width: size.current.width,
          height: size.current.height,
          id: props.block.id,
          rejectedCoordinateY: el.getBoundingClientRect().top,
          rejectedCoordinateX: el.getBoundingClientRect().left,
        });
        document.removeEventListener("mousemove", onMouseMoveRightResize);
        return;
      }

      el.style.left = `${event.pageX - size.current.width}px`;
      el.style.top = `${props.block.coordinatesY}px`;
      el.style.right = `${event.pageX}px`;
      el.style.bottom = `${
        height - (props.block.coordinatesY + size.current.height)
      }px`;

      props.setSize((sizer) => ({
        ...sizer,
        width: size.current.width,
      }));
    };

    const onMouseUpRightResize = () => {
      if (!isClickedR.current) return;
      props.edit.current = false;
      isClickedR.current = false;
      dispatch(resizeBlock, {
        width: size.current.width,
        height: size.current.height,
        id: props.block.id,
        rejectedCoordinateY: el.getBoundingClientRect().top,
        rejectedCoordinateX: el.getBoundingClientRect().left,
      });
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event: MouseEvent) => {
      props.edit.current = true;
      isClickedR.current = true;
      coords.current.x = event.pageX;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      elRight.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Left resize
    const onMouseMoveLeftResize = (event: MouseEvent) => {
      if (!isClickedL.current) return;

      coords.current.delta = event.pageX - coords.current.x;
      coords.current.x = event.pageX;
      size.current.width = size.current.width - coords.current.delta;

      if (size.current.width <= 8) {
        size.current.width = 8;
        isClickedL.current = false;
        dispatch(resizeBlock, {
          width: size.current.width,
          height: size.current.height,
          id: props.block.id,
          rejectedCoordinateY: el.getBoundingClientRect().top,
          rejectedCoordinateX: el.getBoundingClientRect().left,
        });
        document.removeEventListener("mousemove", onMouseMoveRightResize);
        return;
      }

      el.style.left = `${event.pageX}px`;
      el.style.top = `${props.block.coordinatesY}px`;
      el.style.bottom = `${
        height - (props.block.coordinatesY + size.current.height)
      }px`;
      el.style.right = `${event.pageX + size.current.width}px`;

      props.setSize((sizer) => ({
        ...sizer,
        width: size.current.width,
      }));

      props.setPos((pos) => ({
        ...pos,
        x: event.pageX,
      }));
    };

    const onMouseUpLeftResize = () => {
      if (!isClickedL) return;
      props.edit.current = false;
      isClickedL.current = false;
      dispatch(resizeBlock, {
        width: size.current.width,
        height: size.current.height,
        id: props.block.id,
        rejectedCoordinateY: el.getBoundingClientRect().top,
        rejectedCoordinateX: el.getBoundingClientRect().left,
      });
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (event: MouseEvent) => {
      props.edit.current = true;
      isClickedL.current = true;
      coords.current.x = event.pageX;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      elLeft.addEventListener("mouseup", onMouseUpLeftResize);
    };

    // Bottom resize
    const onMouseMoveBottomResize = (event: MouseEvent) => {
      if (!isClickedB.current) return;

      coords.current.delta = event.pageY - coords.current.y;
      coords.current.y = event.pageY;
      size.current.height = size.current.height + coords.current.delta;

      if (size.current.height <= 8) {
        size.current.height = 8;
        isClickedB.current = false;
        dispatch(resizeBlock, {
          width: size.current.width,
          height: size.current.height,
          id: props.block.id,
          rejectedCoordinateY: el.getBoundingClientRect().top,
          rejectedCoordinateX: el.getBoundingClientRect().left,
        });
        document.removeEventListener("mousemove", onMouseMoveRightResize);
        return;
      }

      el.style.top = `${event.pageY - size.current.height}px`;
      el.style.left = `${props.block.coordinatesX}px`;
      el.style.right = `${
        width - (props.block.coordinatesX + size.current.width)
      }px`;
      el.style.bottom = `${height - event.pageY}px`;

      props.setSize((sizer) => ({
        ...sizer,
        height: size.current.height,
      }));
    };

    const onMouseUpBottomResize = () => {
      if (!isClickedB) return;
      props.edit.current = false;
      isClickedB.current = false;
      dispatch(resizeBlock, {
        width: size.current.width,
        height: size.current.height,
        id: props.block.id,
        rejectedCoordinateY: el.getBoundingClientRect().top,
        rejectedCoordinateX: el.getBoundingClientRect().left,
      });
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event: MouseEvent) => {
      props.edit.current = true;
      isClickedB.current = true;
      coords.current.y = event.pageY;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      elBottom.addEventListener("mouseup", onMouseUpBottomResize);
    };

    // Top resize
    const onMouseMoveTopResize = (event: MouseEvent) => {
      if (!isClickedT.current) return;

      coords.current.delta = event.pageY - coords.current.y;
      coords.current.y = event.pageY;
      size.current.height = size.current.height - coords.current.delta;

      if (size.current.height <= 8) {
        size.current.height = 8;
        isClickedT.current = false;
        dispatch(resizeBlock, {
          width: size.current.width,
          height: size.current.height,
          id: props.block.id,
          rejectedCoordinateY: el.getBoundingClientRect().top,
          rejectedCoordinateX: el.getBoundingClientRect().left,
        });
        document.removeEventListener("mousemove", onMouseMoveRightResize);
        return;
      }

      el.style.top = `${event.pageY}px`;
      el.style.left = `${props.block.coordinatesX}px`;
      el.style.right = `${
        width - (props.block.coordinatesX + size.current.width)
      }px`;
      el.style.bottom = `${event.pageY + size.current.height}px`;

      props.setSize((sizer) => ({
        ...sizer,
        height: size.current.height,
      }));

      props.setPos((pos) => ({
        ...pos,
        y: event.pageY,
      }));
    };

    const onMouseUpTopResize = () => {
      if (!isClickedT) return;
      props.edit.current = false;
      isClickedT.current = false;
      dispatch(resizeBlock, {
        width: size.current.width,
        height: size.current.height,
        id: props.block.id,
        rejectedCoordinateY: el.getBoundingClientRect().top,
        rejectedCoordinateX: el.getBoundingClientRect().left,
      });
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (event: MouseEvent) => {
      props.edit.current = true;
      isClickedT.current = true;
      coords.current.y = event.pageY;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      elTop.addEventListener("mouseup", onMouseUpTopResize);
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

      elTop.removeEventListener("mouseup", onMouseUpTopResize);
      elBottom.removeEventListener("mouseup", onMouseUpBottomResize);
      elLeft.removeEventListener("mouseup", onMouseUpLeftResize);
      elRight.removeEventListener("mouseup", onMouseUpRightResize);
    };
  }, [props.block, props.refs, props.setPos, props.setSize, props.edit]);
}

export default useResizer;
