import { dispatch } from "../../../state";
import styles from "./SetColor.module.css";
import {useCallback, useState} from "react";
import { ColorPicker } from "./ColorPicker/ColorPicker";

function SetColor(props: any) {
   const [color, setColor] = useState("#fff");

   const handleChangeColor = useCallback((color: string) => {
      setColor(color);
   }, []);

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
         <ColorPicker
            color={color}
            onChange={handleChangeColor}
         />
         <button className={styles.buttonComplite} onClick={props.handleClose}>Отмена</button>
         <button className={styles.buttonApplyToAll} onClick={() => handleSetColor()}>Ок</button>
      </div>
   )
}

export default SetColor