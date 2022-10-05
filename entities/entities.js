const editor = {
   document,
   saveDocument() {

   },
   createDocument() {

   },
   downloadDocument() {

   },
   readingMode() {
      
   },
}

const document = {
   nameDocument: 'My presentation',
   slides: [],
   idsSelectedSlides: [],
   mode: 'preview'| 'edit',
   moveSlide() {

   },
   deleteSlide() {

   },
   switchSlide() {

   },
}

const slide = {
   background: "#fff",
   blocks: [],
   idsSelectedBlocks: [],
   ChangeBackground() {

   },
   addBlock() {

   },
   move() {

   },
   resize() {

   },
}

const block = {
   type: 'image',
   coordinatX: 500,
   coordinatY: 500,
   width: 400,
   higth: 250,
}

const text = {
   innerString: 'my first presentation',
   editStatus: true,
   fontSize: 18,
   font: 'Arial',
   isItalic: true,
   isBold: true,
   isStrikethrough: false,
   isUnderline: false,
   color: "#000",
}

const image = {
   src: "",
   crop() { // Обрезать

   },
}

const figure = {
   colorFill: '#fff',
   colorBorder: '#999',
   type: 'rectangle',
   changeFillColor(){

   },
   changeBorderColor(){

   },
}

