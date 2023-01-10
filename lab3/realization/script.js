const body = document.querySelector('body');
const asd = document.querySelector('.asd')

function maddImage(input) {
   const imgFile = input.files[0];

   // if (!verifyExtentionImg(imgFile)) {
   //    return '';
   // }

   const reader = new FileReader();
   reader.readAsDataURL(imgFile);

   reader.onload = () => {
      if (reader.result) {
         const imgb = reader.result.toString();
         
         asd.style.height = '1000px';
         asd.style.backgroundImage = 'url(' + imgb + ')';
      } else {
         console.log('Ошибка обработки файла');
      }
   }
   reader.onerror = () => {
      console.log("Ошибка открытия файла");
   }
   return '';
}

// const canvas = document.createElement('canvas')
// body.appendChild(canvas)
// const ctx = canvas.getContext('2d');
// const image = document.querySelector('img');

// image.addEventListener('load', () => {
//     ctx.drawImage(image,
//         70, 20,   // Start at 70/20 pixels from the left and the top of the image (crop),
//         50, 50,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
//         0, 0,     // Place the result at 0, 0 in the canvas,
//         100, 100); // With as width / height: 100 * 100 (scale)
// });

const p = document.querySelector('.p');
// function changeBoldText() {
//    p.style.fontWeight = 'bold';
// }

const bold = document.querySelector('.bold');
const textBackground = document.querySelector('.textBackground')

bold.addEventListener('click', () => {
   const widthTextBackground = textBackground.offsetWidth;
   // textBackground.style.width = 
   p.style.fontWeight = 'bold';
})

function changeItalickText() {
   p.style.fontStyle = 'italic'
}

function changeUnderlineText() {
   // p.style.textDecoration = 'underline'
   p.style.borderBottom = '1px solid #000'
}

function changeStrikethroughText() {
   p.style.textDecorationLine = 'line-through'
}

function changeFontText() {
   p.style.fontFamily = 'Arial'
}

function changeColorText() {
   p.style.color = '#888'
}

function deleteSlide(oldPresentationMaker) {
   let oldIdsSelectedSlides = oldPresentationMaker.idsSelectedSlides;
   let newIdsSelectedSlides = [];
   let idLastSelectedSlide = oldIdsSelectedSlides[oldIdsSelectedSlides.length - 1];
   let oldSlides = oldPresentationMaker.presentation.slides;
   let newSlides = [];

   oldSlides.forEach(slide => {
      if (oldIdsSelectedSlides.indexOf(slide.id) === -1) {
         newSlides.push(slide);
      }
      if (slide.id === idLastSelectedSlide) {
         let nextSlide = oldSlides[oldSlides.indexOf(slide) + 1];
         newIdsSelectedSlides.push(nextSlide.id);
      }
   });

   const newPresentation = {
      ...oldPresentationMaker.presentation,
      slides: newSlides,
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
      idsSelectedSlides: newIdsSelectedSlides,
   }
}

const presentation = {
   slides: [
      {
         id: '1',
      },
      {
         id: '2'
      },
      {
         id: '3',
      },
      {
         id: '4'
      },
      {
         id: '5',
      },
      {
         id: '6'
      }
   ],
}

const opm = {
   presentation: presentation,
   idsSelectedSlides: ['1', '5'],
}

const npm = deleteSlide(opm);
console.log(npm);
console.log(opm);

function getSlideBId(slides, idSlide) {
   for (let i = 0; i < slides.length; i++) {
      let slide = slides[i]
      if (slide.id === idSlide) {
         return slide
      }
   }
   console.log('Ошибка: слайд не найден');
}

function deleteBlock(oldPresentationMaker) {
   const slides = oldPresentationMaker.presentation.slides;
   const idSelectedSlide = oldPresentationMaker.idsSelectedSlides[0];

   let selectedSlide = getSlideBId(slides, idSelectedSlide);
   if (!selectedSlide) {
      return oldPresentationMaker;
   }

   let idsSelectetBlocks = oldPresentationMaker.idsSelectedBlocks;
   let oldBlocks = selectedSlide.blocks;
   let newBlocks = [];

   oldBlocks.forEach(block => {
      if (idsSelectetBlocks.indexOf(block.id) === -1) {
         newBlocks.push(block);
      }
   });

   const indexSelectedSlide = slides.indexOf(selectedSlide);
   selectedSlide = {
      ...selectedSlide,
      blocks: newBlocks,
   }
   slides.splice(indexSelectedSlide, 1, selectedSlide);

   const newPresentation = {
      ...oldPresentationMaker.presentation,
      slides: slides,
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
      idsSelectedBlocks: [],
   }
}

const blocks = [
   {
      id: '1',
   },
   {
      id: '2',
   },
   {
      id: '3',
   },
   {
      id: '4',
   },
   {
      id: '5',
   },
   {
      id: '6',
   },
   {
      id: '7',
   },

]

const presentation1 = {
   slides: [
      {
         id: '1',
      },
      {
         id: '2'
      },
      {
         id: '3',
      },
      {
         id: '4',
         blocks: blocks
      },
      {
         id: '5',
      },
      {
         id: '6'
      }
   ],
}

const opm1 = {
   presentation: presentation1,
   idsSelectedSlides: ['4'],
   idsSelectedBlocks: ['1', '2', '5']
}

// console.log(deleteBlock(opm1));

const presentation2 = {
   slides: [
      {
         id: '1',
         background: '#fff',
      },
      {
         id: '2',
         background: '#f12',
      },
      {
         id: '3',
         background: '#aaa',
      },
      {
         id: '4',
         background: '#543',
      },
      {
         id: '5',
         background: '#888',
      },
      {
         id: '6',
         background: '#000',
      }
   ],
}

const opm2 = {
   presentation: presentation2,
   idsSelectedSlides: ['1', '3'],
}

function melemInArray(array, elem) {
   return array.indexOf(elem) === -1
}

function mgetSelectedSlildes(slides, idsSelectedSlides) {
   let selectedSlides = [];
   slides.forEach(slide => {
      if (!melemInArray(idsSelectedSlides, slide.id)) {
         selectedSlides.push(slide)
      }
   });
   return selectedSlides;
}

function mreplaceSlides(slides, replacementSlides, idsSelectedSlides) {
   replacementSlides.forEach(replacementSlide => {
      if (melemInArray(idsSelectedSlides, replacementSlide.id)) {
         const indexSelectedSlide = replacementSlides.indexOf(replacementSlide);
         slides = slides.splice(indexSelectedSlide, 1, replacementSlides);
      }
   });

   return slides;
}

function mChangeBackgroundSlide(oldPresentantionMaker, newBackground) {
   const idsSelectedSlides = oldPresentantionMaker.idsSelectedSlides;
   const slides = oldPresentantionMaker.presentation.slides;
   console.log(slides);
   const selectedSlides = mgetSelectedSlildes(slides, idsSelectedSlides);

   selectedSlides.forEach(selectedSlide => {
      selectedSlide.background = newBackground;
   });

   const newSlides = mreplaceSlides(slides, selectedSlides, idsSelectedSlides);

   const newPresentation = {
      ...oldPresentantionMaker.presentation,
      slides: newSlides,
   }

   return {
      ...oldPresentantionMaker,
      presentation: newPresentation,
   }
}

console.log(mChangeBackgroundSlide(opm2, '#111'));