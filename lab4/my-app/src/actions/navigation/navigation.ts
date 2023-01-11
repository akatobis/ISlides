import {PresentationMaker, SlideType, Presentation} from "../../types";
import {createNewSlide} from "../slide";

export function addNewSlide(oldPresentationMaker: PresentationMaker): PresentationMaker {
    const newSlide: SlideType = createNewSlide()

    let newSlides: SlideType[] = [];

    if(oldPresentationMaker.idsSelectedSlides.length === 0)
        return {
            presentation: {
                ...oldPresentationMaker.presentation,
                slides: [...oldPresentationMaker.presentation.slides, newSlide]
            },
            idsSelectedBlocks: [],
            idsSelectedSlides: [newSlide.id],
        }

    for(let slide of oldPresentationMaker.presentation.slides)
    {
        newSlides.push(slide)
        if(slide.id === oldPresentationMaker.idsSelectedSlides[0]) {
            newSlides.push(newSlide)
        }
    }

    return {
        presentation: {
            ...oldPresentationMaker.presentation,
            slides: [] = newSlides,
        },
        idsSelectedSlides: [] = [newSlide.id],
        idsSelectedBlocks: [] = [],
    }
}


export function moveSlides(oldPresentationMaker: PresentationMaker, idInsertionSlide: string): PresentationMaker {
    const slides: SlideType[] = [...oldPresentationMaker.presentation.slides];

    let indexInsertionSlide: number = 0;
    slides.forEach((slide) => {
        if (slide.id === idInsertionSlide) {
            indexInsertionSlide = slides.indexOf(slide);
        }
    });
 
    const movableSlides: SlideType[] = slides.filter((slide) => {
        return oldPresentationMaker.idsSelectedSlides.indexOf(slide.id) !== -1;
    })
 
    movableSlides.forEach((slide) => {
        slides.splice(slides.indexOf(slide), 1);
    });
 
    slides.splice(indexInsertionSlide, 0, ...movableSlides);
 
    return {
        ...oldPresentationMaker,
        presentation: {
            ...oldPresentationMaker.presentation,
            slides: slides
        }
    }
}

function selectSlide(oldPresentationMaker: PresentationMaker, idNewSlide: string): PresentationMaker {
    return {
        ...oldPresentationMaker,
        idsSelectedSlides: [idNewSlide],
    };
}

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
    selectSlide
}