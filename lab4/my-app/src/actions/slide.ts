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

   return {
     ...oldPresentationMaker,
     presentation: newPresentation,
     idsSelectedSlides: newIdsSelectedSlides,
   };
}

function verifyExtentionImg(file: any): boolean {
    const extensionSelectedFile = file.type.split("/").pop();
    return extensionSelectedFile === "png" || extensionSelectedFile === "jpg" || extensionSelectedFile === "jpeg" || extensionSelectedFile === "svg";
}

function converImageToBase64(input: any): any {
    const imgFile = input.files[0];

    if (!verifyExtentionImg(imgFile)) {
        return "";
    }

    // return URL.createObjectURL(imgFile);

  const reader = new FileReader();
  reader.readAsDataURL(imgFile);
  reader.onload = () => {
    if (reader.result) {
      return reader.result.toString();
    } else {
      console.log("Ошибка обработки файла");
    }
  };
  reader.onerror = () => {
    console.log("Ошибка открытия файла");
  };
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

export {
    createNewSlide,
    removeBlockSelection,
    deleteSlides,
    changeBackgroundSlide,
}