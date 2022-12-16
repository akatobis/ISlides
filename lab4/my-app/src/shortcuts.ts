import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import {dispatch, returnCancel, rollBack} from "./state";

const useKeyPress = (/*keys: string[], callback: Function, */node: any = null) => {
    // implement the callback ref pattern
    /*const callbackRef = useRef(callback);
    useLayoutEffect(() => {
        callbackRef.current = callback;
    });*/

    // handle what happens on key press
    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            /*console.log(event.code);*/
            // check if one of the key is part of the ones we want
            if ((event.metaKey || event.ctrlKey) && event.code === 'KeyZ') {
                dispatch(rollBack, {});
            }

            if ((event.metaKey || event.ctrlKey) && event.code === 'KeyY') {
                dispatch(returnCancel, {});
            }
        },
        []
    );

    useEffect(() => {
        // target is either the provided node or the document
        const targetNode = node ?? document;
        // attach the event listener
        targetNode &&
        targetNode.addEventListener("keydown", handleKeyPress);

        // remove the event listener
        return () =>
            targetNode &&
            targetNode.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress, node]);
};

export {
    useKeyPress,
}