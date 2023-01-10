// function elemInArray(array: any, elem: any): boolean {
//    return array.indexOf(elem) !== -1
// }

// enum TypeBlock {
//   image = 'image',
//   text = 'text',
//   figure = 'figure',
// }

// function deleteSlides(oldPresentationMaker: PresentationMaker): PresentationMaker {
//    const oldIdsSelectedSlides: string[] = oldPresentationMaker.idsSelectedSlides;
//    const idLastSelectedSlide: string = oldIdsSelectedSlides[oldIdsSelectedSlides.length - 1];
//    const oldSlides: Slide[] = oldPresentationMaker.presentation.slides;

//    let newSlides: Slide[] = oldSlides.filter(slide => {
//       return !elemInArray(oldIdsSelectedSlides, slide.id);
//    });

//    let indexLastSelectedSlide: number = 0;
//    const idLastSlide: string = oldSlides[oldSlides.length - 1].id;
//    if (idLastSelectedSlide === idLastSlide) {
//       indexLastSelectedSlide = oldSlides.length - 2;
//    } else {
//       oldSlides.forEach((slide) => {
//         if (slide.id === idLastSelectedSlide) {
//           indexLastSelectedSlide = oldSlides.indexOf(slide);
//         }
//       });
//    }

//    const newPresentation: Presentation = {
//       ...oldPresentationMaker.presentation,
//       slides: newSlides,
//    }

//    return {
//      ...oldPresentationMaker,
//      presentation: newPresentation,
//      idsSelectedSlides: [
//        newSlides[indexLastSelectedSlide - oldIdsSelectedSlides.length + 1].id,
//      ],
//    };
// }

// const deleteTextBlock: TextBlock = {
//   typeBlock: TypeBlock.text,
//   innerString: "",
//   isBold: false,
//   isItalick: false,
//   isStrikethrough: false,
//   isUnderline: false,
//   colour: "000",
//   fontSize: 16,
//   font: "Calibri",
// };

// const deletBlocks: Block[] = [
//   {
//     id: "1",
//     content: deleteTextBlock,
//     coordinatX: 500,
//     coordinatY: 500,
//     width: 400,
//     higth: 250,
//   },
//   {
//     id: "2",
//     content: deleteTextBlock,
//     coordinatX: 500,
//     coordinatY: 500,
//     width: 400,
//     higth: 250,
//   },
//   {
//     id: "3",
//     content: deleteTextBlock,
//     coordinatX: 500,
//     coordinatY: 500,
//     width: 400,
//     higth: 250,
//   },
//   {
//     id: "4",
//     content: deleteTextBlock,
//     coordinatX: 500,
//     coordinatY: 500,
//     width: 400,
//     higth: 250,
//   },
//   {
//     id: "5",
//     content: deleteTextBlock,
//     coordinatX: 500,
//     coordinatY: 500,
//     width: 400,
//     higth: 250,
//   },
//   {
//     id: "6",
//     content: deleteTextBlock,
//     coordinatX: 500,
//     coordinatY: 500,
//     width: 400,
//     higth: 250,
//   },
//   {
//     id: "7",
//     content: deleteTextBlock,
//     coordinatX: 500,
//     coordinatY: 500,
//     width: 400,
//     higth: 250,
//   },
// ];

// const deletePresentation: Presentation = {
//   slides: [
//     {
//       id: "1",
//       background: "111",
//       blocks: deletBlocks,
//     },
//     {
//       id: "2",
//       background: "222",
//       blocks: [],
//     },
//     {
//       id: "3",
//       background: "333",
//       blocks: [],
//     },
//     {
//       id: "4",
//       background: "444",
//       blocks: [],
//     },
//     {
//       id: "5",
//       background: "555",
//       blocks: [],
//     },
//     {
//       id: "6",
//       background: "666",
//       blocks: [],
//     },
//   ],
// };

// const deleteOpm: PresentationMaker = {
//   presentation: deletePresentation,
//   idsSelectedSlides: ["1"],
//   idsSelectedBlocks: ["1", "5"],
// };

// function changeBackgroundSlide(oldPresentantionMaker: PresentationMaker, newBackground: string): PresentationMaker {
//    const idsSelectedSlides: string[] = oldPresentantionMaker.idsSelectedSlides;
//    const oldSlides: Slide[] = oldPresentantionMaker.presentation.slides;
//    const selectedSlides: Slide[] = oldSlides.filter((slide) => {
//       return elemInArray(idsSelectedSlides, slide.id);
//    });

//    let newSlides: Slide[] = oldSlides.map((slide => {
//       if (elemInArray(selectedSlides, slide)){
//          return {
//             ...slide,
//             background: newBackground,
//          }
//       }
//       return slide;
//    }))

//    const newPresentation: Presentation = {
//       ...oldPresentantionMaker.presentation,
//       slides: newSlides,
//    }

//    return {
//       ...oldPresentantionMaker,
//       presentation: newPresentation,
//    }
// }

// function deleteBlocks(oldPresentationMaker: PresentationMaker): PresentationMaker {
//    const oldSlides: Slide[] = oldPresentationMaker.presentation.slides;
//    const idSelectedSlide: string = oldPresentationMaker.idsSelectedSlides[0];
//    const selectedSlide: Slide = oldSlides.filter((slide) => {
//       return idSelectedSlide === slide.id;
//    })[0];

//    let idsSelectedBlocks: string[] = oldPresentationMaker.idsSelectedBlocks;
//    let oldBlocks: Block[] = selectedSlide.blocks;
//    let newBlocks: Block[] = oldBlocks.filter(block => {
//       return !elemInArray(idsSelectedBlocks, block.id);
//    });

//    const newSlides: Slide[] = oldSlides.map(slide => {
//       if (slide.id === idSelectedSlide) {
//          return {
//             ...slide,
//             blocks: newBlocks,
//          }
//       }
//       return slide;
//    })

//    const newPresentation: Presentation = {
//      ...oldPresentationMaker.presentation,
//      slides: newSlides,
//    };

//    return {
//       ...oldPresentationMaker,
//       presentation: newPresentation,
//       idsSelectedBlocks: [],
//    }
// }

// function addBlock(oldPresentationMaker: PresentationMaker, { img, figureType }: { img?: string, figureType?: TypeFigure }): PresentationMaker {
//    let contentNewBlock!: Image | TextBlock | Figure;
//    if (img) {
//       contentNewBlock = addImage(img);
//    } else if (figureType) {
//       // contentNewBlock = ;
//    } else {
//       contentNewBlock = createTextBlock();
//    }

//    const idNewBlock: string = '';
//    const newBlock: Block = {
//          id: idNewBlock,
//          content: contentNewBlock,
//          coordinatX: 500,
//          coordinatY: 500,
//          width: 400,
//          higth: 250,
//    }

//    const oldPresentation: Presentation = oldPresentationMaker.presentation;
//    const oldSlides: Slide[] = oldPresentation.slides;
//    const idSelectedSlide: string = oldPresentationMaker.idsSelectedSlides[0];

//    const selectedSlide: Slide = oldSlides.filter((slide) => {
//      return idSelectedSlide === slide.id;
//    })[0];
   
//    const oldBlocks: Block[] = selectedSlide.blocks;

//    const newSlides: Slide[] = oldSlides.map(slide => {
//       if (slide.id === idSelectedSlide) {
//          return {
//             ...selectedSlide,
//             blocks: [...oldBlocks, newBlock]
//          }
//       }
//       return slide;
//    });

//    const newPresentation: Presentation = {
//       ...oldPresentation,
//       slides: newSlides,
//    }

//    return {
//       ...oldPresentationMaker,
//       presentation: newPresentation,
//       idsSelectedBlocks: [],
//    }
// }

// function addImage(img: string): Image {
//    return {
//       typeBlock: TypeBlock.image,
//       imageBase64: img,
//    }
// }

// function createTextBlock(): TextBlock {
//    return {
//       typeBlock: TypeBlock.text,
//       innerString: '',
//       isBold: false,
//       isItalick: false,
//       isStrikethrough: false,
//       isUnderline: false,
//       colour: '000',
//       fontSize: 16,
//       font: "Calibri",
//    }
// }

// function changeText(oldTextBlock: TextBlock, { newTextStyle, newColour, newFont, newFontSize }: { newTextStyle?: TextStyles, newColour?: string, newFont?: string, newFontSize?: number }): TextBlock | undefined {
//    if (newTextStyle) {
//       if (newTextStyle = TextStyles.bold) {
//          return {
//             ...oldTextBlock,
//             isBold: !oldTextBlock.isBold,
//          }
//       }
//       if (newTextStyle = TextStyles.italic) {
//          return {
//             ...oldTextBlock,
//             isItalick: !oldTextBlock.isItalick,
//          }
//       }
//       if (newTextStyle = TextStyles.strikethrough) {
//          return {
//             ...oldTextBlock,
//             isUnderline: !oldTextBlock.isUnderline,
//          }
//       }
//       if (newTextStyle = TextStyles.underline) {
//          return {
//             ...oldTextBlock,
//             isStrikethrough: !oldTextBlock.isStrikethrough,
//          }
//       }
//    }
//    if (newColour) {
//       return {
//          ...oldTextBlock,
//          colour: newColour,
//       }
//    }
//    if (newFont) {
//       return {
//          ...oldTextBlock,
//          font: newFont,
//       }
//    }
//    if (newFontSize) {
//       return {
//          ...oldTextBlock,
//          fontSize: newFontSize,
//       }
//    }
//    return undefined;
// }

// type PresentationMaker = {
//    presentation: Presentation,
//    idsSelectedBlocks: string[],
//    idsSelectedSlides: string[],
// }

// type Presentation = {
//    slides: Slide[],
// }

// enum Extension {
//    pdf,
//    ppt,
//    pptx,
// }

// type Slide = {
//    id: string,
//    background: string,
//    blocks: Block[],
// }

// type Block = {
//    id: string,
//    content: TextBlock | Image | Figure,
//    coordinatX: number,
//    coordinatY: number,
//    width: number,
//    higth: number,
// }



// type TextBlock = {
//    typeBlock: TypeBlock,
//    innerString: string,
//    isBold: boolean,
//    isItalick: boolean,
//    isStrikethrough: boolean,
//    isUnderline: boolean
//    colour: string,
//    font: string,
//    fontSize: number,
// }

// enum TextStyles {
//    bold,
//    italic,
//    strikethrough,
//    underline,
// }

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
//    figureType: TypeFigure,
//    rx: number,
//    ry: number,
// }

// type Line = {
//    figureType: TypeFigure,
//    bx: number,
//    by: number,
//    ex: number,
//    ey: number,
// }

// type Rectangle = {
//    figureType: TypeFigure,
// }

// type Triangle = {
//    figureType: TypeFigure,
//    topX: number;
// }

// enum TypeFigure {
//    elipse = 'elipse',
//    line = 'line',
//    rectangle = 'rectangle',
//    triangle = 'triangle',
// }
