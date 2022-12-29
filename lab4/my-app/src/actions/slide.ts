import { Presentation, PresentationMaker, SlideType } from '../types'
import { elemInArray } from '../auxiliaryFunctions'
import { v4 as uuidv4 } from "uuid";

function createNewSlide(): SlideType {
    return {
        id : uuidv4(),
        backgroundColor: "color",
        backgroundImage: "image",
        blocks: [],
    }
}

function removeBlockSelection(oldPresentationMaker: PresentationMaker): PresentationMaker {
    return {
        ...oldPresentationMaker,
        idsSelectedBlocks: [],
    }
}

function deleteSlides(oldPresentationMaker: PresentationMaker): PresentationMaker {
    const oldIdsSelectedSlides: string[] = oldPresentationMaker.idsSelectedSlides;
    const idLastSelectedSlide: string = oldIdsSelectedSlides[oldIdsSelectedSlides.length - 1];
    const oldSlides: SlideType[] = oldPresentationMaker.presentation.slides;

    let newSlides: SlideType[] = oldSlides.filter((slide) => {
        return !elemInArray(oldIdsSelectedSlides, slide.id);
    });

    let indexLastSelectedSlide: number = 0;
    const idLastSlide: string = oldSlides[oldSlides.length - 1].id;
    if (idLastSelectedSlide === idLastSlide) {
        indexLastSelectedSlide = oldSlides.length - 2;
    } else {
        oldSlides.forEach((slide) => {
            if (slide.id === idLastSelectedSlide) {
                indexLastSelectedSlide = oldSlides.indexOf(slide);
            }
        });
    }

   let newIdsSelectedSlides: string[];
   if (newSlides.length === 0) {
    newIdsSelectedSlides = [];
   } else {
    newIdsSelectedSlides = [newSlides[indexLastSelectedSlide - oldIdsSelectedSlides.length + 1].id]
   }

   const newPresentation: Presentation = {
      ...oldPresentationMaker.presentation,
      slides: newSlides,
   }

   if (oldPresentationMaker.idsSelectedBlocks.length === 0) {
       return {
           ...oldPresentationMaker,
           presentation: newPresentation,
           idsSelectedSlides: newIdsSelectedSlides,
       };
   } else {
       return {...oldPresentationMaker};
   }
}

function changeBackgroundSlide(oldPresentantionMaker: PresentationMaker, { color, image }: {color?: string, image?: string}): PresentationMaker {
  const idsSelectedSlides: string[] = oldPresentantionMaker.idsSelectedSlides;
  const oldSlides: SlideType[] = oldPresentantionMaker.presentation.slides;
  const selectedSlides: SlideType[] = oldSlides.filter((slide) => {
    return elemInArray(idsSelectedSlides, slide.id);
  });

    let newSlides: SlideType[] = oldSlides.map((slide) => {
        if (elemInArray(selectedSlides, slide)) {
            if (color) {
                return {
                    ...slide,
                    backgroundColor: color,
                    backgroundImage: "",
                };
            }
            return {
                ...slide,
                backgroundColor: '',
                backgroundImage: "url(" + image + ")",
            };
        }
        return slide;
    });

    const newPresentation: Presentation = {
        ...oldPresentantionMaker.presentation,
        slides: newSlides,
    };

    return {
        ...oldPresentantionMaker,
        presentation: newPresentation,
    };
}

function changeBackgroundAllSlide(oldPresentantionMaker: PresentationMaker, { color, image }: {color?: string, image?: string}): PresentationMaker {
  const oldSlides: SlideType[] = oldPresentantionMaker.presentation.slides;

    let newSlides: SlideType[] = oldSlides.map((slide) => {
        if (color) {
            return {
                ...slide,
                backgroundColor: color,
                backgroundImage: "",
            };
        }
        return {
            ...slide,
            backgroundColor: '',
            backgroundImage: "url(" + image + ")",
        };
    });

    const newPresentation: Presentation = {
        ...oldPresentantionMaker.presentation,
        slides: newSlides,
    };

    return {
        ...oldPresentantionMaker,
        presentation: newPresentation,
    };
}

export {
  createNewSlide,
  removeBlockSelection,
  deleteSlides,
  changeBackgroundSlide,
  changeBackgroundAllSlide,
};