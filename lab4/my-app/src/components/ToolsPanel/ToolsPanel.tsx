import logo from "../../images/logoISlides.svg";
import arrowDown from "../../images/arrow_down.svg";
import {useState} from "react";
import styles from "./ToolsPanel.module.css";
import {deleteSlides, removeBlockSelection} from "../../actions/slide";
import {dispatch, rollBack, returnCancel} from "../../state";
import {addBlock, changeStyleText} from "../../actions/block";
import {addNewSlide} from "../../actions/navigation/navigation";
import {FigureType, TextStyles} from "../../types";
import {changeColorFigure} from "../../actions/figure/figure";
import { PopupBackgroundColor } from "./PopupBackgroundColor/PopupBackgroundColor";
import SetColor from "./SetColor/SetColor";
import Fonts from "./Fonts/Fonts";
import { changeNamePresentation } from "../../actions/presentation";
import SaveAndUpload from "./SaveAndUpload/SaveAndUpload";
import {keyboardKey} from "@testing-library/user-event";


type ToolsPanelProps = {
    idsSelectedBlocks: string[]
}
function ToolsPanel(props: ToolsPanelProps) {
    const [fontSize, setFontSize] = useState<string>('16');

    const [namePresentation, setNamePresentation] = useState<string>('')
    const handleNamePresentation = (name: string) => {
        setNamePresentation(name);
        dispatch(changeNamePresentation, name);
    }

    const [fontFamily, setFontFamily] = useState<string>('Arial');
    const handleFontFamily = (font: string) => setFontFamily(font);

    const [isFontOpen, setFontOpen] = useState<boolean>(false);
    const handleFontOpen = () => setFontOpen(!isFontOpen);

    const [isOpenPopupBackgroundColor, setIsOpenPopupBackgroundColor] = useState<boolean>(false);
    const handleOpenPopupBackgroundColor = () => setIsOpenPopupBackgroundColor(!isOpenPopupBackgroundColor);

    const [isOpenPopupBorderColorFigure, setIsOpenPopupBorderColorFigure] = useState<boolean>(false);
    const handleOpenPopupBorderColorFigure = () => setIsOpenPopupBorderColorFigure(!isOpenPopupBorderColorFigure);
    const [isOpenPopupFillColorFigure, setIsOpenPopupFillColorFigure] = useState<boolean>(false);
    const handleOpenPopupFillColorFigure = () => setIsOpenPopupFillColorFigure(!isOpenPopupFillColorFigure);
    const [isOpenPopupTextColor, setIsOpenPopupTextColor] = useState<boolean>(false);
    const handleOpenPopupTextColor = () => setIsOpenPopupTextColor(!isOpenPopupTextColor);

    function verifyExtensionImg(file: any): boolean {
        const extensionSelectedFile = file.type.split("/").pop();
        return extensionSelectedFile === "png" || extensionSelectedFile === "jpg" || extensionSelectedFile === "jpeg" || extensionSelectedFile === "svg";
    }

    function downloadImg(input: EventTarget & HTMLInputElement): void {
        if (!input.files) { return }
        const imgFile = input.files[0];

        if (!verifyExtensionImg(imgFile)) { return; }

        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onload = () => {
            const img = new Image();
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

    function requestFullScreen() {
        const slide = document.querySelector('#slide');
        if (!slide) {return}
        var requestMethod = slide.requestFullscreen;
        if (requestMethod) {
            dispatch(removeBlockSelection, {});
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

                <SaveAndUpload namePresentation={namePresentation} />
            </div>

            <div className={styles.toolsLine}>
                <button className={[styles.slideButtons, styles.addSlide].join(" ")} onClick={() => {dispatch(addNewSlide, '')}}></button>
                <button className={[styles.slideButtons, styles.deleteSlide].join(" ")} onClick={() => dispatch(deleteSlides, 'tools')}></button>
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
                        onChange={(e) => {downloadImg(e.target)}}
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