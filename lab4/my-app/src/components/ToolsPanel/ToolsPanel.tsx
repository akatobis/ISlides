import logo from "../../images/logoISlides.svg";
import arrowDown from "../../images/arrow_down.svg";
import {HexColorPicker} from "react-colorful";
import {useState} from "react";
import styles from "./ToolsPanel.module.css"
import {changeBackgroundSlide, deleteSlides} from "../../actions/slide";
import {dispatch} from "../../state";
import {addBlock, changeStyleText, deleteBlocks} from "../../actions/block";
import {addNewSlide} from "../../actions/navigation/navigation";
import {FigureType, TextStyles} from "../../types";
import {changeColorFigure} from "../../actions/figure/figure";
import Dropdown from 'react-dropdown';

function ToolsPanel() {
    const [colorBackgroundSlide, setColorBackgroundSlide] = useState("#fff");
    const [colorTextBlock, setColorTextBlock] = useState("#fff");
    const [colorFigureFill, setColorFigureFill] = useState("#fff");
    const [colorFigureBorder, setColorFigureBorder] = useState("#000");
    const [fontSize, setFontSize] = useState('16');

    const [isFontOpen, setFontOpen] = useState(false);
    const handleFontOpen = () => setFontOpen(true);

    function verifyExtensionImg(file: any): boolean {
        const extensionSelectedFile = file.type.split("/").pop();
        return extensionSelectedFile === "png" || extensionSelectedFile === "jpg" || extensionSelectedFile === "jpeg" || extensionSelectedFile === "svg";
    }

    function downloadImg(input: any, isSlide: boolean): any {
        const imgFile = input.files[0];

        if (!verifyExtensionImg(imgFile)) {
            return "";
        }

        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onload = () => {
            if (reader.result) {
                input.value = '';
                if (isSlide) {
                    dispatch(changeBackgroundSlide, {image: reader.result.toString()});
                } else {
                    dispatch(addBlock, {img: reader.result.toString()})
                }
            } else {
                console.log("Ошибка обработки файла");
            }
        };
        reader.onerror = () => {
            console.log("Ошибка открытия файла");
        };
    }

    const options = [
  'one', 'two', 'three'
];

    return (
        <div className={styles.header}>
            <div className={styles.infoLine}>
                <img src={logo} alt="" width="157px" height="46px" className={styles.logo}/>
                <button className={[styles.historyCommandsButton, styles.rollBack].join(" ")}></button>
                <button className={[styles.historyCommandsButton, styles.returnCancel].join(" ")}></button>
                <input placeholder="Название презентации" className={styles.presentationTitle}/>
                <button className={styles.viewButton}>Просмотр</button>
                <button className={styles.fileButton}>Файл</button>
            </div>

            <div className={styles.toolsLine}>
                <button className={[styles.slideButtons, styles.addSlide].join(" ")}></button>
                <button className={[styles.slideButtons, styles.deleteSlide].join(" ")}></button>
                <button className={[styles.slideButtons, styles.changeColor].join(" ")}></button>

                <button className={[styles.slideButtons, styles.rectangle].join(" ")}></button>
                <button className={[styles.slideButtons, styles.ellipse].join(" ")}></button>
                <button className={[styles.slideButtons, styles.triangle].join(" ")}></button>

                <button className={[styles.slideButtons, styles.ellipseBorder].join(" ")}></button>
                <button className={[styles.slideButtons, styles.ellipseFill].join(" ")}></button>

                <button className={[styles.slideButtons, styles.addImage].join(" ")}></button>

                <button className={[styles.slideButtons, styles.addText].join(" ")}></button>

                <button className={[styles.slideButtons, styles.changeBold].join(" ")}></button>
                <button className={[styles.slideButtons, styles.changeItalic].join(" ")}></button>
                <button className={[styles.slideButtons, styles.changeUnderline].join(" ")}></button>
                <button className={[styles.slideButtons, styles.changeStrikethrought].join(" ")}></button>
                <button className={[styles.slideButtons, styles.changeColorText].join(" ")}></button>

                <button className={[styles.slideButtons, styles.increaseSizeText].join(" ")}></button>
                <input type="text" value={fontSize} onChange={(e) => setFontSize(e.target.value)} className={[styles.slideButtons, styles.fontSize].join(" ")} />
                <button className={[styles.slideButtons, styles.decreaseSizeText].join(" ")}></button>

                <button onClick={handleFontOpen} className={[styles.slideButtons, styles.fontFamily].join(" ")}>
                    <p>Arial</p>
                    <img src={arrowDown} alt="" />
                </button>
                {/* {
                    isFontOpen && (
                        <Fonts></Fonts>
                    )
                } */}
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