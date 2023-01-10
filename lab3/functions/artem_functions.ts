// function moveSlide(oldPresentationMaker: PresentationMaker, insertionIndex: number): PresentationMaker {
//     if(insertionIndex > oldPresentationMaker.idsSelectedSlides.length)
//     {
//        return oldPresentationMaker;
//     }

//     let newSlides: Slide[] = new Array(oldPresentationMaker.presentation.slides.length);
//     let idDontFit = false;

//     for(let i = 0; i < oldPresentationMaker.presentation.slides.length; i++)
//     {
//         for(let int = 0; int < oldPresentationMaker.idsSelectedSlides.length; int++) {
//             if (oldPresentationMaker.presentation.slides[i].id == oldPresentationMaker.idsSelectedSlides[int])
//             {
//                 idDontFit=true;
//             }
//         }

//         if (!idDontFit)
//         {
//             newSlides[i] =  oldPresentationMaker.presentation.slides[i];
//         }

//         if(i == insertionIndex)
//         {
//             for(let int = 0; int < oldPresentationMaker.idsSelectedSlides.length; int++){
//                 i+=1;
//                 newSlides[i] = oldPresentationMaker.presentation.slides[oldPresentationMaker.idsSelectedSlides[int]];
//             }
//         }

//         idDontFit = false;
//     }

//     const newPresentation: Presentation = {
//         ...oldPresentationMaker.presentation,
//         slides :[] =  newSlides,
//     }

//     return {
//         ...oldPresentationMaker,
//         presentation : newPresentation,
//         idsSelectedSlides: [],
//     };
// }

// // Артем
// function addSlide(oldPresentationMaker: PresentationMaker): PresentationMaker {
//     let idNewSlide: string;
//     const newSlide: Slide = {
//         id: idNewSlide,
//         background: '#fff',
//         blocks: [],
//     }

//     let newSlides: Slide[] = new Array(oldPresentationMaker.presentation.slides.length + 1);
//     let i = 0;
//     for(i = 0; i < oldPresentationMaker.presentation.slides.length + 1;i++)
//     {
//         newSlides[i] = oldPresentationMaker.presentation.slides[i];
//         if(oldPresentationMaker.presentation.slides[i].id == oldPresentationMaker.idsSelectedSlides[oldPresentationMaker.idsSelectedSlides.length - 1]){
//             break;
//         }
//     }

//     i+=1;
//     newSlides[i] = newSlide;

//     for(; i < oldPresentationMaker.presentation.slides.length + 1;i++)
//     {
//         newSlides[i] = oldPresentationMaker.presentation.slides[i];
//     }

//     let newIdSelecetdeSlides: string[] = new Array(oldPresentationMaker.idsSelectedSlides.length + 1);

//     for(i = 0;i < oldPresentationMaker.idsSelectedSlides.length ;i++)
//     {
//         newIdSelecetdeSlides[i] = oldPresentationMaker.idsSelectedSlides[i];
//     }
//     newIdSelecetdeSlides[newIdSelecetdeSlides.length-1] = newSlide.id;

//     const newPresentation: Presentation = {
//         ...oldPresentationMaker.presentation,
//         slides: [] = newSlides,
//     }

//     return {
//         ...oldPresentationMaker,
//         presentation: newPresentation,
//         idsSelectedSlides: [] = newIdSelecetdeSlides,
//     }
// }

// // Артем
// function deleteSlide(oldPresentationMaker: PresentationMaker): PresentationMaker {
//     const newPresentation: Presentation = {
//         ...oldPresentantion,
//         slides: newSlides,
//     }

//     return {
//         ...oldPresentationMaker,
//         presentation: newPresentation,
//         idsSelectedSlides: [],
//     }
// }

// // Артем
// function selectSlides(oldPresentationMaker: PresentationMaker, idNewSlide: string): PresentationMaker { // переименовать
//     return {
//         ...oldPresentationMaker,
//         idsSelectedSlides: [idNewSlide],
//     }
// }

// // Артем
// function addBlock(oldPresentationMaker: PresentationMaker, typeBlock: TypeBlock): PresentationMaker {
//    let idNewBlock:string;
//    const _newBlock = document.createElement("Block");
//     const newBlock: typeBlock = {
//         id: idNewBlock,
//         content: TextBlock,
//         coordinatX: 500,
//         coordinatY: 500,
//         width: 400,
//         higth: 250,
//     }

//     const newSlide: Slide = {
//         ...oldPresentationMaker.presentation.slides[oldPresentationMaker.idsSelectedSlides],
//         blocks: [...oldBlocks, newBlock],
//     }

//     const newPresentation: Presentation = {
//         ...oldPresentation,
//         slides: [...oldSlides, newSlide],
//     }

//     return {
//         ...oldPresentationMaker,
//         presentation: newPresentation,
//         idsSelectedBlocks: [],
//     }
// }

// // Артем
// function selectBlock(oldPresentationMaker: PresentationMaker, idSelectedBlock: string): PresentationMaker {
//     return {
//         ...oldPresentationMaker,
//         idsSelectedBlocks: [idSelectedBlock],
//     }
// }

// // Артем
// function moveBlock(oldPresentationMaker: PresentationMaker, newCoordinatX: number, newCoordinatY: number): PresentationMaker {
//     let newSlides: Slide[] = new Array(oldPresentationMaker.presentation.slides.length);
//     let numberSlide = 0;
//     for(let i = 0;i < oldPresentationMaker.presentation.slides.length;i++)
//     {
//         if(oldPresentationMaker.idsSelectedSlides[oldPresentationMaker.idsSelectedSlides.length - 1] == oldPresentationMaker.presentation.slides[i].id)
//         {
//             numberSlide = i;
//             break;
//         }
//         newSlides[i] = oldPresentationMaker.presentation.slides[i];
//     }
//     let numberBlock = 0;
//     let newBlocks: Block[] = new Array(oldPresentationMaker.presentation.slides[numberSlide].blocks.length);
//     for(let int = 0;int < oldPresentationMaker.presentation.slides[numberSlide].blocks.length; int++)
//     {
//         if(oldPresentationMaker.presentation.slides[numberSlide].blocks[int].id == oldPresentationMaker.idsSelectedBlocks[oldPresentationMaker.idsSelectedBlocks.length - 1])
//         {
//             numberBlock = int;
//             break;
//         }
//         newBlocks[int] = oldPresentationMaker.presentation.slides[numberSlide].blocks[int];
//     }
//     const newBlock: Block = {
//         ...oldPresentationMaker.presentation.slides[numberSlide].blocks[numberBlock],
//         coordinatX: newCoordinatX,
//         coordinatY: newCoordinatY,
//     };

//     newBlocks[newBlocks.length - 1] = newBlock;

//     const newSlide: Slide = {
//         ...oldPresentationMaker.presentation.slides[numberSlide],
//         blocks: [] = newBlocks,
//     }

//     newSlides[numberSlide] = newSlide;

//     for(let i = numberSlide + 1;i < oldPresentationMaker.presentation.slides.length;i++)
//     {
//         newSlides[i] = oldPresentationMaker.presentation.slides[i];
//     }

//     const newPresentation: Presentation = {
//         ...oldPresentationMaker.presentation,
//         slides: [] = newSlides,
//     }

//     return {
//         ...oldPresentationMaker,
//         presentation: newPresentation,
//     }
// }

// // Артем
// function resizeBlock(oldPresentationMaker: PresentationMaker, newWidth: number, newHeigth: number): PresentationMaker {
//     let newSlides:Slide[] = new Array(oldPresentationMaker.presentation.slides.length);
//     let numberSlide = 0;
//     for(let i = 0;i < oldPresentationMaker.presentation.slides.length;i++)
//     {
//         if(oldPresentationMaker.idsSelectedSlides[oldPresentationMaker.idsSelectedSlides.length - 1] == oldPresentationMaker.presentation.slides[i].id)
//         {
//             numberSlide = i;
//             break;
//         }
//         newSlides[i] = oldPresentationMaker.presentation.slides[i];
//     }
//     let numberBlock = 0;
//     let newBlocks:Block[] = new Array(oldPresentationMaker.presentation.slides[numberSlide].blocks.length);
//     for(let int = 0;int < oldPresentationMaker.presentation.slides[numberSlide].blocks.length;int++)
//     {

//         if(oldPresentationMaker.presentation.slides[numberSlide].blocks[int].id == oldPresentationMaker.idsSelectedBlocks[oldPresentationMaker.idsSelectedBlocks.length - 1])
//         {
//             numberBlock = int;
//             break;
//         }

//         newBlocks[int] = oldPresentationMaker.presentation.slides[numberSlide].blocks[int];
//     }

//     const newBlock: Block = {
//         ...oldPresentationMaker.presentation.slides[numberSlide].blocks[numberBlock],
//         width: newWidth,
//         higth: newHeigth,
//     }

//     newBlocks[newBlocks.length - 1] = newBlock;

//     const newSlide: Slide = {
//         ...oldPresentationMaker.presentation.slides[numberSlide],
//         blocks: [] = newBlocks,
//     }

//     newSlides[numberSlide] = newSlide;

//     for(let i = numberSlide + 1;i < oldPresentationMaker.presentation.slides.length;i++)
//     {
//         newSlides[i] = oldPresentationMaker.presentation.slides[i];
//     }

//     const newPresentation: Presentation = {
//         ...oldPresentationMaker.presentation,
//         slides: [] = newSlides,
//     }

//     return {
//         ...oldPresentationMaker,
//         presentation: newPresentation,
//     }
// }