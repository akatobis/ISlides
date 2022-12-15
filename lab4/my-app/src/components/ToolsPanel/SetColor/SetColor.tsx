import {HexColorPicker} from "react-colorful";
import { dispatch } from "../../../state";
import styles from "./SetColor.module.css";
import {useState} from "react";

function SetColor(props: any) {
   const [color, setColor] = useState("#fff");

   function handleSetColor(): void {
      if (props.type === 'colorText') {
         dispatch(props.changeColor, {newColor: color});
         return;
      }
      if (props.type === 'colorFillFigure') {
         dispatch(props.changeColor, {colorFill: color});
         return;
      }
      if (props.type === 'colorBorderFigure') {
         dispatch(props.changeColor, {colorBorder: color});
         return;
      }
      if (props.type === 'colorSlide') {
         dispatch(props.changeColor, {color: color});
         return;
      }
   }

   return (
      <div className={styles.popupColorContent} >
         <HexColorPicker color={color} onChange={setColor} />
         <button className={styles.buttonComplite} onClick={props.handleClose}>Отмена</button>
         <button className={styles.buttonApplyToAll} onClick={() => handleSetColor()}>Ок</button>
      </div>
   )
}

export default SetColor