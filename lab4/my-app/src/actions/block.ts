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
  TypeBlock
} from "../types";


function verifyExtentionImg(file: any): boolean {
  const extensionSelectedFile = file.type.split("/").pop();
  return (
    extensionSelectedFile === "png" ||
    extensionSelectedFile === "jpg" ||
    extensionSelectedFile === "jpeg" ||
    extensionSelectedFile === "svg"
  );
}

function addImage(input: any): Image {
  const imgFile = input.files[0];

  if (!verifyExtentionImg(imgFile)) {
    return {
      typeBlock: TypeBlock.image,
      imageBase64: '',
    };
  }

  return {
    typeBlock: TypeBlock.image,
    imageBase64: URL.createObjectURL(imgFile),
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

<<<<<<< HEAD
function addBlock(oldPresentationMaker: PresentationMaker, { img, figureType }: { img?: string; figureType?: FigureType }): PresentationMaker {
  console.log(figureType);
  let contentNewBlock!: Image | TextBlock | Figure;
  if (img) {
    contentNewBlock = addImage(img);
  } else if (figureType === 0 || figureType === 1 || figureType === 2) {
=======
function addBlock(oldPresentationMaker: PresentationMaker, { img, figureType }: { img?: string; figureType?: FigureType }): PresentationMaker {
  console.log(figureType);
  let contentNewBlock!: Image | TextBlock | Figure;
  if (img) {
    contentNewBlock = addImage(img);
  } else if (figureType === 0 || figureType === 1 || figureType === 2) {
>>>>>>> 86fc5b4dbcb9d6e55c861df66bd14b8bebef3da1
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
    width: 400,
    height: 250,
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
    if (elemInArray(idSelectedBlock, block.id)) {
      const oldTextBlock = block.content
      return {
        ...block,
        content: {
          ...oldTextBlock,
          innerString: text,
        }
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

function changeStyleText(oldTextBlock: TextBlock, { newTextStyle, newColor, newFont, newFontSize }: { newTextStyle?: TextStyles, newColor?: string, newFont?: string, newFontSize?: number }): TextBlock | undefined {
   if (newTextStyle) {
      if (newTextStyle = TextStyles.bold) {
         return {
            ...oldTextBlock,
            isBold: !oldTextBlock.isBold,
         }
      }
      if (newTextStyle = TextStyles.italic) {
         return {
            ...oldTextBlock,
            isItalic: !oldTextBlock.isItalic,
         }
      }
      if (newTextStyle = TextStyles.strikethrough) {
         return {
            ...oldTextBlock,
            isUnderline: !oldTextBlock.isUnderline,
         }
      }
      if (newTextStyle = TextStyles.underline) {
         return {
            ...oldTextBlock,
            isStrikethrough: !oldTextBlock.isStrikethrough,
         }
      }
   }
   if (newColor) {
      return {
         ...oldTextBlock,
         color: newColor,
      }
   }
   if (newFont) {
      return {
         ...oldTextBlock,
         font: newFont,
      }
   }
   if (newFontSize) {
      return {
         ...oldTextBlock,
         fontSize: newFontSize,
      }
   }
   return undefined;
}

export {
   addBlock,
   deleteBlocks,
   changeText,
   changeStyleText
}