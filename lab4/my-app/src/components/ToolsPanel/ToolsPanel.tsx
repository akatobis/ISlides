import logo from "../../images/logoISlides.svg";
import arrowDown from "../../images/arrow_down.svg";
import {useState} from "react";
import styles from "./ToolsPanel.module.css";
import {deleteSlides} from "../../actions/slide";
import {dispatch, rollBack, returnCancel, getState, setState} from "../../state";
import {addBlock, changeStyleText} from "../../actions/block";
import {addNewSlide} from "../../actions/navigation/navigation";
import {Block, Figure, FigureType, PresentationMaker, SlideType, TextBlock, TextStyles, TypeBlock, ImageType} from "../../types";
import {changeColorFigure} from "../../actions/figure/figure";
import { PopupBackgroundColor } from "./PopupBackgroundColor/PopupBackgroundColor";
import SetColor from "./SetColor/SetColor";
import Fonts from "./Fonts/Fonts";
import { changeNamePresentation } from "../../actions/presentation";
import { jsPDF } from "jspdf";

function ToolsPanel() {
    const [fontSize, setFontSize] = useState('16');

    const [namePresentation, setNamePresentation] = useState('')
    const handleNamePresentation = (name: string) => {
        setNamePresentation(name);
        dispatch(changeNamePresentation, name);
    }

    const [isOpenFileList, setIsOpenFileList] = useState(false);
    const handleOpenFileList = () => setIsOpenFileList(!isOpenFileList);

    const [fontFamily, setFontFamily] = useState('Arial');
    const handleFontFamily = (font: string) => setFontFamily(font);

    const [isFontOpen, setFontOpen] = useState(false);
    const handleFontOpen = () => setFontOpen(!isFontOpen);

    const [isOpenPopupBackgroundColor, setIsOpenPopupBackgroundColor] = useState(false);
    const handleOpenPopupBackgroundColor = () => setIsOpenPopupBackgroundColor(!isOpenPopupBackgroundColor);

    const [isOpenPopupBorderColorFigure, setIsOpenPopupBorderColorFigure] = useState(false);
    const handleOpenPopupBorderColorFigure = () => setIsOpenPopupBorderColorFigure(!isOpenPopupBorderColorFigure);
    const [isOpenPopupFillColorFigure, setIsOpenPopupFillColorFigure] = useState(false);
    const handleOpenPopupFillColorFigure = () => setIsOpenPopupFillColorFigure(!isOpenPopupFillColorFigure);
    const [isOpenPopupTextColor, setIsOpenPopupTextColor] = useState(false);
    const handleOpenPopupTextColor = () => setIsOpenPopupTextColor(!isOpenPopupTextColor);

    function verifyExtensionImg(file: any): boolean {
        const extensionSelectedFile = file.type.split("/").pop();
        return extensionSelectedFile === "png" || extensionSelectedFile === "jpg" || extensionSelectedFile === "jpeg" || extensionSelectedFile === "svg";
    }

    function downloadImg(input: any): any {
        const imgFile = input.files[0];

        if (!verifyExtensionImg(imgFile)) {
            return "";
        }

        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onload = () => {
            const img: HTMLImageElement = new Image();
            img.src = window.URL.createObjectURL(imgFile)
            img.onload = function () {
                if (reader.result) {
                    input.value = '';
                    const aspectRatioImg = img.width / img.height;
                    dispatch(addBlock, {img: reader.result.toString(), aspectRatioImg: aspectRatioImg})
                } else {
                    console.log("Ошибка обработки файла");
                }
            };
        };
        reader.onerror = () => {
            console.log("Ошибка открытия файла");
        };
    }

    function isValidFileName(nameFile: string): boolean {
        const rg = /^[-\w^&'@{}[\],$=!#().%+~]+$/;
        return rg.test(nameFile);
    }

    const savePresentatinoWithJSON = () => {
        const presentation = getState().presentation;
        console.log(presentation);
        const fileData = JSON.stringify(presentation);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        if (!isValidFileName(namePresentation)) {
            return;
        }
        if (namePresentation === '') {
            link.download = `new_presentation.json`;
        } else {
            link.download = `${namePresentation}.json`;
        }
        link.href = url;
        link.click();
    }

    function uploadPresentation(file: any): void {
        const fileJSON = file.files[0];
        console.log(fileJSON);

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

    function getTextWidth(text: string, font: string, fontSize: number): number {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) { return 0; }

        context.font = `${fontSize}px ${font}`;
        context.fillText(text, 0, 0);

        return context.measureText(text).width;
    }

    function addTextToPdfPage(doc: jsPDF, text: TextBlock, blockCoordinateXToPdfPages: number, blockCoordinateYToPdfPages: number, rationX: number, blockWidthToPdfPages: number, blockHeigthToPdfPages: number): void {
        doc.addFont(text.font, text.font, 'normal');
        doc.setFont(text.font);
        doc.setFontSize(text.fontSize);
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
                addTextToPdfPage(doc, contentBlock, blockCoordinateXToPdfPages, blockCoordinateYToPdfPages, rationX, blockWidthToPdfPages, blockHeigthToPdfPages)
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

        doc.save(`${namePresentation}.pdf`);
    }


    function requestFullScreen() {
        const slide = document.querySelector('#slide');
        console.log(slide);
        if (!slide) {return}
        var requestMethod = slide.requestFullscreen;
        if (requestMethod) {
            requestMethod.call(slide);
        }
    }

    return (
        <div className={styles.header}>
            <div>{isOpenPopupBackgroundColor && <PopupBackgroundColor handleClose={handleOpenPopupBackgroundColor} />}</div>
            <div className={styles.infoLine}>
                <img src={logo} alt="" width="157px" height="46px" className={styles.logo}/>
                <button className={[styles.historyCommandsButton, styles.rollBack].join(" ")} onClick={() => dispatch(rollBack, "")}></button>
                <button className={[styles.historyCommandsButton, styles.returnCancel].join(" ")} onClick={() => dispatch(returnCancel, "")}></button>
                <input placeholder="Название презентации" onChange={(e) => handleNamePresentation(e.target.value)} className={styles.presentationTitle}/>
                <button onClick={() => requestFullScreen()} className={styles.viewButton}>Просмотр</button>

                <button className={styles.fileButton} onClick={handleOpenFileList}>Файл</button>
                <div>
                    {isOpenFileList &&
                        <div>
                            <div className={styles.backgroundFileList} onClick={handleOpenFileList}></div>
                            <div className={styles.fileList}>
                                <button className={styles.fileListPoint} onClick={() => savePresentatinoWithJSON()}>Скачать в формате JSON</button>
                                <button className={styles.fileListPoint} onClick={() => exportPresentationToPDF()}>Скачать в формате PDF</button>
                                <button className={styles.fileListPoint}>
                                    Загрузить
                                    <input type='file' className={styles.fileListUpload} onChange={(e) => uploadPresentation(e.target)} />
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className={styles.toolsLine}>
                <button className={[styles.slideButtons, styles.addSlide].join(" ")} onClick={() => {dispatch(addNewSlide, '')}}></button>
                <button className={[styles.slideButtons, styles.deleteSlide].join(" ")} onClick={() => dispatch(deleteSlides, '')}></button>
                <button className={[styles.slideButtons, styles.changeColor].join(" ")} onClick={handleOpenPopupBackgroundColor}></button>

                <button className={[styles.slideButtons, styles.rectangle].join(" ")} onClick={() => dispatch(addBlock, {figureType: FigureType.rectangle})}></button>
                <button className={[styles.slideButtons, styles.ellipse].join(" ")} onClick={() => dispatch(addBlock, {figureType: FigureType.ellipse})}></button>
                <button className={[styles.slideButtons, styles.triangle].join(" ")} onClick={() =>dispatch(addBlock, {figureType: FigureType.triangle})}></button>

                <button className={[styles.slideButtons, styles.ellipseBorder].join(" ")} onClick={handleOpenPopupBorderColorFigure}></button>
                {isOpenPopupBorderColorFigure && <SetColor handleClose={handleOpenPopupBorderColorFigure} changeColor={changeColorFigure} type="colorBorderFigure" />}

                <button className={[styles.slideButtons, styles.ellipseFill].join(" ")} onClick={handleOpenPopupFillColorFigure}></button>
                {isOpenPopupFillColorFigure && <SetColor handleClose={handleOpenPopupFillColorFigure} changeColor={changeColorFigure} type="colorFillFigure"/>}

                <div className={[styles.slideButtons, styles.addImage].join(" ")}>
                    <input
                        type="file"
                        onChange={(e) => {const target = e.target as Element; downloadImg(target)}}
                        className={styles.addImageInput}>
                    </input>
                </div>

                <button className={[styles.slideButtons, styles.addText].join(" ")} onClick={() => dispatch(addBlock, {})}></button>

                <button className={[styles.slideButtons, styles.changeBold].join(" ")} onClick={() => dispatch(changeStyleText, {newTextStyle: TextStyles.bold})}></button>
                <button className={[styles.slideButtons, styles.changeItalic].join(" ")} onClick={() => dispatch(changeStyleText, {newTextStyle: TextStyles.italic})}></button>
                <button className={[styles.slideButtons, styles.changeUnderline].join(" ")} onClick={() => dispatch(changeStyleText, {newTextStyle: TextStyles.underline})}></button>
                <button className={[styles.slideButtons, styles.changeStrikethrought].join(" ")} onClick={() => dispatch(changeStyleText, {newTextStyle: TextStyles.strikethrough})}></button>
                <button className={[styles.slideButtons, styles.changeColorText].join(" ")} onClick={handleOpenPopupTextColor}></button>
                {isOpenPopupTextColor && <SetColor handleClose={handleOpenPopupTextColor} changeColor={changeStyleText} type="colorText" />}

                <button className={[styles.slideButtons, styles.increaseSizeText].join(" ")}></button>
                <input
                    type="text"
                    onChange={(e) => dispatch(changeStyleText, {newFontSize: e.target.value})}
                    className={[styles.slideButtons, styles.fontSize].join(" ")}
                    placeholder="16"
                />
                <button className={[styles.slideButtons, styles.decreaseSizeText].join(" ")}></button>

                <button onClick={handleFontOpen} className={[styles.slideButtons, styles.fontFamily].join(" ")}>
                    <p className={styles.fontFamilyText}>{fontFamily}</p>
                    <img src={arrowDown} alt="" />
                </button>
                <div>{isFontOpen && <Fonts handleClose={handleFontOpen} handleChoseFont={handleFontFamily} />}</div>
            </div>

        </div>
    )
}

export {
    ToolsPanel,
}