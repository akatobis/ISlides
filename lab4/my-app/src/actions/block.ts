import {v4 as uuidv4} from "uuid";
import {
  Block,
  Figure,
  FigureType,
  ImageType,
  Presentation,
  PresentationMaker,
  SlideType,
  TextBlock,
  TextStyles,
  TypeBlock,
} from "../types";

function selectBlock(oldPresentationMaker: PresentationMaker, idSelectedBlock: string)
{
    if(oldPresentationMaker.idsSelectedBlocks.includes(idSelectedBlock))
        return {
            ...oldPresentationMaker,
            idsSelectedBlocks: [],
            idsSelectedSlides: [oldPresentationMaker.idsSelectedSlides[0]],
        }
    return {
        ...oldPresentationMaker,
        idsSelectedBlocks: [idSelectedBlock],
        idsSelectedSlides: [oldPresentationMaker.idsSelectedSlides[0]],
    }
}

function selectBlocks(oldPresentationMaker: PresentationMaker, idSelectedBlock: string): PresentationMaker {
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
      idsSelectedSlides: [oldPresentationMaker.idsSelectedSlides[0]],
   }
}

function addImage(img: string): ImageType {
   return {
      typeBlock: TypeBlock.image,
      imageBase64: img,
   };
}

function createTextBlock(): TextBlock {
   return {
      typeBlock: TypeBlock.text,
      innerString: "",
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "000",
      fontSize: 16,
      font: "Calibri",
   };
}

function createFigure(figureType: FigureType): Figure {
   if (figureType === FigureType.ellipse) {
      return {
         typeBlock: TypeBlock.figure,
         type: {
         figureType: FigureType.ellipse,
         rx: 10,
         ry: 5,
         },
         colorFill: "#fff",
         border: 1,
         colorBorder: "#000",
      };
   }

   if (figureType === FigureType.triangle) {
      return {
         typeBlock: TypeBlock.figure,
         type: {
         figureType: FigureType.triangle,
         topX: 10,
         },
         colorFill: "#fff",
         border: 1,
         colorBorder: "#000",
      };
   }

   return {
      typeBlock: TypeBlock.figure,
      type: {
         figureType: FigureType.rectangle,
      },
      colorFill: "#fff",
      border: 1,
      colorBorder: "#000",
   };
}

function addBlock(oldPresentationMaker: PresentationMaker,{ img, figureType, aspectRatioImg,}: { img?: string; figureType?: FigureType; aspectRatioImg?: number }): PresentationMaker {
  const idNewBlock: string = uuidv4();
  let newBlock: Block;
  if (img) {
    newBlock = {
      id: idNewBlock,
      content: addImage(img),
      coordinatesX: 900,
      coordinatesY: 400,
      width: aspectRatioImg ? 100 * aspectRatioImg : 100,
      height: 100,
    };
  } else if (figureType === 0 || figureType === 1 || figureType === 2) {
    newBlock = {
      id: idNewBlock,
      content: createFigure(figureType),
      coordinatesX: 750,
      coordinatesY: 400,
      width: 100,
      height: 100,
    };
  } else {
    newBlock = {
      id: idNewBlock,
      content: createTextBlock(),
      coordinatesX: 500,
      coordinatesY: 400,
      width: 200,
      height: 30,
    };
  }

  const oldPresentation: Presentation = oldPresentationMaker.presentation;
  const oldSlides: SlideType[] = oldPresentation.slides;
  const idSelectedSlide: string = oldPresentationMaker.idsSelectedSlides[0];

  const selectedSlide: SlideType = oldSlides.filter((slide) => {
    return idSelectedSlide === slide.id;
  })[0];

  const oldBlocks: Block[] = selectedSlide.blocks;

  const newSlides: SlideType[] = oldSlides.map((slide) => {
    if (slide.id === idSelectedSlide) {
      return {
        ...selectedSlide,
        blocks: [...oldBlocks, newBlock],
      };
    }
    return slide;
  });

  const newPresentation: Presentation = {
    ...oldPresentation,
    slides: newSlides,
  };

  return {
    ...oldPresentationMaker,
    presentation: newPresentation,
    idsSelectedBlocks: [idNewBlock],
  };
}

function deleteBlocks(oldPresentationMaker: PresentationMaker): PresentationMaker {
    if (oldPresentationMaker.idsSelectedBlocks.length === 0) {
        return oldPresentationMaker;
    }
   const oldSlides: SlideType[] = oldPresentationMaker.presentation.slides;
   const idSelectedSlide: string = oldPresentationMaker.idsSelectedSlides[0];
   const selectedSlide: SlideType = oldSlides.filter((slide) => {
      return idSelectedSlide === slide.id;
   })[0];

   let idsSelectedBlocks: string[] = oldPresentationMaker.idsSelectedBlocks;
   let oldBlocks: Block[] = selectedSlide.blocks;
   let newBlocks: Block[] = oldBlocks.filter((block) => {
      return !idsSelectedBlocks.includes(block.id);
   });

   const newSlides: SlideType[] = oldSlides.map((slide) => {
      if (slide.id === idSelectedSlide) {
         return {
         ...slide,
         blocks: newBlocks,
         };
      }
      return slide;
   });

   const newPresentation: Presentation = {
      ...oldPresentationMaker.presentation,
      slides: newSlides,
   };


    return {
        ...oldPresentationMaker,
        presentation: newPresentation,
        idsSelectedBlocks: [],
    };
}

function changeText(oldPresentationMaker: PresentationMaker, text: string): PresentationMaker {
   const oldSlides: SlideType[] = oldPresentationMaker.presentation.slides;
   const idSelectedSlide: string = oldPresentationMaker.idsSelectedSlides[0];
   const selectedSlide: SlideType = oldSlides.filter((slide) => {
      return idSelectedSlide === slide.id;
   })[0];

   let idSelectedBlock: string[] = oldPresentationMaker.idsSelectedBlocks;
   let oldBlocks: Block[] = selectedSlide.blocks;
   let newBlocks: Block[] = oldBlocks.map((block) => {
      if (idSelectedBlock.includes(block.id)) {
         const oldTextBlock = block.content
         return {
            ...block,
            content: {...oldTextBlock, innerString: text,}
         }
      }
      return block;
   });

   const newSlides: SlideType[] = oldSlides.map((slide) => {
      if (slide.id === idSelectedSlide) {
         return {
            ...slide,
            blocks: newBlocks,
         };
      }
      return slide;
   });

   const newPresentation: Presentation = {
      ...oldPresentationMaker.presentation,
      slides: newSlides,
   };

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   };
}

function changeStyleText(oldPresentationMaker: PresentationMaker, { newTextStyle, newColor, newFont, newFontSize }: { newTextStyle?: TextStyles, newColor?: string, newFont?: string, newFontSize?: number }): PresentationMaker | undefined {
   const oldSlides: SlideType[] = oldPresentationMaker.presentation.slides;
   const idSelectedSlide: string = oldPresentationMaker.idsSelectedSlides[0];
   const selectedSlide: SlideType = oldSlides.filter((slide) => {
      return idSelectedSlide === slide.id;
   })[0];

   let idsSelectedBlocks: string[] = oldPresentationMaker.idsSelectedBlocks;
   let oldBlocks: Block[] = selectedSlide.blocks;

   let newBlocks: Block[] = oldBlocks.map((block) => {
      if (idsSelectedBlocks.includes(block.id)) {
         if (block.content.typeBlock === TypeBlock.text) {
            const oldTextBlock: TextBlock = block.content;
            let newTextBlock: TextBlock = {...oldTextBlock};
            if (newTextStyle) {
               if (newTextStyle === TextStyles.bold) {
                  newTextBlock = {
                     ...oldTextBlock,
                     isBold: !oldTextBlock.isBold,
                  };
               }
               if (newTextStyle === TextStyles.italic) {
                  newTextBlock = {
                     ...oldTextBlock,
                     isItalic: !oldTextBlock.isItalic,
                  };
               }
               if (newTextStyle === TextStyles.underline) {
                 newTextBlock = {
                   ...oldTextBlock,
                   isStrikethrough: false,
                   isUnderline: !oldTextBlock.isUnderline,
                 };
               }
               if (newTextStyle === TextStyles.strikethrough) {
                  newTextBlock = {
                    ...oldTextBlock,
                    isUnderline: false,
                    isStrikethrough: !oldTextBlock.isStrikethrough,
                  };
               }
            }
            if (newColor) {
               newTextBlock = {
                  ...oldTextBlock,
                  color: newColor,
               };
            }
            if (newFont) {
               newTextBlock = {
                  ...oldTextBlock,
                  font: newFont,
               };
            }
            if (newFontSize) {
               newTextBlock = {
                  ...oldTextBlock,
                  fontSize: newFontSize,
               };
            }
            
            return {
               ...block,
               content: newTextBlock,
            }
         } else {
            return block;
         }
      }
      return block;
   });

   const newSlides: SlideType[] = oldSlides.map((slide) => {
      if (slide.id === idSelectedSlide) {
         return {
            ...slide,
            blocks: newBlocks,
         };
      }
      return slide;
   });

   const newPresentation: Presentation = {
      ...oldPresentationMaker.presentation,
      slides: newSlides,
   };

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   };
}

type propsType = {rejectedCoordinateX: number, rejectedCoordinateY: number,id:string}

function moveBlock(oldPresentationMaker: PresentationMaker, props:propsType): PresentationMaker {
   let newSlides: SlideType[] = [];
   oldPresentationMaker.presentation.slides.forEach(slide=>{
      if(slide.id === oldPresentationMaker.idsSelectedSlides[oldPresentationMaker.idsSelectedSlides.length - 1])
      {
         let newBlocks: Block[] = []
         slide.blocks.forEach(block=>{
            if(block.id === props.id)
            {
               newBlocks.push(
               {
                  ...block,
                  coordinatesX : props.rejectedCoordinateX,
                  coordinatesY : props.rejectedCoordinateY,
               })
            }
            if(block.id !== props.id)
            {
               newBlocks.push(block)
            }
         })
         newSlides.push({
            ...slide,
            blocks: newBlocks,
         })
      }
      if(slide.id !== oldPresentationMaker.idsSelectedSlides[oldPresentationMaker.idsSelectedSlides.length - 1])
      {
         newSlides.push(slide)
      }
   })

   return {
       ...oldPresentationMaker,
       presentation: {
          ...oldPresentationMaker.presentation,
          slides: [] = newSlides,
       },
   }
}

type propsTypeResize = {width: number, height: number, id: string, rejectedCoordinateX: number, rejectedCoordinateY: number}

function resizeBlock(oldPresentationMaker: PresentationMaker, props:propsTypeResize): PresentationMaker {
   let newSlides: SlideType[] = [];
   oldPresentationMaker.presentation.slides.forEach(slide=>{
      if(slide.id === oldPresentationMaker.idsSelectedSlides[oldPresentationMaker.idsSelectedSlides.length - 1])
      {
         let newBlocks: Block[] = []
         slide.blocks.forEach(block=>{
            if(block.id === props.id)
            {
               newBlocks.push(
                   {
                      ...block,
                      width :props.width,
                      height :props.height,
                      coordinatesX: props.rejectedCoordinateX,
                      coordinatesY: props.rejectedCoordinateY,
                   })
            }
            if(block.id !== props.id)
            {
               newBlocks.push(block)
            }
         })
         newSlides.push({
            ...slide,
            blocks: newBlocks,
         })
      }
      if(slide.id !== oldPresentationMaker.idsSelectedSlides[oldPresentationMaker.idsSelectedSlides.length - 1])
      {
         newSlides.push(slide)
      }
   })

   return {
      ...oldPresentationMaker,
      presentation: {
         ...oldPresentationMaker.presentation,
         slides: [] = newSlides,
      },
   }
}


export {
    moveBlock,
    addBlock,
    deleteBlocks,
    changeText,
    changeStyleText,
    resizeBlock,
    selectBlock,
    selectBlocks,
}