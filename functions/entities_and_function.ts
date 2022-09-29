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
   return presentation;
}

function readingMode(presentantion: Presentation): number {
   return 5;
}

function showNavigate(): boolean {
   return true;
}

function moveElemInArraySlide(oldSlides: Slide[], movableSlides: Slide[], insertionIndex: number): [] {
   let newSlides: [] = [];
   return newSlides;
}

function addSlide(oldPresentation: Presentation): Presentation {
   let numberNewSlide: number = oldPresentation.slides.length;
   let newSlide: Slide = {
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

function moveSlide(oldPresentation: Presentation, movableSlides: Slide[], insertionIndex: number): Presentation {
   return {
      ...oldPresentation,
      slides: moveElemInArraySlide(oldPresentation.slides, movableSlides, insertionIndex),
   };
}

function deleteSlide(oldPresentation: Presentation, deletedSlides: Slide[]): Presentation {
   let newSlides: [] = [];
   return {
      ...oldPresentation,
      slides: newSlides,
   };
}

function switchSlide(oldPresentation: Presentation, oldSlide: Slide): Presentation {
   let newNumbersSelectedSlides: number[] = []
   return {
      ...oldPresentation,
      numbersSelectedSlides: newNumbersSelectedSlides
   }
}

function ChangeBackground(oldPresentantion: Presentation, oldSlide: Slide, background: string): Presentation {
   let newSlide = {
      ...oldSlide,
      background: background
   }
   let newSlides: [] = []
   return {
      ...oldPresentantion,
      slides: newSlides
   }
}

function addBlock(oldPresentantion: Presentation, oldSlide: Slide, typeBlock: TypeBlock): Presentation {
   let newBlock: Block = {
         type: TypeBlock.image,
         coordinatX: '500px',
         coordinatY: '500px',
         width: '400px',
         higth: '250px',
   }

   let newSlide: Slide = {
      ...oldSlide,
      blocks: [...oldSlide.blocks, newBlock]
   }

   let newSlides: Slide[] = []

   return {
      ...oldPresentantion,
      slides: newSlides
   }
}

function moveBlock(oldPresentantion: Presentation, oldSlide: Slide, oldBlock: Block): Presentation {
   let newBlock: Block;
   return {
      ...oldPresentantion,
   }
}

function resizeBlock(oldPresentantion: Presentation, oldSlide: Slide, oldBlock: Block): Presentation {
   let newBlock: Block;
   return {
      ...oldPresentantion,
   }
}

function cropImage(oldPresentantion: Presentation, oldSlide: Slide, oldBlock: Block, oldImage: Image): Presentation { // Обрезать
   let newImage: Image;
   return {
      ...oldPresentantion,
   }
}

function changeFillColorText(oldPresentantion: Presentation, oldSlide: Slide, oldBlock: Block, oldText: TextBlock): Presentation {
   let newTextBlock: TextBlock;
   return {
      ...oldPresentantion,
   }
}

function changeBorderColorText(oldPresentantion: Presentation, oldSlide: Slide, oldBlock: Block, oldText: TextBlock): Presentation {
   let newTextBlock: TextBlock;
   return {
      ...oldPresentantion,
   }
}

// type Navigation = {
//    previewSlides: [],
// }

// type PreviewSlide = {
// }

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
   number: number,
   background: string,
   blocks: Block[],
   numbersSelectedBlocks: number[],
}

type Block = {
   type: TypeBlock,
   coordinatX: string,
   coordinatY: string,
   width: string,
   higth: string,
}

enum TypeBlock {
   image,
   text,
   figure,
}

type TextBlock = {
   innerString: string,
   editStatus: true,
   font: string,
   isItalic: boolean,
   isBold: boolean,
   isStrikethrough: boolean,
   isUnderline: boolean,
   color: string,
}

type Image = {
}

type Figure = {
   colorFill: string,
   colorBorder: string,
}

