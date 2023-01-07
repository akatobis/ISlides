import {elemInArray} from "../auxiliaryFunctions";
import {v4 as uuidv4} from "uuid";
import {
   Block,
   Figure,
   FigureType,
   Image,
   Presentation,
   PresentationMaker,
   SlideType,
   TextBlock,
   TextStyles,
   TypeBlock
} from "../types";

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

function addImage(img: string): Image {
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
         colorFill: "white",
         border: 1,
         colorBorder: "black",
      };
   }

   if (figureType === FigureType.triangle) {
      return {
         typeBlock: TypeBlock.figure,
         type: {
         figureType: FigureType.triangle,
         topX: 10,
         },
         colorFill: "white",
         border: 1,
         colorBorder: "black",
      };
   }

   return {
      typeBlock: TypeBlock.figure,
      type: {
         figureType: FigureType.rectangle,
      },
      colorFill: "white",
      border: 1,
      colorBorder: "black",
   };
}

function addBlock(oldPresentationMaker: PresentationMaker, { img, figureType }: { img?: string; figureType?: FigureType }): PresentationMaker {
   console.log(figureType);
   let contentNewBlock!: Image | TextBlock | Figure;
   if (img) {
      contentNewBlock = addImage(img);
   } else if (figureType === 0 || figureType === 1 || figureType === 2) {
      contentNewBlock = createFigure(figureType);
   } else {
      contentNewBlock = createTextBlock();
   }

   const idNewBlock: string = uuidv4();
   const newBlock: Block = {
      id: idNewBlock,
      content: contentNewBlock,
      coordinatesX: 500,
      coordinatesY: 500,
      width: 100,
      height: 100,
   };

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
   const oldSlides: SlideType[] = oldPresentationMaker.presentation.slides;
   const idSelectedSlide: string = oldPresentationMaker.idsSelectedSlides[0];
   const selectedSlide: SlideType = oldSlides.filter((slide) => {
      return idSelectedSlide === slide.id;
   })[0];

   let idsSelectedBlocks: string[] = oldPresentationMaker.idsSelectedBlocks;
   let oldBlocks: Block[] = selectedSlide.blocks;
   let newBlocks: Block[] = oldBlocks.filter((block) => {
      return !elemInArray(idsSelectedBlocks, block.id);
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

   if (oldPresentationMaker.idsSelectedSlides.length === 1)
   {
      return {
         ...oldPresentationMaker,
         presentation: newPresentation,
         idsSelectedBlocks: [],
      };
   } else {
      return {...oldPresentationMaker}
   }
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
      if (elemInArray(idSelectedBlock, block.id)) {
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
      if (elemInArray(idsSelectedBlocks, block.id)) {
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
   let newSlides: SlideType[] = new Array(oldPresentationMaker.presentation.slides.length);
   let numberSlide = 0;
   for(let i = 0;i < oldPresentationMaker.presentation.slides.length;i++)
   {
       if(oldPresentationMaker.idsSelectedSlides[oldPresentationMaker.idsSelectedSlides.length - 1] == oldPresentationMaker.presentation.slides[i].id)
       {
           numberSlide = i;
           break;
       }
       newSlides[i] = oldPresentationMaker.presentation.slides[i];
   }
   let insertedNewBlock = false;
   let newBlocks: Block[] = new Array(oldPresentationMaker.presentation.slides[numberSlide].blocks.length);
   for(let int = 0;int < oldPresentationMaker.presentation.slides[numberSlide].blocks.length; int++)
   {
      if(oldPresentationMaker.presentation.slides[numberSlide].blocks[int].id == props.id)
      {
          newBlocks[int] = {
              ...newBlocks[int] = oldPresentationMaker.presentation.slides[numberSlide].blocks[int],
              coordinatesX : props.rejectedCoordinateX,
              coordinatesY : props.rejectedCoordinateY,
          };
          insertedNewBlock = true;
      }
       if(!insertedNewBlock) newBlocks[int] = oldPresentationMaker.presentation.slides[numberSlide].blocks[int];
       insertedNewBlock = false;
   }

   const newSlide: SlideType = {
       ...oldPresentationMaker.presentation.slides[numberSlide],
       blocks: [] = newBlocks,
   }

   newSlides[numberSlide] = newSlide;

   for(let i = numberSlide + 1;i < oldPresentationMaker.presentation.slides.length;i++)
   {
       newSlides[i] = oldPresentationMaker.presentation.slides[i];
   }

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
   let newSlides:SlideType[] = new Array(oldPresentationMaker.presentation.slides.length);
   let numberSlide = 0;
   for(let i = 0;i < oldPresentationMaker.presentation.slides.length;i++)
   {
       if(oldPresentationMaker.idsSelectedSlides[oldPresentationMaker.idsSelectedSlides.length - 1] == oldPresentationMaker.presentation.slides[i].id)
       {
           numberSlide = i;
           break;
       }
       newSlides[i] = oldPresentationMaker.presentation.slides[i];
   }
   let insertedNewBlock = false;
   let newBlocks:Block[] = new Array(oldPresentationMaker.presentation.slides[numberSlide].blocks.length);
   for(let int = 0;int < oldPresentationMaker.presentation.slides[numberSlide].blocks.length;int++)
   {
      if(oldPresentationMaker.presentation.slides[numberSlide].blocks[int].id == props.id)
      {
          newBlocks[int] = {
              ...newBlocks[int] = oldPresentationMaker.presentation.slides[numberSlide].blocks[int],
              width :props.width,
              height :props.height,
              coordinatesX: props.rejectedCoordinateX,
              coordinatesY: props.rejectedCoordinateY,
          };
          insertedNewBlock = true;
      }
       if(!insertedNewBlock) newBlocks[int] = oldPresentationMaker.presentation.slides[numberSlide].blocks[int];
       insertedNewBlock = false;
   }

   const newSlide: SlideType = {
       ...oldPresentationMaker.presentation.slides[numberSlide],
       blocks: [] = newBlocks,
   }

   newSlides[numberSlide] = newSlide;

   for(let i = numberSlide + 1;i < oldPresentationMaker.presentation.slides.length;i++)
   {
       newSlides[i] = oldPresentationMaker.presentation.slides[i];
   }

   const newPresentation: Presentation = {
       ...oldPresentationMaker.presentation,
       slides: [] = newSlides,
   }

   return {
       ...oldPresentationMaker,
       presentation: newPresentation,
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
}