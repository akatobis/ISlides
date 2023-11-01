import { dispatch } from "../../../state";
import styles from "./SetColor.module.css";
import {useState} from "react";
import { ColorPicker } from "./ColorPicker/ColorPicker";

type SetColorProps = {
   handleClose: Function,
   changeColor: Function,
   type: string,
   color: string,
   handleChangeColorToolsPanal: Function,
}

function SetColor(props: SetColorProps) {
   function handleChangeColor(color: string) {
      props.handleChangeColorToolsPanal(color);
   }

   function handleSetColor(): void {
      if (props.type === 'colorText') {
         dispatch(props.changeColor, {newColor: props.color});
         return;
      }
      if (props.type === 'colorFillFigure') {
         dispatch(props.changeColor, {colorFill: props.color});
         return;
      }
      if (props.type === 'colorBorderFigure') {
         dispatch(props.changeColor, {colorBorder: props.color});
         return;
      }
      if (props.type === 'colorSlide') {
         dispatch(props.changeColor, {color: props.color});
         return;
      }
   }

   return (
      <div className={styles.popupColorContent} >
         <ColorPicker
            color={props.color}
            onChange={handleChangeColor}
         />
         <button className={styles.buttonComplite} onClick={() => props.handleClose()}>Отмена</button>
         <button className={styles.buttonApplyToAll} onClick={() => handleSetColor()}>Ок</button>
      </div>
   )
}

export default SetColor