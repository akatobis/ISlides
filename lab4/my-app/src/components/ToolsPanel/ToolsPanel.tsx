import logo from "../../images/logoISlides.svg";
import arrowDown from "../../images/arrow_down.svg";
import {HexColorPicker} from "react-colorful";
import {useState} from "react";
import styles from "./ToolsPanel.module.css"
import {changeBackgroundSlide, deleteSlides} from "../../actions/slide";
import {dispatch, rollBack, returnCancel} from "../../state";
import {addBlock, changeStyleText, deleteBlocks} from "../../actions/block";
import {addNewSlide} from "../../actions/navigation/navigation";
import {FigureType, TextStyles} from "../../types";
import {changeColorFigure} from "../../actions/figure/figure";
import { PopupBackgroundColor } from "./PopupBackgroundColor/PopupBackgroundColor";
import SetColor from "./SetColor/SetColor";
import Fonts from "./Fonts/Fonts";
/*import Dropdown from 'react-dropdown';*/

function ToolsPanel() {
    const [fontSize, setFontSize] = useState('16');

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

    return (
        <div className={styles.header}>
            <div>{isOpenPopupBackgroundColor && <PopupBackgroundColor handleClose={handleOpenPopupBackgroundColor} />}</div>
            <div className={styles.infoLine}>
                <img src={logo} alt="" width="157px" height="46px" className={styles.logo}/>
                <button className={[styles.historyCommandsButton, styles.rollBack].join(" ")} onClick={() => dispatch(rollBack, "")}></button>
                <button className={[styles.historyCommandsButton, styles.returnCancel].join(" ")} onClick={() => dispatch(returnCancel, "")}></button>
                <input placeholder="Название презентации" className={styles.presentationTitle}/>
                <button className={styles.viewButton}>Просмотр</button>
                <button className={styles.fileButton}>Файл</button>
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
                    <p>Arial</p>
                    <img src={arrowDown} alt="" />
                </button>
                {isFontOpen && <Fonts></Fonts>}
            </div>

            {/*<button className={styles.button} onClick={() => {
                dispatch(addNewSlide, '')
            }}>add slide
            </button>

            <button onClick={() => dispatch(deleteSlides, '')}>Delete Slide</button>
            <button onClick={() => dispatch(deleteBlocks, '')}>Delete Block</button>

            <div className={styles.changeBackgroundSlide}>
                <button onClick={() => dispatch(changeBackgroundSlide, {color: colorBackgroundSlide})}>Change Background
                    Slide
                </button>
                <HexColorPicker color={colorBackgroundSlide} onChange={setColorBackgroundSlide}/>
                <input type="file" onChange={(e) => {
                    const target = e.target as Element;
                    downloadImg(target, true)
                }}></input>
            </div>

            <div className={styles.changeBackgroundSlide}>
                <p>Add Image</p>
                <input type="file" onChange={(e) => {
                    const target = e.target as Element;
                    downloadImg(target, false)
                }}></input>
            </div>

            <button onClick={() => dispatch(addBlock, {})}>Create Text Block</button>

            <div className={styles.changeBackgroundSlide}>
                <button onClick={() => dispatch(changeStyleText, {newColor: colorTextBlock})}>Change Color Text</button>
                <HexColorPicker color={colorTextBlock} onChange={setColorTextBlock}/>

                <button onClick={() => dispatch(changeStyleText, {newTextStyle: TextStyles.bold})}>Bold</button>
                <button onClick={() => dispatch(changeStyleText, {newTextStyle: TextStyles.italic})}>Italic</button>
                <button onClick={() => dispatch(changeStyleText, {newTextStyle: TextStyles.underline})}>Underline
                </button>
                <button
                    onClick={() => dispatch(changeStyleText, {newTextStyle: TextStyles.strikethrough})}>Strikethrough
                </button>
                <button>Change Font Size</button>
                |
                <button>Change Font Size</button>|
            </div>

            <button onClick={() => dispatch(addBlock, {figureType: FigureType.ellipse})}>Add Ellipse</button>
            <button onClick={() => dispatch(addBlock, {figureType: FigureType.triangle})}>Add Triangle</button>
            <button onClick={() => dispatch(addBlock, {figureType: FigureType.rectangle})}>Add Rectangle</button>

            <HexColorPicker color={colorFigureFill} onChange={setColorFigureFill}/>
            <button
                onClick={() => {
                    dispatch(changeColorFigure, {colorFill: colorFigureFill})
                }}
            >Change Fill Color
            </button>

            <HexColorPicker color={colorFigureBorder} onChange={setColorFigureBorder}/>
            <button
                onClick={() => {
                    dispatch(changeColorFigure, {colorBorder: colorFigureBorder})
                }}
            >Change Border Color
            </button>*/}

        </div>
    )
}

export {
    ToolsPanel,
}