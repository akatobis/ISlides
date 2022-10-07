function savePresentation(presentation: Presentation): boolean {
   return true;
}

function createPresentation(): Presentation {
   return {
      namePresentation: 'My presentation',
      extension: Extension.pdf,
      slides: [],
      idsSelectedSlides: [],
   }
}

function uploadPresentation(path: string): Presentation {
   const presentation: Presentation
   return presentation;
}

function moveElemInArraySlide(oldSlides: Slide[], insertionIndex: number): [] {
   const newSlides: [] = [];
   return newSlides;
}

function moveSlide(oldPresentation: Presentation, insertionIndex: number): Presentation {
   return {
      ...oldPresentation,
      slides: moveElemInArraySlide(oldPresentation.slides, insertionIndex),
   };
}

function addSlide(oldPresentation: Presentation): Presentation {
   const newSlide: Slide = {
      id: numberNewSlide,
      background: '#fff',
      blocks: [],
      idsSelectedBlocks: [],
   }
   return {
      ...oldPresentation,
      slides: [...oldPresentation.slides, newSlide]
   }
}

function deleteSlide(oldPresentation: Presentation): Presentation {
   return {
      ...oldPresentation,
      slides: [],
   }
}

function switchSlide(oldPresentation: Presentation, idNewSlide: number): Presentation {
   return {
      ...oldPresentation,
      idsSelectedSlides: [idNewSlide],
   }
}

function ChangeBackground(oldPresentantion: Presentation, background: string): Presentation {
   const newSlide = {
      background: background,
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function addBlock(oldPresentantion: Presentation, typeBlock: TypeBlock): Presentation {
   const newBlock: Block = {
         id: 1562, 
         content: TextBlock,
         coordinatX: 500,
         coordinatY: 500,
         width: 400,
         higth: 250,
   }

   const newSlide: Slide = {
   }

   const newSlides: Slide[] = []

   return {
      ...oldPresentantion,
      slides: newSlides,
   }
}

function moveBlock(oldPresentantion: Presentation, newCoordinatX: number, newCoordinatY: number): Presentation {
   const newBlock: Block = {
      coordinatX: newCoordinatX,
      coordinatY: newCoordinatY,
   };

   const newSlide = {
   }

   return {
      ...oldPresentantion,
      slides: []
   }
}

function resizeBlock(oldPresentantion: Presentation, newWidth: number, newHeigth: number): Presentation {
   const newBlock: Block = {
      width: newWidth,
      higth: newHeigth,
   }

   const newSlide: Slide = {
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeFillColorFigure(oldPresentantion: Presentation, color: string): Presentation {
   const newFigure: Figure = {
   }
   
   const newBlock: Block = {
   }

   const newSlide: Slide = {
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeBorderColorFigure(oldPresentantion: Presentation, color: string): Presentation {
   const newFigure: Figure = {
   }

   const newBlock: Block = {
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeBoldText(oldPresentantion: Presentation, begin: number, end: number): Presentation {
   const newTextBlock: TextBlock = {
   }

   const newBlock: Block = {
   }

   const newSlide: Slide = {
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeItalicText(oldPresentantion: Presentation, begin: number, end: number): Presentation {
   const newTextBlock: TextBlock = {
   }

   const newBlock: Block = {
   }

   const newSlide: Slide = {
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeUnderlineText(oldPresentantion: Presentation, begin: number, end: number): Presentation {
   const newTextBlock: TextBlock = {
   }

   const newBlock: Block = {
   }

   const newSlide: Slide = {
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeStrikethroughText(oldPresentantion: Presentation, begin: number, end: number): Presentation {
   const newTextBlock: TextBlock = {
   }

   const newBlock: Block = {
   }

   const newSlide: Slide = {
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeFontText(oldPresentantion: Presentation, font: string, begin: number, end: number): Presentation {
   const newTextBlock: TextBlock = {
   }

   const newBlock: Block = {
   }

   const newSlide: Slide = {
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeColorText(oldPresentantion: Presentation, color: string, begin: number, end: number): Presentation {
   const newTextBlock: TextBlock = {
   }

   const newBlock: Block = {
      content: newTextBlock,
   }

   const newSlide: Slide = {
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

type Presentation = {
   namePresentation: string,
   extension: Extension,
   slides: Slide[],
   idsSelectedSlides: number[],
}

enum Extension {
   pdf,
   ppt,
   pptx,
}

type Slide = {
   id: number,
   background: string,
   blocks: Block[],
   idsSelectedBlocks: number[],
}

type Block = {
   id: number,
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
   editStatus: true,
   textStyle: TextStyle[],
}

type TextStyle = {
   begin: number,
   end: number,
   font: string,
   isItalic: boolean,
   isBold: boolean,
   isStrikethrough: boolean,
   isUnderline: boolean,
   color: string,
}

type Image = {
  urlToImage: string,
}

type Figure = {
   type: TypeFigure,
   colorFill: string,
   colorBorder: string,
}

enum TypeFigure {
   elipse,
   line,
   rectangle,
   triangle,
}

