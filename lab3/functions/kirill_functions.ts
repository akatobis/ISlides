// function findBlocksByIds(oldPresentationMaker: PresentationMaker): Block[] {
//     const ids: string[] = oldPresentationMaker.idsSelectedBlocks;
//     const blocks: Block[] = oldPresentationMaker.presentation.slides[0].blocks;

//     let selectedBlocks: Block[] = [];

//     ids.forEach(id => {
//         blocks.forEach(block => {
//             if (id === block.id) {
//                 selectedBlocks.push(block);
//             }
//         })
//     });

//     return selectedBlocks;
// }

// function changeFillColorFigure(oldPresentationMaker: PresentationMaker, color: string) {
//     const newPresentationMaker: PresentationMaker = oldPresentationMaker;
//     const selectedBlocks: Block[] = findBlocksByIds(oldPresentationMaker);
//     const blocks: Block[] = oldPresentationMaker.presentation.slides[0].blocks;

//     let newFigure = selectedBlocks[0].content;

//     selectedBlocks.forEach(block => {
//         newFigure = {
//             ...selectedBlocks[selectedBlocks.indexOf(block)].content,
//             colorBorder: color,
//         }
//         block.content = newFigure;
//     });

//     selectedBlocks.forEach(sBlock => {
//         blocks.forEach(oBlock => {
//             if (sBlock.id === oBlock.id) {
//                 blocks[blocks.indexOf(oBlock)] = sBlock;
//             }
//         });
//     });

//     newPresentationMaker.presentation.slides[0].blocks = blocks;

//     return newPresentationMaker;
// }

// function changeBorderColorFigure(oldPresentationMaker: PresentationMaker, color: string): PresentationMaker {
//     const newPresentationMaker: PresentationMaker = oldPresentationMaker;
//     const selectedBlocks = findBlocksByIds(oldPresentationMaker);
//     const blocks: Block[] = oldPresentationMaker.presentation.slides[0].blocks;

//     let newFigure = selectedBlocks[0].content;

//     selectedBlocks.forEach(block => {
//         newFigure = {
//             ...selectedBlocks[selectedBlocks.indexOf(block)].content,
//             colorFill: color,
//         }
//         block.content = newFigure;
//     });

//     selectedBlocks.forEach(sBlock => {
//         blocks.forEach(oBlock => {
//             if (sBlock.id === oBlock.id) {
//                 blocks[blocks.indexOf(oBlock)] = sBlock;
//             }
//         });
//     });

//     newPresentationMaker.presentation.slides[0].blocks = blocks;

//     return newPresentationMaker;
// }

// function createFigure(figureType: FigureType): Figure {
//     if (figureType === FigureType.ellipse) {
//         return {
//             typeBlock: TypeBlock.figure,
//             type: {
//                 figureType: FigureType.ellipse,
//                 rx: 10,
//                 ry: 5,
//             },
//             colorFill: "white",
//             border: 1,
//             colorBorder: "black",
//         }
//     }

//     if (figureType === FigureType.triangle) {
//         return {
//             typeBlock: TypeBlock.figure,
//             type: {
//                 figureType: FigureType.triangle,
//                 topX: 10,
//             },
//             colorFill: "white",
//             border: 1,
//             colorBorder: "black",
//         }
//     }

//     if (figureType === FigureType.rectangle) {
//         return {
//             typeBlock: TypeBlock.figure,
//             type: {
//                 figureType: FigureType.rectangle,
//             },
//             colorFill: "white",
//             border: 1,
//             colorBorder: "black",
//         }
//     }
// }

// type PresentationMaker = {
//     presentation: Presentation,
//     idsSelectedBlocks: string[],
//     idsSelectedSlides: string[],
//     selectedText: {
//         begin: 5,
//         end: 10,
//     }
// }

// type Presentation = {
//     namePresentation: string,
//     extension: Extension,
//     slides: Slide[],
// }

// enum Extension {
//     pdf,
//     ppt,
//     pptx,
// }

// type Slide = {
//     id: string,
//     background: string,
//     blocks: Block[],
// }

// type Block = {
//     id: string,
//     content: TextBlock | Image | Figure,
//     coordinatX: number,
//     coordinatY: number,
//     width: number,
//     higth: number,
// }

// type TextBlock = {
//     typeBlock: TypeBlock,
//     innerString: string,
//     textStyle: TextStyle[],
// }

// type TextStyle = {
//     style?: TextStyles,
//     colour: string,
//     font: string,
//     begin: number,
//     end: number,
// }

// enum TextStyles {
//     bold,
//     italic,
//     strikethrough,
//     underline,
// }

// type Image = {
//     typeBlock: TypeBlock,
//     imageBase64: string,
// }

// type Figure = {
//     typeBlock: TypeBlock,
//     type: Ellipse | Rectangle | Triangle,
//     colorFill: string,
//     border: number,
//     colorBorder: string,
// }

// type Ellipse = {
//     figureType: FigureType,
//     rx: number,
//     ry: number,
// }

// type Rectangle = {
//     figureType: FigureType,
// }

// type Triangle = {
//     figureType: FigureType,
//     topX: number;
// }

// enum TypeBlock {
//     image,
//     text,
//     figure,
// }

// enum FigureType {
//     ellipse,
//     line,
//     rectangle,
//     triangle
// }