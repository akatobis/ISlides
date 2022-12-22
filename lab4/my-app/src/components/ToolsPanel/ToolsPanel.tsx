import logo from "../../images/logoISlides.svg";
import arrowDown from "../../images/arrow_down.svg";
import {HexColorPicker} from "react-colorful";
import {useState} from "react";
import styles from "./ToolsPanel.module.css"
import {changeBackgroundSlide, deleteSlides} from "../../actions/slide";
import {dispatch, rollBack, returnCancel, getState, setState} from "../../state";
import {addBlock, changeStyleText, deleteBlocks} from "../../actions/block";
import {addNewSlide} from "../../actions/navigation/navigation";
import {FigureType, PresentationMaker, TextStyles} from "../../types";
import {changeColorFigure} from "../../actions/figure/figure";
import { PopupBackgroundColor } from "./PopupBackgroundColor/PopupBackgroundColor";
import SetColor from "./SetColor/SetColor";
import Fonts from "./Fonts/Fonts";
import { changeNamePresentation } from "../../actions/presentation";

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
                                <p className={styles.fileListPoint} onClick={() => savePresentatinoWithJSON()}>Скачать в формате JSON</p>
                                <p>Загрузить</p>
                                <input type='file' className={styles.fileListPoint} onChange={(e) => uploadPresentation(e.target)} />
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