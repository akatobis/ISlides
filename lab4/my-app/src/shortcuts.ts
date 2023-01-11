import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import {dispatch, returnCancel, rollBack} from "./state";
import {selectSlide, selectSlides} from "./actions/navigation/navigation";
import {deleteBlocks, selectBlock} from "./actions/block";
import {deleteSlides, switchSlide} from "./actions/slide";

const useKeyPress = (node: any = null) => {
    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.code === 'KeyZ') {
                dispatch(rollBack, {});
            }

            if ((event.metaKey || event.ctrlKey) && event.code === 'KeyY') {
                dispatch(returnCancel, {});
            }

            if (event.code === "Delete") {
                dispatch(deleteSlides, {});
                dispatch(deleteBlocks, {});
            }

            if (event.keyCode === 38) {
                dispatch(switchSlide, "up")
            }

            if (event.keyCode === 40) {
                dispatch(switchSlide, "down")
            }
        },
        []
    );

    useEffect(() => {
        const targetNode = node ?? document;
        targetNode &&
        targetNode.addEventListener("keydown", handleKeyPress);

        return () =>
            targetNode &&
            targetNode.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress, node]);
};

const useMousePress = (slideId: string = "", blockId: string = "", from: string = "", node: any = null) => {
    const handleKeyPress = useCallback(
        (event: MouseEvent) => {
            if (event.button === 0 && event.ctrlKey) {
                if (from === "slide") {
                    dispatch(selectSlides, slideId);
                }

                if (from === "block") {
                    dispatch(selectSlide, slideId);
                    dispatch(selectBlock, blockId);
                }
            }
        },
        []
    );

    useEffect(() => {
        const targetNode = node ?? document;
        targetNode &&
        targetNode.addEventListener("mousedown", handleKeyPress);

        return () =>
            targetNode &&
            targetNode.removeEventListener("mousedown", handleKeyPress);
    }, [handleKeyPress, node]);
};

export {
    useKeyPress,
    useMousePress,
}