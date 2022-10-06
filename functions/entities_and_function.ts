function savePresentation(presentation: Presentation): boolean {
   return true;
}

// function savePresentation(presentation: presentation): presentation {
//    return presentation;
// }

function createPresentation(): Presentation {
   return {
      namePresentation: 'My presentation',
      extension: Extension.pdf,
      slides: [],
      numbersSelectedSlides: [],
   };
}

function uploadPresentation(): Presentation {
   const presentation: Presentation
   return presentation;
}

function readingMode(presentantion: Presentation): number {
   return 5;
}

function moveElemInArraySlide(oldSlides: Slide[], movableSlides: Slide[], insertionIndex: number): [] {
   const newSlides: [] = [];
   return newSlides;
}

function moveSlide(oldPresentation: Presentation, movableSlides: Slide[], insertionIndex: number): Presentation {
   return {
      ...oldPresentation,
      slides: moveElemInArraySlide(oldPresentation.slides, movableSlides, insertionIndex),
   };
}

function addSlide(oldPresentation: Presentation): Presentation {
   const numberNewSlide: number = oldPresentation.slides.length;
   const newSlide: Slide = {
      number: numberNewSlide,
      background: '#fff',
      blocks: [],
      numbersSelectedBlocks: [],
   }
   return {
      ...oldPresentation,
      slides: [...oldPresentation.slides, newSlide]
   }
}

function deleteSlide(oldPresentation: Presentation, deletedSlides: Slide[]): Presentation {
   return {
      ...oldPresentation,
      slides: [],
   };
}

function switchSlide(oldPresentation: Presentation, oldSlide: Slide): Presentation {
   return {
      ...oldPresentation,
      numbersSelectedSlides: [],
   }
}

function ChangeBackground(oldPresentantion: Presentation, oldSlide: Slide, background: string): Presentation {
   const newSlide = {
      ...oldSlide,
      background: background
   }
   const newSlides: [] = []
   return {
      ...oldPresentantion,
      slides: newSlides
   }
}

function addBlock(oldPresentantion: Presentation, oldSlide: Slide, typeBlock: TypeBlock): Presentation {
   const newBlock: Block = {
         id: 1562, 
         content: TextBlock,
         coordinatX: 500,
         coordinatY: 500,
         width: 400,
         higth: 250,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [...oldSlide.blocks, newBlock]
   }

   const newSlides: Slide[] = []

   return {
      ...oldPresentantion,
      slides: newSlides,
   }
}

function moveBlock(oldPresentantion: Presentation, oldSlide: Slide, oldBlock: Block, newCoordinatX: number, newCoordinatY: number): Presentation {
   const newBlock: Block = {
      ...oldBlock,
      coordinatX: newCoordinatX,
      coordinatY: newCoordinatY,
   };
   const newSlide = {
      ...oldSlide,
      blocks: [],
   }
   return {
      ...oldPresentantion,
      slides: []
   }
}

function resizeBlock(oldPresentantion: Presentation, oldSlide: Slide, oldBlock: Block, newWidth: number, newHeigth: number): Presentation {
   const newBlock: Block = {
      ...oldBlock,
      width: newWidth,
      higth: newHeigth,
   };

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [],
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeFillColorFigure(oldPresentantion: Presentation, oldSlide: Slide, oldBlock: Block, oldFigure: Figure, color: string): Presentation {
   const newFigure: Figure = {
      ...oldFigure,
      colorFill: color,
   };
   
   const newBlock: Block = {
      ...oldBlock,
      content: newFigure,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [],
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeBorderColorFigure(oldPresentantion: Presentation, oldSlide: Slide, oldBlock: Block, oldFigure: Figure, color: string): Presentation {
   const newFigure: Figure = {
      ...oldFigure,
      colorBorder: color,
   }

   const newBlock: Block = {
      ...oldBlock,
      content: newFigure,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [],
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeBoldText(oldPresentantion: Presentation, oldSlide: Slide, oldBlock: Block, oldTextBlock: TextBlock, begin: number, end: number): Presentation {
   const newTextBlock: TextBlock = {
      ...oldTextBlock,
      textStyle: [...oldTextBlock.textStyle],
   }

   const newBlock: Block = {
      ...oldBlock,
      content: newTextBlock,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [...oldSlide.blocks],
   }

   const newPresentation: Presentation = {
      ...oldPresentantion,
      slides: [...oldPresentantion.slides]
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeItalicText(oldPresentantion: Presentation, oldSlide: Slide, oldBlock: Block, oldTextBlock: TextBlock, begin: number, end: number): Presentation {
   const newTextBlock: TextBlock = {
      ...oldTextBlock,
      textStyle: [...oldTextBlock.textStyle],
   }

   const newBlock: Block = {
      ...oldBlock,
      content: newTextBlock,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [...oldSlide.blocks],
   }

   const newPresentation: Presentation = {
      ...oldPresentantion,
      slides: [...oldPresentantion.slides]
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeUnderlineText(oldPresentantion: Presentation, oldSlide: Slide, oldBlock: Block, oldTextBlock: TextBlock, begin: number, end: number): Presentation {
   const newTextBlock: TextBlock = {
      ...oldTextBlock,
      textStyle: [...oldTextBlock.textStyle],
   }

   const newBlock: Block = {
      ...oldBlock,
      content: newTextBlock,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [...oldSlide.blocks],
   }

   const newPresentation: Presentation = {
      ...oldPresentantion,
      slides: [...oldPresentantion.slides]
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeStrikethroughText(oldPresentantion: Presentation, oldSlide: Slide, oldBlock: Block, oldTextBlock: TextBlock, begin: number, end: number): Presentation {
   const newTextBlock: TextBlock = {
      ...oldTextBlock,
      textStyle: [...oldTextBlock.textStyle],
   }

   const newBlock: Block = {
      ...oldBlock,
      content: newTextBlock,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [...oldSlide.blocks],
   }

   const newPresentation: Presentation = {
      ...oldPresentantion,
      slides: [...oldPresentantion.slides]
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeFontText(oldPresentantion: Presentation, oldSlide: Slide, oldBlock: Block, oldTextBlock: TextBlock, begin: number, end: number): Presentation {
   const newTextBlock: TextBlock = {
      ...oldTextBlock,
      textStyle: [...oldTextBlock.textStyle],
   }

   const newBlock: Block = {
      ...oldBlock,
      content: newTextBlock,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [...oldSlide.blocks],
   }

   const newPresentation: Presentation = {
      ...oldPresentantion,
      slides: [...oldPresentantion.slides]
   }

   return {
      ...oldPresentantion,
      slides: [],
   }
}

function changeColorText(oldPresentantion: Presentation, oldSlide: Slide, oldBlock: Block, oldTextBlock: TextBlock, begin: number, end: number): Presentation {
   const newTextBlock: TextBlock = {
      ...oldTextBlock,
      textStyle: [...oldTextBlock.textStyle],
   }

   const newBlock: Block = {
      ...oldBlock,
      content: newTextBlock,
   }

   const newSlide: Slide = {
      ...oldSlide,
      blocks: [...oldSlide.blocks],
   }

   const newPresentation: Presentation = {
      ...oldPresentantion,
      slides: [...oldPresentantion.slides]
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
   numbersSelectedSlides: number[],
}

enum Extension {
   pdf,
   ppt,
   pptx,
}

type Slide = {
   id: number,
   number: number,
   background: string,
   blocks: Block[],
   numbersSelectedBlocks: number[],
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
   colorFill: string,
   colorBorder: string,
}

