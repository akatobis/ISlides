import { Presentation, PresentationMaker, SlideType } from '../types'
import { v4 as uuidv4 } from "uuid";

function createNewSlide(): SlideType {
    return {
        id : uuidv4(),
        backgroundColor: "",
        backgroundImage: "",
        blocks: [],
    }
}

function removeBlockSelection(oldPresentationMaker: PresentationMaker): PresentationMaker {
    return {
        ...oldPresentationMaker,
        idsSelectedBlocks: [],
    }
}

function switchSlide(oldPresentationMaker: PresentationMaker, direction: string): PresentationMaker {
    let switchedSlideId: string
    let switchedSlide: SlideType
    let indexSwitchedSlide: number = 0;
    let newIdSelectedSlide: string = "";
    switchedSlideId = oldPresentationMaker.idsSelectedSlides[0]
    oldPresentationMaker.presentation.slides.forEach((slide, index) => {
        if (slide.id === switchedSlideId) {
            indexSwitchedSlide = index
        }
    });
    switchedSlide = oldPresentationMaker.presentation.slides[indexSwitchedSlide]

    if (direction === "up") {
        if (oldPresentationMaker.presentation.slides.indexOf(switchedSlide) > 0) {
            newIdSelectedSlide = oldPresentationMaker.presentation.slides[indexSwitchedSlide - 1].id
        } else {
            newIdSelectedSlide = oldPresentationMaker.presentation.slides[indexSwitchedSlide].id
        }
    }

    if (direction === "down") {
        if (oldPresentationMaker.presentation.slides.indexOf(switchedSlide) < oldPresentationMaker.presentation.slides.length - 1) {
            newIdSelectedSlide = oldPresentationMaker.presentation.slides[indexSwitchedSlide + 1].id
        } else {
            newIdSelectedSlide = oldPresentationMaker.presentation.slides[indexSwitchedSlide].id
        }
    }

    return {
        ...oldPresentationMaker,
        idsSelectedSlides: [newIdSelectedSlide],
        idsSelectedBlocks: [],
    }
}

function deleteSlides(oldPresentationMaker: PresentationMaker): PresentationMaker {
    if (oldPresentationMaker.idsSelectedSlides.length === 0) {
        return  oldPresentationMaker;
    }
    const oldIdsSelectedSlides: string[] = oldPresentationMaker.idsSelectedSlides;
    const idLastSelectedSlide: string = oldIdsSelectedSlides[oldIdsSelectedSlides.length - 1];
    const oldSlides: SlideType[] = oldPresentationMaker.presentation.slides;

    let newSlides: SlideType[] = oldSlides.filter((slide) => {
        return !oldIdsSelectedSlides.includes(slide.id);
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
   }

   return oldPresentationMaker;
}

function changeBackgroundSlide(oldPresentantionMaker: PresentationMaker, { color, image }: {color?: string, image?: string}): PresentationMaker {
  const idsSelectedSlides: string[] = oldPresentantionMaker.idsSelectedSlides;
  const oldSlides: SlideType[] = oldPresentantionMaker.presentation.slides;
  const selectedSlides: SlideType[] = oldSlides.filter((slide) => {
    return idsSelectedSlides.includes(slide.id);
  });

    let newSlides: SlideType[] = oldSlides.map((slide) => {
        if (selectedSlides.includes(slide)) {
          if (color) {
            return {
              ...slide,
              backgroundColor: color,
              backgroundImage: "",
            };
          }
          return {
            ...slide,
            backgroundColor: "",
            backgroundImage: image + "",
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
    switchSlide
};