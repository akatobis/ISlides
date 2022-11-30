import {PresentationMaker} from "../../types";

function selectBlock(oldPresentationMaker: PresentationMaker, idSelectedBlock: string): PresentationMaker {
    let newIds: string[] = oldPresentationMaker.idsSelectedBlocks.filter(() => {
        return true;
    });

    if (newIds.indexOf(idSelectedBlock) === -1) {
        newIds = [...newIds, idSelectedBlock];
    } else {
        newIds.splice(newIds.indexOf(idSelectedBlock), 1);
    }

    return {
        ...oldPresentationMaker,
        idsSelectedBlocks: newIds,
    }
}

export {
    selectBlock,
}