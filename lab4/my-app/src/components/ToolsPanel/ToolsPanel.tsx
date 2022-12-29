import logo from "../../images/logoISlides.svg";
import arrowDown from "../../images/arrow_down.svg";
import {useState} from "react";
import styles from "./ToolsPanel.module.css"
import {deleteSlides} from "../../actions/slide";
import {dispatch, rollBack, returnCancel, getState, setState} from "../../state";
import {addBlock, changeStyleText} from "../../actions/block";
import {addNewSlide} from "../../actions/navigation/navigation";
import {Block, Figure, FigureType, PresentationMaker, SlideType, TextBlock, TextStyles, TypeBlock, Image} from "../../types";
import {changeColorFigure} from "../../actions/figure/figure";
import { PopupBackgroundColor } from "./PopupBackgroundColor/PopupBackgroundColor";
import SetColor from "./SetColor/SetColor";
import Fonts from "./Fonts/Fonts";
import { changeNamePresentation } from "../../actions/presentation";
import {jsPDF} from "jspdf";

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

    function downloadImg(input: any): any {

        function verifyExtensionImg(file: any): boolean {
            const extensionSelectedFile = file.type.split("/").pop();
            return extensionSelectedFile === "png" || extensionSelectedFile === "jpg" || extensionSelectedFile === "jpeg" || extensionSelectedFile === "svg";
        }

        const imgFile = input.files[0];

        if (!verifyExtensionImg(imgFile)) {
            return "";
        }

        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onload = () => {
            if (reader.result) {
                input.value = '';
                dispatch(addBlock, {img: reader.result.toString()})
            } else {
                console.log("Ошибка обработки файла");
            }
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

    function exportPresentationToPDF(): void {
        const presentationMaker: PresentationMaker = getState();
        const slides: SlideType[] = presentationMaker.presentation.slides;
        
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [1080, 1920],
        });

        slides.forEach(slide => {
            if (slide.backgroundImage !== '') {
                doc.addImage(slide.backgroundImage, 'JPEG', 0, 0, 1920, 1080)
            }
            if (slide.backgroundColor !== '') {
                doc.setFillColor(slide.backgroundColor);
                doc.rect(0, 0, 1920, 1080, 'F');
            }
            
            const blocks: Block[] = slide.blocks;
            blocks.forEach(block => {
                const contentBlock: TextBlock | Image | Figure = block.content;
                if (contentBlock.typeBlock === TypeBlock.image) {
                    doc.addImage(contentBlock.imageBase64, 'JPEG', block.coordinatesX, block.coordinatesY, block.width, block.height);
                }
                if (contentBlock.typeBlock === TypeBlock.text) {
                    doc.text(contentBlock.innerString, block.coordinatesX, block.coordinatesY);
                }
                if (contentBlock.typeBlock === TypeBlock.figure) {
                    const typeFigure = contentBlock.type;
                    doc.setFillColor(contentBlock.colorFill);
                    doc.setDrawColor(contentBlock.colorBorder);

                    if (typeFigure.figureType === FigureType.ellipse) {
                        doc.ellipse(block.coordinatesX, block.coordinatesY, typeFigure.rx, typeFigure.ry, 'FD');
                    }
                    if (typeFigure.figureType === FigureType.rectangle) {
                        doc.rect(block.coordinatesX, block.coordinatesY, block.width, block.height, 'FD');
                    }
                    if (typeFigure.figureType === FigureType.triangle) {
                        const x1: number = block.coordinatesX + block.width / 2;
                        const y1: number = block.coordinatesY;
                        const x2: number = block.coordinatesX;
                        const y2: number = block.coordinatesY + block.height;
                        const x3: number = block.coordinatesX + block.width;
                        const y3: number = block.coordinatesY + block.height;
                        doc.triangle(x1, y1, x2, y2, x3, y3, 'FD');
                    }
                }
            })
            doc.addPage();
        });
        
        doc.save(`${namePresentation}.pdf`);
    }

    return (
        <div className={styles.header}>
            <div>{isOpenPopupBackgroundColor && <PopupBackgroundColor handleClose={handleOpenPopupBackgroundColor} />}</div>
            <div className={styles.infoLine}>
                <img src={logo} alt="" width="157px" height="46px" className={styles.logo}/>
                <button className={[styles.historyCommandsButton, styles.rollBack].join(" ")} onClick={() => dispatch(rollBack, "")}></button>
                <button className={[styles.historyCommandsButton, styles.returnCancel].join(" ")} onClick={() => dispatch(returnCancel, "")}></button>
                <input placeholder="Название презентации" onChange={(e) => handleNamePresentation(e.target.value)} className={styles.presentationTitle}/>
                <button className={styles.viewButton}>Просмотр</button>

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