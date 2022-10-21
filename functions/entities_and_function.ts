// пока оставим
function savePresentation(oldPresentationMaker: PresentationMaker): boolean {
   return true;
}

// пока оставим
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

// пока оставим
function uploadPresentation(oldPresentationMaker: PresentationMaker, path: string): PresentationMaker {
   const newPresentation: Presentation;
   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   };
}

// Артем
function moveSlide(oldPresentationMaker: PresentationMaker, insertionIndex: number): PresentationMaker {
   return {
      ...oldPresentationMaker,
      idsSelectedSlides: [],
   };
}

// Артем 
function addSlide(oldPresentationMaker: PresentationMaker): PresentationMaker {
   const newSlide: Slide = {
      id: idNewSlide,
      background: '#fff',
      blocks: [],
   }

   const newPresentation: Presentation = {
      ...oldPresentantion,
      slides: [...oldSlides, newSlide],
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
      idsSelectedSlides: [],
   }
}

// Артем 
function deleteSlide(oldPresentationMaker: PresentationMaker): PresentationMaker {
   const newPresentation: Presentation = {
      ...oldPresentantion,
      slides: newSlides,
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
      idsSelectedSlides: [],
   }
}

// Артем 
function selectSlide(oldPresentationMaker: PresentationMaker, idNewSlide: number): PresentationMaker { // переименова ть
   return {
      ...oldPresentationMaker,
      idsSelectedSlides: [],
   }
}

// Артем 
function ChangeBackgroundSlide(oldPresentationMaker: PresentationMaker, background: string): PresentationMaker {
   const newSlide: Slide = {
      background: background,
   }

   const newPresentation: Presentation = {
      ...oldPresentation,
      slides: [...oldSlides, newSlide],
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   }
}

// Артем 
function addBlock(oldPresentationMaker: PresentationMaker, typeBlock: TypeBlock): PresentationMaker {
   const newBlock: Block = {
         id: idNewBlock, 
         content: TextBlock,
         coordinatX: 500,
         coordinatY: 500,
         width: 400,
         higth: 250,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [...oldBlocks, newBlock],
   }

   const newPresentation: Presentation = {
      ...oldPresentation,
      slides: [...oldSlides, newSlide],
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
      idsSelectedBlocks: [],
   }
}

// Артем 
function selectBlock(oldPresentationMaker: PresentationMaker, idSelectedBlock: string): PresentationMaker {
   return {
      ...oldPresentationMaker,
      idsSelectedBlocks: [],
   }
}

// Артем 
function moveBlock(oldPresentationMaker: PresentationMaker, newCoordinatX: number, newCoordinatY: number): PresentationMaker {
   const newBlock: Block = {
      coordinatX: newCoordinatX,
      coordinatY: newCoordinatY,
   };

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [...oldBlocks, newBlock],
   }

   const newPresentation: Presentation = {
      ...oldPresentation,
      slides: [],
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   }
}

// Артем 
function resizeBlock(oldPresentationMaker: PresentationMaker, newWidth: number, newHeigth: number): PresentationMaker {
   const newBlock: Block = {
      width: newWidth,
      higth: newHeigth,
   }

   const newSlide: Slide = {
      ...oldSlides,
      blocks: [],
   }

   const newPresentation: Presentation = {
      ...oldPresentation,
      slides: [],
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   }
}

// Кирилл
function changeFillColorFigure(oldPresentationMaker: PresentationMaker, color: string): PresentationMaker {
   const newFigure: Figure = {
      ...oldFigure,
      colorFill: color,
   }
   
   const newBlock: Block = {
      ...oldBlock,
      content: newFigure,
   }

   const newSlide: Slide = {
      ...oldBlock,
      blocks: [],
   }

   const newPresentation: Presentation = {
      ...oldPresentation,
      slides: [],
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   }
}

// Кирилл
function changeBorderColorFigure(oldPresentationMaker: PresentationMaker, color: string): PresentationMaker {
   const newFigure: Figure = {
      ...oldFigure,
      colorBorder: color,
   }
   
   const newBlock: Block = {
      ...oldBlock,
      content: newFigure,
   }

   const newSlide: Slide = {
      ...oldBlock,
      blocks: [],
   }

   const newPresentation: Presentation = {
      ...oldPresentation,
      slides: [],
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   }
}

// Я
function changeText(oldPresentationMaker: PresentationMaker): PresentationMaker {
   return {
      ...oldPresentantionMaker,
      presentation: newPresentation,
   }
}

// Я
function changeBoldText(oldPresentationMaker: PresentationMaker): PresentationMaker {
   const newTextStyle: TextStyle = {
      style: bold,
      font: undefined,
      colour: undefined,
      begin: 0,
      end: 0,
   }

   const newTextBlock: TextBlock = {
      ...oldTextBlock,
      textStyle: [...oldTextStyle, newTextStyle],
   }

   const newBlock: Block = {
      ...oldBlock,
      content: newTextBlock,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [],
   }

   const newPresentation: Presentation = {
      ...oldPresentation,
      slides: [],
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   }
}

// Я
function changeItalicText(oldPresentationMaker: PresentationMaker): PresentationMaker {
   const newTextStyle: TextStyle = {
      style: italic,
      font: undefined,
      colour: undefined,
      begin: 0,
      end: 0,
   }

   const newTextBlock: TextBlock = {
      ...oldTextBlock,
      textStyle: [...oldTextStyle, newTextStyle],
   }

   const newBlock: Block = {
      ...oldBlock,
      content: newTextBlock,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [],
   }

   const newPresentation: Presentation = {
      ...oldPresentation,
      slides: [],
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   }
}

// Я
function changeUnderlineText(oldPresentationMaker: PresentationMaker): PresentationMaker {
  const newTextStyle: TextStyle = {
      style: underline,
      font: undefined,
      colour: undefined,
      begin: 0,
      end: 0,
   }

   const newTextBlock: TextBlock = {
      ...oldTextBlock,
      textStyle: [...oldTextStyle, newTextStyle],
   }

   const newBlock: Block = {
      ...oldBlock,
      content: newTextBlock,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [],
   }

   const newPresentation: Presentation = {
      ...oldPresentation,
      slides: [],
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   }
}

// Я
function changeStrikethroughText(oldPresentationMaker: PresentationMaker): PresentationMaker {
  const newTextStyle: TextStyle = {
      style: strike,
      font: undefined,
      colour: undefined,
      begin: 0,
      end: 0,
   }

   const newTextBlock: TextBlock = {
      ...oldTextBlock,
      textStyle: [...oldTextStyle, newTextStyle]
   }

   const newBlock: Block = {
      ...oldBlock,
      content: newTextBlock,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [],
   }

   const newPresentation: Presentation = {
      ...oldPresentation,
      slides: [],
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   }
}

// Я
function changeFontText(oldPresentationMaker: PresentationMaker, font: string): PresentationMaker { // подобные функции сделать в один
    const newTextStyle: TextStyle = {
      style: undefined,
      font: font,
      colour: undefined,
      begin: 0,
      end: 0,
   }

   const newTextBlock: TextBlock = {
      ...oldTextBlock,
      textStyle: [...oldTextStyle, newTextStyle],
   }

   const newBlock: Block = {
      ...oldBlock,
      content: newTextBlock,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [],
   }

   const newPresentation: Presentation = {
      ...oldPresentation,
      slides: [],
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   }
}

// Я
function changeColorText(oldPresentationMaker: PresentationMaker, colour: string): PresentationMaker {
  const newTextStyle: TextStyle = {
      style: undefined,
      font: undefined,
      colour: colour,
      begin: 0,
      end: 0
   }

   const newTextBlock: TextBlock = {
      ...oldTextBlock,
      textStyle: [...oldTextStyle, newTextStyle]
   }

   const newBlock: Block = {
      ...oldBlock,
      content: newTextBlock,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [],
   }

   const newPresentation: Presentation = {
      ...oldPresentation,
      slides: []
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   }
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
   // content: TextBlock | Image | Figure,
   coordinatX: number,
   coordinatY: number,
   width: number,
   higth: number,
}

enum TypeBlock {
   image,
   text,
   figure,
}

// type TextBlock = {
//    typeBlock: TypeBlock,
//    innerString: string,
//    textStyle: TextStyle[],
// }

type TextBlock = Block & { // объединение типа
   innerString: string,
   textStyle: TextStyle[],
}

type TextStyle = {
   style?: TextStyles,
   colour: string,
   font: string,
   begin: number,
   end: number,
}

enum TextStyles  {
   bold,
   italic,
   strikethrough,
   underline,
}

type Image = Block & {
   imageBase64: string,
}

type Figure = Block & {
   colourFill: string,
   colourBorder: string,
}

type Elipse = Figure & {
   rx: number,
   ry: number,
}

type Line = Figure & {
   bx: number,
   by: number,
   ex: number,
   ey: number,
}

type Rectangle = Figure & {
}

type Triangle = Figure & {
   topX: number;
}


// type Image = {
//    typeBlock: TypeBlock,
//    imageBase64: string,
// }

// type Figure = {
//    typeBlock: TypeBlock,
//    type: Elipse | Line | Rectangle | Triangle,
//    colourFill: string,
//    colourBorder: string,
// }

// type Elipse = {
//    figureType: figureType,
//    rx: number,
//    ry: number,
// }

// type Line = {
//    figureType: figureType,
//    bx: number,
//    by: number,
//    ex: number,
//    ey: number,
// }

// type Rectangle = {
//    figureType: figureType,
// }

// type Triangle = {
//    figureType: figureType,
//    topX: number;
// }


enum figureType {
   elipse,
   line,
   rectangle,
   triangle
}


