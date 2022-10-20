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
   const newPresentation: Presentation = {
      ...oldPresentantion,
      idsSelectedObjects = [],
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   };
}

function addSlide(oldPresentationMaker: PresentationMaker): PresentationMaker {
   const newSlide: Slide = {
      id: idNewSlide,
      background: '#fff',
      blocks: [],
      idsSelectedBlocks: [],
   }

   const newPresentation: Presentation = {
      ...oldPresentantion,
      slides: [...oldSlides, newSlide],
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   }
}

function deleteSlide(oldPresentationMaker: PresentationMaker): PresentationMaker {
   const newPresentation: Presentation = {
      ...oldPresentantion,
      slides: newSlides,
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   }
}

function switchSlide(oldPresentationMaker: PresentationMaker, idNewSlide: number): PresentationMaker {
   return {
      ...oldPresentation,
      idsSelectedSlides: [idNewSlide],
   }
}

function ChangeBackground(oldPresentationMaker: PresentationMaker, background: string): PresentationMaker {
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
   }
}

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

function changeText(oldPresentationMaker: PresentationMaker): PresentationMaker {
   return {
      ...oldPresentantionMaker,
      presentation: newPresentation,
   }
}

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
   currSlide: number,
   idsSelectedObjects: IdsSelectedSlides | IdsSelectedBlock,
   selectedText: {
      begin: 5,
      end: 10,
   }
}

type IdsSelectedSlides = {
   ids: string[],
}

type IdsSelectedBlock = {
   ids: string[],
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

enum TypeBlock {
   image,
   text,
   figure,
}

type TextBlock = {
   innerString: string,
   textStyle: TextStyle[],
}

// type TextBlock = Block & { //расширение типа
//    innerString: string,
//    editStatus: true,
//    textStyle: TextStyle[],
// }

type TextStyle = {
   style?: TextStyles,
   colour?: string,
   font?: string,
   begin: number,
   end: number,
}

enum TextStyles  {
   bold,
   italic,
   strikethrough,
   underline,
}

type Image = {
   imageBase64: string,
}

type Figure = {
   type: TypeFigure,
   colourFill: string,
   colourBorder: string,
}

enum TypeFigure {
   elipse, 
   line,
   rectangle,
   triangle,
}

type elipse = {
   rx: number,
   ry: number,
}

type line = {
   bx: number,
   by: number,
   ex: number,
   ey: number,
}

type rectangle = {
}

type triangle = {
   topX: number;
}