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

function uploadPresentation(oldPresentationMaker: PresentationMaker, path: string): PresentationMaker {
   const newPresentation: Presentation;
   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   };
}

function moveSlide(oldPresentationMaker: PresentationMaker, insertionIndex: number): PresentationMaker {
   if(insertionIndex > oldPresentationMaker.idsSelectedSlides.length)
   {
      return oldPresentationMaker;
   }

   let newSlides: Slide[] = new Array(oldPresentationMaker.presentation.slides.length);
   let idDontFit = false;

   for(let i = 0; i < oldPresentationMaker.presentation.slides.length; i++)
   {
      for(let int = 0; int < oldPresentationMaker.idsSelectedSlides.length; int++) {
         if (oldPresentationMaker.presentation.slides[i].id == oldPresentationMaker.idsSelectedSlides[int])
         {
               idDontFit=true;
         }
      }

      if (!idDontFit)
      {
         newSlides[i] =  oldPresentationMaker.presentation.slides[i];
      }

      if(i == insertionIndex)
      {
         for(let int = 0; int < oldPresentationMaker.idsSelectedSlides.length; int++){
               i+=1;
               newSlides[i] = oldPresentationMaker.presentation.slides[oldPresentationMaker.idsSelectedSlides[int]];
         }
      }

      idDontFit = false;
   }

   const newPresentation: Presentation = {
      ...oldPresentationMaker.presentation,
      slides :[] =  newSlides,
   }

   return {
      ...oldPresentationMaker,
      presentation : newPresentation,
      idsSelectedSlides: [],
   };
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

   for(; i < oldPresentationMaker.presentation.slides.length; i++)
   {
      newSlides[i] = oldPresentationMaker.presentation.slides[i];
   }

   let newIdSelecetdeSlides: string[] = new Array(oldPresentationMaker.idsSelectedSlides.length + 1);

   for(i = 0; i < oldPresentationMaker.idsSelectedSlides.length; i++)
   {
      newIdSelecetdeSlides[i] = oldPresentationMaker.idsSelectedSlides[i];
   }
   newIdSelecetdeSlides[newIdSelecetdeSlides.length-1] = newSlide.id;

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

function elemInArray(array: any, elem: any): boolean {
   return array.indexOf(elem) === -1
}

function deleteSlides(oldPresentationMaker: PresentationMaker): PresentationMaker {
   const oldIdsSelectedSlides: string[] = oldPresentationMaker.idsSelectedSlides;
   let newIdsSelectedSlides: string[] = [];
   const idLastSelectedSlide: string = oldIdsSelectedSlides[oldIdsSelectedSlides.length - 1];
   const oldSlides: Slide[] = oldPresentationMaker.presentation.slides;
   let newSlides: Slide[] = [];

   oldSlides.forEach(slide => {
      if (elemInArray(oldIdsSelectedSlides, slide.id)) {
         newSlides.push(slide);
      }
      if (slide.id === idLastSelectedSlide) {
         let nextSlide: Slide = oldSlides[oldSlides.indexOf(slide) + 1];
         newIdsSelectedSlides.push(nextSlide.id);
      }
   });

   const newPresentation: Presentation = {
      ...oldPresentationMaker.presentation,
      slides: newSlides,
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
      idsSelectedSlides: newIdsSelectedSlides,
   }
}

function selectSlides(oldPresentationMaker: PresentationMaker, idNewSlide: string): PresentationMaker {
   return {
      ...oldPresentationMaker,
      idsSelectedSlides: [idNewSlide],
   }
}

function getSlideById(slides: Slide[], idSlide: string): Slide | void {
   for (let i = 0; i < slides.length; i++) {
      let slide: Slide = slides[i]
      if (slide.id === idSlide) {
         return slide
      }
   }
}

function getSelectedSlildes(slides: Slide[], idsSelectedSlides: string[]): Slide[] {
   let selectedSlides: Slide[] = [];
   slides.forEach(slide => {
      if (!elemInArray(idsSelectedSlides, slide.id)) {
         selectedSlides.push(slide)
      }
   });
   return selectedSlides;
}

function replaceSlides(slides: Slide[], replacementSlides: Slide[], idsSelectedSlides: string[]): Slide[] {
   replacementSlides.forEach(replacementSlide => {
      if (elemInArray(idsSelectedSlides, replacementSlide.id)) {
         const indexSelectedSlide: number = replacementSlides.indexOf(replacementSlide);
         slides = slides.splice(indexSelectedSlide, 1, replacementSlide);
      }
   });

   return slides;
}

function ChangeBackgroundSlide(oldPresentantionMaker: PresentationMaker, newBackground: string): PresentationMaker {
   const idsSelectedSlides: string[] = oldPresentantionMaker.idsSelectedSlides;
   const slides: Slide[] = oldPresentantionMaker.presentation.slides;
   const selectedSlides: Slide[] = getSelectedSlildes(slides, idsSelectedSlides);

   selectedSlides.forEach(selectedSlide => {
      selectedSlide.background = newBackground;
   });

   const newSlides: Slide[] = replaceSlides(slides, selectedSlides, idsSelectedSlides);

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
    return {
        ...oldPresentationMaker,
        idsSelectedBlocks: [idSelectedBlock],
    }
}

function moveBlock(oldPresentationMaker: PresentationMaker, newCoordinatX: number, newCoordinatY: number): PresentationMaker {
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
    let numberBlock = 0;
    let newBlocks: Block[] = new Array(oldPresentationMaker.presentation.slides[numberSlide].blocks.length);
    for(let int = 0;int < oldPresentationMaker.presentation.slides[numberSlide].blocks.length; int++)
    {
        if(oldPresentationMaker.presentation.slides[numberSlide].blocks[int].id == oldPresentationMaker.idsSelectedBlocks[oldPresentationMaker.idsSelectedBlocks.length - 1])
        {
            numberBlock = int;
            break;
        }
        newBlocks[int] = oldPresentationMaker.presentation.slides[numberSlide].blocks[int];
    }
    const newBlock: Block = {
        ...oldPresentationMaker.presentation.slides[numberSlide].blocks[numberBlock],
        coordinatX: newCoordinatX,
        coordinatY: newCoordinatY,
    };

    newBlocks[newBlocks.length - 1] = newBlock;

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

function resizeBlock(oldPresentationMaker: PresentationMaker, newWidth: number, newHeigth: number): PresentationMaker {
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
    let numberBlock = 0;
    let newBlocks:Block[] = new Array(oldPresentationMaker.presentation.slides[numberSlide].blocks.length);
    for(let int = 0;int < oldPresentationMaker.presentation.slides[numberSlide].blocks.length;int++)
    {

        if(oldPresentationMaker.presentation.slides[numberSlide].blocks[int].id == oldPresentationMaker.idsSelectedBlocks[oldPresentationMaker.idsSelectedBlocks.length - 1])
        {
            numberBlock = int;
            break;
        }

        newBlocks[int] = oldPresentationMaker.presentation.slides[numberSlide].blocks[int];
    }

    const newBlock: Block = {
        ...oldPresentationMaker.presentation.slides[numberSlide].blocks[numberBlock],
        width: newWidth,
        higth: newHeigth,
    }

    newBlocks[newBlocks.length - 1] = newBlock;

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
   const slides: Slide[] = oldPresentationMaker.presentation.slides;
   const idSelectedSlide: string = oldPresentationMaker.idsSelectedSlides[0];

   let selectedSlide: Slide | void = getSlideById(slides, idSelectedSlide);
   if (!selectedSlide) {
      return oldPresentationMaker;
   }

   let idsSelectedBlocks: string[] = oldPresentationMaker.idsSelectedBlocks;
   let oldBlocks: Block[] = selectedSlide.blocks;
   let newBlocks: Block[] = [];

   oldBlocks.forEach(block => {
      if (idsSelectedBlocks.indexOf(block.id) === -1) {
         newBlocks.push(block);
      }
   });

   const indexSelectedSlide = slides.indexOf(selectedSlide);
   selectedSlide = {
      ...selectedSlide,
      blocks: newBlocks,
   }
   slides.splice(indexSelectedSlide, 1, selectedSlide);

   const newPresentation: Presentation = {
      ...oldPresentationMaker.presentation,
      slides: slides,
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
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

function addImage(img: string): Image {
   return {
      typeBlock: TypeBlock.image,
      imageBase64: img,
   }
}

function createTextBlock(): TextBlock {
   return {
      typeBlock: TypeBlock.text,
      innerString: '',
      isBold: false,
      isItalick: false,
      isStrikethrough: false,
      isUnderline: false,
      colour: '000',
      font: 16,
   }
}

function addBlock(oldPresentationMaker: PresentationMaker, { img, figureType }: { img?: string, figureType?: FigureType }): PresentationMaker {
   let contentNewBlock!: Image | TextBlock | Figure;
   if (img) {
      contentNewBlock = addImage(img);
   } else if (figureType) {
      contentNewBlock = createFigure(figureType);
   } else {
      contentNewBlock = createTextBlock();
   }

   const idNewBlock: string = '';
   const newBlock: Block = {
         id: idNewBlock,
         content: contentNewBlock,
         coordinatX: 500,
         coordinatY: 500,
         width: 400,
         higth: 250,
   }

   const oldPresentation: Presentation = oldPresentationMaker.presentation;
   const oldSlides: Slide[] = oldPresentation.slides;
   const idSelectedSlide: string = oldPresentationMaker.idsSelectedSlides[0];

   let selectedSlide: Slide | void = getSlideById(oldSlides, idSelectedSlide);
   if (!selectedSlide) {
      return oldPresentationMaker;
   }

   const oldBlocks: Block[] = selectedSlide.blocks;

   const indexSelectedSlide = oldSlides.indexOf(selectedSlide);
   const newSelectedSlide: Slide = {
      ...selectedSlide,
      blocks: [...oldBlocks, newBlock],
   }
   const newSlides: Slide[] = oldSlides.splice(indexSelectedSlide, 1, newSelectedSlide);

   const newPresentation: Presentation = {
      ...oldPresentation,
      slides: newSlides,
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
      idsSelectedBlocks: [idNewBlock],
   }
}

function findBlocksByIds(oldPresentationMaker: PresentationMaker): Block[] {
    const ids: string[] = oldPresentationMaker.idsSelectedBlocks;
    const blocks: Block[] = oldPresentationMaker.presentation.slides[0].blocks;

    let selectedBlocks: Block[] = [];

    ids.forEach(id => {
        blocks.forEach(block => {
            if (id === block.id) {
                selectedBlocks.push(block);
            }
        })
    });

    return selectedBlocks;
}

function changeFillColorFigure(oldPresentationMaker: PresentationMaker, color: string) {
   const newPresentationMaker: PresentationMaker = oldPresentationMaker;
   const selectedBlocks: Block[] = findBlocksByIds(oldPresentationMaker);
   const blocks: Block[] = oldPresentationMaker.presentation.slides[0].blocks;

   let newFigure = selectedBlocks[0].content;

   selectedBlocks.forEach(block => {
      newFigure = {
         ...selectedBlocks[selectedBlocks.indexOf(block)].content,
         colorBorder: color,
      }
      block.content = newFigure;
   });

   selectedBlocks.forEach(sBlock => {
      blocks.forEach(oBlock => {
         if (sBlock.id === oBlock.id) {
               blocks[blocks.indexOf(oBlock)] = sBlock;
         }
      });
   });

   newPresentationMaker.presentation.slides[0].blocks = blocks;

   return newPresentationMaker;
}

function changeBorderColorFigure(oldPresentationMaker: PresentationMaker, color: string): PresentationMaker {
   const newPresentationMaker: PresentationMaker = oldPresentationMaker;
   const selectedBlocks = findBlocksByIds(oldPresentationMaker);
   const blocks: Block[] = oldPresentationMaker.presentation.slides[0].blocks;

   let newFigure = selectedBlocks[0].content;

   selectedBlocks.forEach(block => {
      newFigure = {
         ...selectedBlocks[selectedBlocks.indexOf(block)].content,
         colorFill: color,
      }
      block.content = newFigure;
   });

   selectedBlocks.forEach(sBlock => {
      blocks.forEach(oBlock => {
         if (sBlock.id === oBlock.id) {
               blocks[blocks.indexOf(oBlock)] = sBlock;
         }
      });
   });

   newPresentationMaker.presentation.slides[0].blocks = blocks;

   return newPresentationMaker;
}

function changeText(oldTextBlock: TextBlock, { newTextStyle, newColour, newFont }: { newTextStyle?: TextStyles, newColour?: string, newFont?: number } ): TextBlock | undefined {
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
            isItalick: !oldTextBlock.isItalick,
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
   if (newColour) {
      return {
         ...oldTextBlock,
         colour: newColour,
      }
   }
   if (newFont) {
      return {
         ...oldTextBlock,
         font: newFont,
      }
   }
   return undefined;
}

type PresentationMaker = {
   presentation: Presentation,
   idsSelectedBlocks: string[],
   idsSelectedSlides: string[],
   selectedText: {
      begin: 5,
      end: 10,
   }
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
   id: string,
   content: TextBlock | Image | Figure,
   coordinatX: number,
   coordinatY: number,
   width: number,
   higth: number,
}

type TextBlock = {
   typeBlock: TypeBlock,
   innerString: string,
   isBold: boolean,
   isItalick: boolean,
   isStrikethrough: boolean,
   isUnderline: boolean
   colour: string,
   font: number,
}

type TextStyle = {
   style?: TextStyles,
   colour: string,
   font: string,
   begin: number,
   end: number,
}

enum TextStyles {
   bold,
   italic,
   strikethrough,
   underline,
}

type Image = {
   typeBlock: TypeBlock,
   imageBase64: string,
}

type Figure = {
   typeBlock: TypeBlock,
   type: Ellipse | Rectangle | Triangle,
   colorFill: string,
   border: number,
   colorBorder: string,
}

type Ellipse = {
   figureType: FigureType,
   rx: number,
   ry: number,
}

type Rectangle = {
   figureType: FigureType,
}

type Triangle = {
   figureType: FigureType,
   topX: number;
}

enum TypeBlock {
   image,
   text,
   figure,
}

enum FigureType {
   ellipse,
   rectangle,
   triangle
}