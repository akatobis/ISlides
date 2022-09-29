const editor = {
   saveDocument() {

   },
   createDocument() {

   },
   downloadDocument() {

   },
   slideShow() {
      
   },
}

const navigation = {
   previewSlides: [],
   showNavigate() {

   },
   hideNavigate() {

   },
}

const previewSlide = {
   moveSlide() {

   },
   deleteSlide() {

   },
   switchSlide() {

   },
}

const document = {
   nameDocument: 'My presentation',
   slides: [],
   numbersSelectedSlides: [],
}

const slide = {
   selectionStatus: true,
   background: "#fff",
   blocks: [],
   numbersSelectedBlocks: [],
   ChangeBackground() {

   },
   addBlock() {

   },
}

const block = {
   selectionStatus: true,
   type: 'image',
   coordinatX: '500px',
   coordinatY: '500px',
   width: '400px',
   higth: '250px',
   move() {

   },
   resize() {

   },
}

const text = {
   innerString: 'my first presentation',
   editStatus: true,
   font: 'Arial',
   // typeStyle: {
   //    italic: true,
   //    bold: true,
   //    strikethrough: false,
   //    underline: false,
   // }
   isItalic: true,
   isBold: true,
   isStrikethrough: false,
   isUnderline: false,
   color: "#000",
}

const image = {
   crop() { // Обрезать

   },
}

const figure = {
   colorFill: '#fff',
   colorBorder: '#999',
   changeFillColor(){

   },
   changeBorderColor(){

   },
}

