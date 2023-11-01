import { PresentationMaker, Presentation, SlideType, Block, Figure, TypeBlock } from "../../types";

function changeColorFigure(oldPresentationMaker: PresentationMaker, {colorFill, colorBorder}: {colorFill?: string, colorBorder?: string}): PresentationMaker {
    const oldSlides: SlideType[] = oldPresentationMaker.presentation.slides;
    const idSelectedSlide: string = oldPresentationMaker.idsSelectedSlides[0];
    const selectedSlide: SlideType = oldSlides.filter((slide) => {
        return idSelectedSlide === slide.id;
    })[0];

    const oldBlocks: Block[] = selectedSlide.blocks;
    const idsSelectedBlocks: string[] = oldPresentationMaker.idsSelectedBlocks;

    const newBlocks: Block[] = oldBlocks.map(block => {
        if (idsSelectedBlocks.includes(block.id)) {
          let oldFigure: Figure;
          if (block.content.typeBlock === TypeBlock.figure) {
            oldFigure = {
              ...block.content,
            };
            let newFigure: Figure = { ...oldFigure };
            if (colorFill) {
              newFigure = {
                ...oldFigure,
                colorFill: colorFill,
              };
            }
            if (colorBorder) {
              newFigure = {
                ...oldFigure,
                colorBorder: colorBorder,
              };
            }
            return {
              ...block,
              content: newFigure,
            };
          }
        }
        return block;
    })

    const newSlides: SlideType[] = oldSlides.map(slide => {
        if (slide.id === idSelectedSlide) {
            return {
                ...slide,
                blocks: newBlocks,
            }
        }
        return slide;
    })

    const newPresentation: Presentation = {
        ...oldPresentationMaker.presentation,
        slides: newSlides,
    };

    return {
        ...oldPresentationMaker,
        presentation: newPresentation,
    }
}

export {
    changeColorFigure,
}