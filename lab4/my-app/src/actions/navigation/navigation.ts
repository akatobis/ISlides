import {PresentationMaker, SlideType, Presentation} from "../../types";
import {createNewSlide} from "../slide";

export function addNewSlide(oldPresentationMaker: PresentationMaker): PresentationMaker {
    const newSlide: SlideType = createNewSlide()
 
    let newSlides: SlideType[] = new Array(oldPresentationMaker.presentation.slides.length + 1);
    let i = 0;
    for(i = 0; i < oldPresentationMaker.presentation.slides.length; i++)
    {
       newSlides[i] = oldPresentationMaker.presentation.slides[i];
       if(oldPresentationMaker.presentation.slides[i].id === oldPresentationMaker.idsSelectedSlides[oldPresentationMaker.idsSelectedSlides.length - 1]){
          break;
       }
    }
 
    i++;
    newSlides[i] = newSlide;
    i++;
    for(; i - 1 < oldPresentationMaker.presentation.slides.length; i++)
    {
       newSlides[i] = oldPresentationMaker.presentation.slides[i - 1];
    }

    let newIdSelecetdeSlides: string[] =[newSlide.id];
 
    const newPresentation: Presentation = {
       ...oldPresentationMaker.presentation,
       slides: [] = newSlides,
    }
 
    return {
       presentation: newPresentation,
       idsSelectedSlides: [] = newIdSelecetdeSlides,
       idsSelectedBlocks: [] = [],
    }

}


export function moveSlides(oldPresentationMaker: PresentationMaker, insertionIndex: number): PresentationMaker {
    const slides: SlideType[] = [...oldPresentationMaker.presentation.slides]
 
    const movableSlides: SlideType[] = slides.filter((slide) => {
        return oldPresentationMaker.idsSelectedSlides.indexOf(slide.id) !== -1;
    })
 
    let inIndex: number = insertionIndex;
 
    movableSlides.forEach((slide) => {
        if (inIndex >= slides.indexOf(slide)) {
            inIndex--;
        }
        slides.splice(slides.indexOf(slide), 1);
        inIndex++;
    });
 
    slides.splice(insertionIndex, 0, ...movableSlides)
 
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