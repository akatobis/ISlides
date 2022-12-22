import {useCallback, useEffect, useLayoutEffect, useRef} from 'react';
import {dispatch, getState, returnCancel, rollBack} from "./state";
import {selectSlides} from "./actions/navigation/navigation";
import {deleteSlides} from "./actions/slide";
import {deleteBlocks} from "./actions/block";

const useKeyPress = (elementName: string = "", node: any = null) => {
    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.code === 'KeyZ') {
                dispatch(rollBack, {});
            }

            if ((event.metaKey || event.ctrlKey) && event.code === 'KeyY') {
                dispatch(returnCancel, {});
            }

            if (event.code === 'Delete') {
                if (getState().idsSelectedBlocks.length === 0)
                {
                    dispatch(deleteSlides, {});
                } else {
                    dispatch(deleteBlocks, {});
                }
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

const useMousePress = (payload: string = "", node: any = null) => {
    const handleKeyPress = useCallback(
        (event: MouseEvent) => {
            if (event.button === 0 && event.ctrlKey) {
                dispatch(selectSlides, payload)
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