import jsPDF from "jspdf";
import styles from "./SaveAndUpload.module.css";
import { getState, setState } from "../../../state";
import { Block, Figure, FigureType, ImageType, PresentationMaker, SlideType, TextBlock, TypeBlock } from "../../../types";
import { useEffect, useState } from "react";
import { gapi } from 'gapi-script';
import GoogleAuth from "./GoogleAuth/GoogleAuth";

type SaveAndUploadProps = {
   namePresentation: string,
}

function SaveAndUpload(props: SaveAndUploadProps) {
   const [isOpenFileList, setIsOpenFileList] = useState<boolean>(false);
   const handleOpenFileList = () => setIsOpenFileList(!isOpenFileList);

   const savePresentationWithJSON = () => {
      const presentation = getState().presentation;
      const fileData = JSON.stringify(presentation);
      const blob = new Blob([fileData], {type: "text/plain"});
      const url: string = URL.createObjectURL(blob);
      const link: HTMLAnchorElement = document.createElement('a');
      if (props.namePresentation === '') {
         link.download = `new_presentation.json`;
      } else {
         link.download = `${props.namePresentation}.json`;
      }
      link.href = url;
      link.click();
   }

   function uploadPresentation(file: EventTarget & HTMLInputElement): void {
      if (!file.files) { return }
      const fileJSON: File = file.files[0];

      const reader = new FileReader();
      reader.readAsText(fileJSON);

      reader.onload = () => {
         if (reader.result) {
               const result = JSON.parse(reader.result as string);
               const newPresentationMaker: PresentationMaker = {
                  presentation: {...result},
                  idsSelectedBlocks: [],
                  idsSelectedSlides: [result.slides[0].id]
               }
               setState(newPresentationMaker);
         } else {
               console.log("Ошибка обработки файла");
         }
      }
      reader.onerror = () => {
         console.log("Ошибка открытия файла");
      };
      file.value = '';
   }

   function getExtensionImg(base64: string): string {
      const extensionImg = base64.split("/").pop();
      if (extensionImg === 'jpg' || extensionImg === 'jpeg') {
         return 'JPEG';
      }
      if (extensionImg === 'png') {
         return 'PNG';
      } 
      return '';
   }

   function addBackgroundSlideToPdfPage(doc: jsPDF, slide: SlideType, widthPage: number, heightPage: number): void {
      if (slide.backgroundImage !== '') {
         const extensionImg = getExtensionImg(slide.backgroundImage);
         doc.addImage(slide.backgroundImage, extensionImg, 0, 0, widthPage, heightPage)
      }
      if (slide.backgroundColor !== '') {
         doc.setFillColor(slide.backgroundColor);
         doc.rect(0, 0, widthPage, heightPage, 'F');
      }
   }

   function addImgToPdfPage(doc: jsPDF, img: ImageType, blockCoordinateXToPdfPages: number, blockCoordinateYToPdfPages: number, blockWidthToPdfPages: number, blockHeigthToPdfPages: number) {
      const extensionImg = getExtensionImg(img.imageBase64);
      doc.addImage(img.imageBase64, extensionImg, blockCoordinateXToPdfPages, blockCoordinateYToPdfPages, blockWidthToPdfPages, blockHeigthToPdfPages);
   }

   function addTextToPdfPage(doc: jsPDF, text: TextBlock, blockCoordinateXToPdfPages: number, blockCoordinateYToPdfPages: number, rationX: number): void {
      doc.addFont(text.font, text.font, 'normal');
      doc.setFont(text.font);
      doc.setFontSize(text.fontSize * rationX);
      doc.setTextColor(text.color);
      doc.text(text.innerString, blockCoordinateXToPdfPages, blockCoordinateYToPdfPages);
   }

   function addFigureToPdfPage(doc: jsPDF, figure: Figure, blockCoordinateXToPdfPages: number, blockCoordinateYToPdfPages: number, blockWidthToPdfPages: number, blockHeigthToPdfPages: number) {
      const typeFigure = figure.type;
      doc.setFillColor(figure.colorFill);
      doc.setDrawColor(figure.colorBorder);

      if (typeFigure.figureType === FigureType.ellipse) {
         doc.ellipse(blockCoordinateXToPdfPages + blockWidthToPdfPages/2, blockCoordinateYToPdfPages + blockHeigthToPdfPages/2, blockWidthToPdfPages/2, blockHeigthToPdfPages/2, 'FD');
      }
      if (typeFigure.figureType === FigureType.rectangle) {
         doc.rect(blockCoordinateXToPdfPages, blockCoordinateYToPdfPages, blockWidthToPdfPages, blockHeigthToPdfPages, 'FD');
      }
      if (typeFigure.figureType === FigureType.triangle) {
         const x1: number = blockCoordinateXToPdfPages + blockWidthToPdfPages / 2;
         const y1: number = blockCoordinateYToPdfPages;
         const x2: number = blockCoordinateXToPdfPages;
         const y2: number = blockCoordinateYToPdfPages + blockHeigthToPdfPages;
         const x3: number = blockCoordinateXToPdfPages + blockWidthToPdfPages;
         const y3: number = blockCoordinateYToPdfPages + blockHeigthToPdfPages;
         doc.triangle(x1, y1, x2, y2, x3, y3, 'FD');
      }
   }

   function addBlocksToPdfPage(doc: jsPDF, blocks: Block[], coordinatesSlides: DOMRect, rationX: number, rationY: number): void {
      blocks.forEach(block => {
         const blockCoordinateXRelaiveToSlide = block.coordinatesX - coordinatesSlides.x;
         const blockCoordinateYRelaiveToSlide = block.coordinatesY - coordinatesSlides.y;

         const blockCoordinateXToPdfPages = blockCoordinateXRelaiveToSlide * rationX;
         const blockCoordinateYToPdfPages = blockCoordinateYRelaiveToSlide * rationY;
         const blockWidthToPdfPages = block.width * rationX;
         const blockHeigthToPdfPages = block.height * rationY;

         const contentBlock: TextBlock | ImageType | Figure = block.content;
         if (contentBlock.typeBlock === TypeBlock.image) {
               addImgToPdfPage(doc, contentBlock, blockCoordinateXToPdfPages, blockCoordinateYToPdfPages, blockWidthToPdfPages, blockHeigthToPdfPages);
         }
         if (contentBlock.typeBlock === TypeBlock.text) {
               addTextToPdfPage(doc, contentBlock, blockCoordinateXToPdfPages, blockCoordinateYToPdfPages, rationX)
         }
         if (contentBlock.typeBlock === TypeBlock.figure) {
               addFigureToPdfPage(doc, contentBlock, blockCoordinateXToPdfPages, blockCoordinateYToPdfPages, blockWidthToPdfPages, blockHeigthToPdfPages);
         }
      })
   }

   function exportPresentationToPDF(): void {
      const slide = document.querySelector('#slide');
      if (slide === null) { return }
      const coordinatesSlides: DOMRect = slide.getBoundingClientRect();

      const presentationMaker: PresentationMaker = getState();
      const slides: SlideType[] = presentationMaker.presentation.slides;

      const widthPage: number = 1920;
      const heightPage: number = 1080;

      const widthSlide: number = coordinatesSlides.right - coordinatesSlides.left;
      const heigthSlide: number = coordinatesSlides.bottom - coordinatesSlides.top;
      const rationX: number = widthPage / widthSlide;
      const rationY: number = heightPage / heigthSlide;

      const doc = new jsPDF({
         orientation: "landscape",
         unit: "px",
         format: [heightPage, widthPage],
      });

      slides.forEach(slide => {
         addBackgroundSlideToPdfPage(doc, slide, widthPage, heightPage);
         addBlocksToPdfPage(doc, slide.blocks, coordinatesSlides, rationX, rationY);
         doc.addPage();
      });
      doc.deletePage(slides.length + 1);

      if (props.namePresentation === '') {
         doc.save(`new_presentation.pdf`);
      } else {
         doc.save(`${props.namePresentation}.pdf`);
      }
     
   }

   const apiKey: string = 'AIzaSyCPQZIczrkndXnfZO8C52f0yNnx63tyDog';
   const googleClientId: string = '938918849952-16jqke98e1mtbo2a2v66m736jl9p7eun.apps.googleusercontent.com';

   function isGapiLoaded() {
      return gapi && gapi.auth2
   }

   function logIn() {
      if (isGapiLoaded()) {
         // откроется стандартное окно Google с выбором аккаунта
         gapi.auth2.getAuthInstance().signIn()
      }
   }

   function logOut() {
      if (isGapiLoaded()) {
         gapi.auth2.getAuthInstance().signOut()
      }
   }

   function isLoggedIn() {
      return isGapiLoaded() && gapi.auth2.getAuthInstance().isSignedIn.get()
   }

   function onSignIn() {
      if (isLoggedIn()) {
         // пользователь зашел
      } else {
         // пользователь вышел
      }
      // пример реализации см. ниже в разделе "Синхронизация"
   }

   function initClient() {
      gapi.client.init({
         // Ваш ключ API
         apiKey: apiKey,

         // Ваш идентификатор клиента
         clientId: googleClientId,

         // Указание, что мы хотим использовать Google Drive API v3
         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],

         // Запрос доступа к application data folder (см. ниже)
         scope: 'https://www.googleapis.com/auth/drive.appfolder'

      }).then(() => {
         // Начинаем ловить события логина/логаута (см. ниже)
         gapi.auth2.getAuthInstance().isSignedIn.listen(onSignIn)
         // инициализация приложения

      }, 
      // error => {
      //    console.log('Failed to init GAPI client', error)
      //    // работаем без гугла
      // }
      )
   }

   useEffect(() => {
      gapi.load('client:auth2', initClient)
   })

   return (
      <>
         <button className={styles.fileButton} onClick={handleOpenFileList}>Файл</button>
         <div>
            {isOpenFileList &&
               <div>
                     <div className={styles.backgroundFileList} onClick={handleOpenFileList}></div>
                     <div className={styles.fileList}>
                        <button className={styles.fileListPoint} onClick={() => savePresentationWithJSON()}>Скачать в формате JSON</button>
                        <button className={styles.fileListPoint} onClick={() => exportPresentationToPDF()}>Скачать в формате PDF</button>
                        <button className={styles.fileListPoint}>
                           Загрузить
                           <input type='file' className={styles.fileListUpload} onChange={(e) => uploadPresentation(e.target)} />
                        </button>
                     </div>
               </div>
            }
         </div>

         <GoogleAuth />
      </>
   )
}

export default SaveAndUpload;