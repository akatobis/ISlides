import { elemInArray } from "../auxiliaryFunctions";
import { FigureType, Figure, TypeBlock, PresentationMaker, TextBlock, Presentation, SlideType, Image, Block } from "../types";

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

function addBlock(oldPresentationMaker: PresentationMaker, { img, figureType }: { img?: string; figureType?: FigureType }
): PresentationMaker {
  let contentNewBlock!: Image | TextBlock | Figure;
  if (img) {
    contentNewBlock = addImage(img);
  } else if (figureType) {
    contentNewBlock = createFigure(figureType);
  } else {
    contentNewBlock = createTextBlock();
  }

  const idNewBlock: string = "";
  const newBlock: Block = {
    id: idNewBlock,
    content: contentNewBlock,
    coordinatesX: 500,
    coordinatesY: 500,
    width: 400,
    heigth: 250,
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
    idsSelectedBlocks: [],
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

export {
   addBlock,
   deleteBlocks
}