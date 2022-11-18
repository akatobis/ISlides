function savePresentation(oldPresentationMaker: PresentationMaker): boolean {
    return true;
}

function createPresentation(oldPresentationMaker: PresentationMaker): PresentationMaker {
    const newPresentation: Presentation = {
        namePresentation: 'My presentation',
        extension: Extension.pdf,
        slides: [],
    }

    return {
        ...oldPresentationMaker,
        presentation: newPresentation,
    }
}

// function uploadPresentation(oldPresentationMaker: PresentationMaker, path: string): PresentationMaker {
//    const newPresentation: Presentation;
//    return {
//       ...oldPresentationMaker,
//       presentation: newPresentation,
//    };
// }

function moveSlides(oldPresentationMaker: PresentationMaker, insertionIndex: number): PresentationMaker {
    const slides: Slide[] = [...oldPresentationMaker.presentation.slides]

    const movableSlides: Slide[] = slides.filter((slide) => {
        return oldPresentationMaker.idsSelectedSlides.indexOf(slide.id) !== -1;
    })

   //  let newSlides: Slide[] = [];
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

function addSlide(oldPresentationMaker: PresentationMaker): PresentationMaker {
    const idNewSlide: string = '';
    const newSlide: Slide = {
       id: idNewSlide,
       background: '#fff',
       blocks: [],
    }
 
    let newSlides: Slide[] = new Array(oldPresentationMaker.presentation.slides.length + 1);
    let i = 0;
    for(i = 0; i < oldPresentationMaker.presentation.slides.length; i++)
    {
       newSlides[i] = oldPresentationMaker.presentation.slides[i];
       if(oldPresentationMaker.presentation.slides[i].id == oldPresentationMaker.idsSelectedSlides[oldPresentationMaker.idsSelectedSlides.length - 1]){
          break;
       }
    }
 
    i+=1;
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
       ...oldPresentationMaker,
       presentation: newPresentation,
       idsSelectedSlides: [] = newIdSelecetdeSlides,
    }
 }

function elemInArray<T>(array: T[], elem: T): boolean {
  return array.indexOf(elem) !== -1;
}

function deleteSlides(oldPresentationMaker: PresentationMaker): PresentationMaker {
  const oldIdsSelectedSlides: string[] = oldPresentationMaker.idsSelectedSlides;
  const idLastSelectedSlide: string = oldIdsSelectedSlides[oldIdsSelectedSlides.length - 1];
  const oldSlides: Slide[] = oldPresentationMaker.presentation.slides;


  const newSlides: Slide[] = oldSlides.filter((slide) => {
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

  const newPresentation: Presentation = {
    ...oldPresentationMaker.presentation,
    slides: newSlides,
  };

  return {
    ...oldPresentationMaker,
    presentation: newPresentation,
    idsSelectedSlides: [
      newSlides[indexLastSelectedSlide - oldIdsSelectedSlides.length + 1].id,
    ],
  };
}


function selectSlides(oldPresentationMaker: PresentationMaker, idNewSlide: string): PresentationMaker {
   return {
      ...oldPresentationMaker,
      idsSelectedSlides: [idNewSlide],
   }
}// такую же для нескольких выделений слайдов

function changeBackgroundSlide(oldPresentantionMaker: PresentationMaker, newBackground: string): PresentationMaker {
   const idsSelectedSlides: string[] = oldPresentantionMaker.idsSelectedSlides;
   const oldSlides: Slide[] = oldPresentantionMaker.presentation.slides;
   const selectedSlides: Slide[] = oldSlides.filter((slide) => {
      return elemInArray(idsSelectedSlides, slide.id);
   });

   let newSlides: Slide[] = oldSlides.map((slide => {
      if (elemInArray(selectedSlides, slide)){
         return {
            ...slide,
            background: newBackground,
         }
      }
      return slide;
   }))

   const newPresentation: Presentation = {
      ...oldPresentantionMaker.presentation,
      slides: newSlides,
   }

   return {
      ...oldPresentantionMaker,
      presentation: newPresentation,
   }
}

function selectBlock(oldPresentationMaker: PresentationMaker, idSelectedBlock: string): PresentationMaker {
    let newIdsSelectedBlocks: string[] = [...oldPresentationMaker.idsSelectedBlocks, idSelectedBlock];

    newIdsSelectedBlocks = newIdsSelectedBlocks.filter((id, index, arr) => {
        return index === arr.indexOf(id);
    });

    return {
        ...oldPresentationMaker,
        idsSelectedBlocks: newIdsSelectedBlocks,
    }
}

function moveBlock(oldPresentationMaker: PresentationMaker, rejectedCoordinatX: number, rejectedCoordinatY: number): PresentationMaker {
    let newSlides: Slide[] = new Array(oldPresentationMaker.presentation.slides.length);
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
        for(let n = 0;n < oldPresentationMaker.idsSelectedBlocks.length ;n++)
        {
            if(oldPresentationMaker.presentation.slides[numberSlide].blocks[int].id == oldPresentationMaker.idsSelectedBlocks[n])
            {
                newBlocks[int] = {
                    ...newBlocks[int] = oldPresentationMaker.presentation.slides[numberSlide].blocks[int],
                    coordinatesX : oldPresentationMaker.presentation.slides[numberSlide].blocks[int].coordinatesX + rejectedCoordinatX,
                    coordinatesY : oldPresentationMaker.presentation.slides[numberSlide].blocks[int].coordinatesY + rejectedCoordinatY,
                };
                insertedNewBlock = true;
            }
        }
        if(!insertedNewBlock) newBlocks[int] = oldPresentationMaker.presentation.slides[numberSlide].blocks[int];
        insertedNewBlock = false;
    }

    const newSlide: Slide = {
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
// DragAndDrop
function resizeBlock(oldPresentationMaker: PresentationMaker, rejectedWidth: number, rejectedHeigth: number): PresentationMaker {
    let newSlides:Slide[] = new Array(oldPresentationMaker.presentation.slides.length);
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
        for(let n = 0;n < oldPresentationMaker.idsSelectedBlocks.length ;n++)
        {
            if(oldPresentationMaker.presentation.slides[numberSlide].blocks[int].id == oldPresentationMaker.idsSelectedBlocks[n])
            {
                newBlocks[int] = {
                    ...newBlocks[int] = oldPresentationMaker.presentation.slides[numberSlide].blocks[int],
                    width : oldPresentationMaker.presentation.slides[numberSlide].blocks[int].width + rejectedWidth,
                    higth : oldPresentationMaker.presentation.slides[numberSlide].blocks[int].higth + rejectedHeigth,
                };
                insertedNewBlock = true;
            }
        }
        if(!insertedNewBlock) newBlocks[int] = oldPresentationMaker.presentation.slides[numberSlide].blocks[int];
        insertedNewBlock = false;
    }

    const newSlide: Slide = {
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

function deleteBlocks(oldPresentationMaker: PresentationMaker): PresentationMaker {
  const oldSlides: Slide[] = oldPresentationMaker.presentation.slides;
  const idSelectedSlide: string = oldPresentationMaker.idsSelectedSlides[0];
  const selectedSlide: Slide = oldSlides.filter((slide) => {
    return idSelectedSlide === slide.id;
  })[0];

  let idsSelectedBlocks: string[] = oldPresentationMaker.idsSelectedBlocks;
  let oldBlocks: Block[] = selectedSlide.blocks;
  let newBlocks: Block[] = oldBlocks.filter((block) => {
    return !elemInArray(idsSelectedBlocks, block.id);
  });

  const newSlides: Slide[] = oldSlides.map((slide) => {
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

function removeBlockSelection(oldPresentationMaker: PresentationMaker): PresentationMaker {
    return {
        ...oldPresentationMaker,
        idsSelectedBlocks: [],
    }
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
      }
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
      }
   }

   return {
      typeBlock: TypeBlock.figure,
      type: {
         figureType: FigureType.rectangle,
      },
      colorFill: "white",
      border: 1,
      colorBorder: "black",
   }
}

function addBlock(oldPresentationMaker: PresentationMaker, { img, figureType }: { img?: string; figureType?: FigureType }): PresentationMaker {
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
    higth: 250,
  };

  const oldPresentation: Presentation = oldPresentationMaker.presentation;
  const oldSlides: Slide[] = oldPresentation.slides;
  const idSelectedSlide: string = oldPresentationMaker.idsSelectedSlides[0];

  const selectedSlide: Slide = oldSlides.filter((slide) => {
    return idSelectedSlide === slide.id;
  })[0];

  const oldBlocks: Block[] = selectedSlide.blocks;

  const newSlides: Slide[] = oldSlides.map((slide) => {
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

function changeColorFigure(oldPresentationMaker: PresentationMaker, {colorFill, colorBorder}: {colorFill?: string, colorBorder?: string}): PresentationMaker {
   const oldSlides: Slide[] = oldPresentationMaker.presentation.slides;
   const idSelectedSlide: string = oldPresentationMaker.idsSelectedSlides[0];
   const selectedSlide: Slide = oldSlides.filter((slide) => {
      return idSelectedSlide === slide.id;
   })[0];

   const oldBlocks: Block[] = selectedSlide.blocks;
   const idsSelectedBlocks: string[] = oldPresentationMaker.idsSelectedBlocks;

   const newBlocks: Block[] = oldBlocks.map(block => {
      if (elemInArray(idsSelectedBlocks, block.id)) {

         if (block.content.typeBlock === TypeBlock.figure) {
            let newFigure: Figure = {
            ...block.content,
            };
         }
         
         if (colorFill){
            newFigure = {
              ...newFigure,
              colorFill: colorFill,
            };
         }
         if (colorBorder) {
           newFigure = {
             ...newFigure,
             colorBorder: colorBorder,
           };
         }
         return {
            ...block,
            content: newFigure,
         }
      }
      return block;
   })

   const newSlides: Slide[] = oldSlides.map(slide => {
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

function changeText(oldTextBlock: TextBlock, { newTextStyle, newColor, newFont, newFontSize }: { newTextStyle?: TextStyles, newColor?: string, newFont?: string, newFontSize?: number }): TextBlock | undefined {
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

type PresentationMaker = {
   presentation: Presentation,
   idsSelectedBlocks: string[],
   idsSelectedSlides: string[],
}

type Presentation = {
   namePresentation: string,
   extension: Extension,
   slides: Slide[],
}

enum Extension {
   pdf,
   ppt,
   pptx,
}

type Slide = {
   id: string,
   background: string,
   blocks: Block[],
}

type Block = {
  id: string;
  content: TextBlock | Image | Figure;
  coordinatesX: number;
  coordinatesY: number;
  width: number;
  higth: number;
};

type TextBlock = {
   typeBlock: TypeBlock.text;
   innerString: string;
   isBold: boolean;
   isItalic: boolean;
   isStrikethrough: boolean;
   isUnderline: boolean;
   color: string;
   font: string;
   fontSize: number;
};

enum TextStyles {
   bold,
   italic,
   strikethrough,
   underline,
}

type Image = {
   typeBlock: TypeBlock.image,
   imageBase64: string,
}

type Figure = {
   typeBlock: TypeBlock.figure,
   type: Ellipse | Rectangle | Triangle,
   colorFill: string,
   border: number,
   colorBorder: string,
}

type Ellipse = {
   figureType: FigureType.ellipse,
   rx: number,
   ry: number,
}

type Rectangle = {
   figureType: FigureType.rectangle,
}

type Triangle = {
   figureType: FigureType.triangle,
   topX: number;
}

enum TypeBlock {
   image = 'image',
   text = 'text',
   figure = 'figure',
}

enum FigureType {
   ellipse,
   rectangle,
   triangle
}