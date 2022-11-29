import {PresentationMaker} from "../../types";

function selectSlides(oldPresentationMaker: PresentationMaker, idNewSlide: string): PresentationMaker {
    let newIds: string[] = oldPresentationMaker.idsSelectedSlides.filter(() => {
        return true;
    });

    if (newIds.indexOf(idNewSlide) === -1) {
        newIds = [...newIds, idNewSlide];
    } else {
        if (newIds.length !== 1)
        {
            newIds.splice(newIds.indexOf(idNewSlide), 1);
        }
    }

    return {
        ...oldPresentationMaker,
        idsSelectedSlides: newIds,
    }
}

export {
    selectSlides,
}