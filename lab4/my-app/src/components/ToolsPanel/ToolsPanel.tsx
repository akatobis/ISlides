import logo from "../../images/logoISlides.svg";
import rollBack from "../../images/rollBack.svg";
import returnCancel from "../../images/returnCancel.svg";
import view from "../../images/view.svg";
import file from "../../images/file.svg";
import {HexColorPicker} from "react-colorful";
import {useState} from "react";
import styles from "./ToolsPanel.module.css"
import {changeBackgroundSlide, deleteSlides} from "../../actions/slide";
import {dispatch} from "../../state";
import {addBlock, changeStyleText, deleteBlocks} from "../../actions/block";
import {addNewSlide} from "../../actions/navigation/navigation";
import {FigureType, TextStyles} from "../../types";
import {changeColorFigure} from "../../actions/figure/figure";

function ToolsPanel() {
    const [colorBackgroundSlide, setColorBackgroundSlide] = useState("#fff");
    const [colorTextBlock, setColorTextBlock] = useState("#fff");
    const [colorFigureFill, setColorFigureFill] = useState("#fff");
    const [colorFigureBorder, setColorFigureBorder] = useState("#000");

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

    return (
        <div className={styles.header}>
            <div className={styles.infoLine}>
                <img src={logo} alt="" width="157px" height="46px" className={styles.logo}/>
                <div className={styles.historyCommands}>
                    <button className={styles.historyCommandsButton}>
                        <img src={rollBack} width="20px" height="8px" alt=""/>
                    </button>
                    <button className={styles.historyCommandsButton}>
                        <img src={returnCancel} width="20px" height="8px" alt=""/>
                    </button>
                </div>
                <input placeholder="Название презентации" className={styles.presentationTitle}/>
                <button className={styles.viewButton}>
                    Просмотр
                    <img src={view} alt="" width="7px" height="10px" className={styles.viewButtonImg}/>
                </button>
                <button className={styles.fileButton}>
                    Файл
                    <img src={file} alt="" width="17px" height="17px" className={styles.fileButtonImg}/>
                </button>
            </div>
            <div className={styles.toolsLine}>

            </div>
            <button className={styles.button} onClick={() => {
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
            </button>

        </div>
    )
}

export {
    ToolsPanel,
}