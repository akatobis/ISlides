import {HexColorPicker} from "react-colorful";
import {useCallback, useState} from "react";
import styles from './PopupBackgroundColor.module.css';
import { dispatch } from "../../../state";
import { changeBackgroundAllSlide, changeBackgroundSlide } from "../../../actions/slide";
import choseColorImg from "../../../images/chose_color.svg";
import { Selector } from "../SetColor/ColorPicker/Selector/Selector";
import { ColorPicker } from "../SetColor/ColorPicker/ColorPicker";

function PopupBackgroundColor(props: any) {
   const [colorBackgroundSlide, setColorBackgroundSlide] = useState<string>("#fff");

   const handleChangeColor = useCallback((color: string) => {
      setColorBackgroundSlide(color);
   }, []);

   const [isOpenPopupColorBackgroundSlide, setIsOpenPopupColorBackgroundSlide] = useState<boolean>(false);

   function verifyExtensionImg(file: File): boolean {
      const extensionSelectedFile = file.type.split("/").pop();
      return extensionSelectedFile === "png" || extensionSelectedFile === "jpg" || extensionSelectedFile === "jpeg";
   }
   
   function downloadImg(input: EventTarget & HTMLInputElement): void {
        if (!input.files) { return };
        const imgFile: File = input.files[0];

        if (!verifyExtensionImg(imgFile)) { return }

        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onload = () => {
            if (reader.result) {
               input.value = '';
               dispatch(changeBackgroundSlide, {image: reader.result.toString()});
            } else {
                console.log("Ошибка обработки файла");
            }
        };
        reader.onerror = () => {
            console.log("Ошибка открытия файла");
        };
    }

   return (
      <div className={styles.popupBackground} onClick={props.handleClose}>
         <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.titlePopup}>Фон слайда</h3>

            <div className={styles.rowChangeColor} onClick={() => setIsOpenPopupColorBackgroundSlide(!isOpenPopupColorBackgroundSlide)}>
               <p>Цвет</p>
               <button className={styles.buttonAddImg}><img src={choseColorImg} alt="" /></button>
            </div>
            
            {isOpenPopupColorBackgroundSlide &&
            <div className={styles.popupColorContent} >
               <ColorPicker
                  color={colorBackgroundSlide}
                  onChange={handleChangeColor}
               />
               <button className={styles.buttonComplite} onClick={() => setIsOpenPopupColorBackgroundSlide(!isOpenPopupColorBackgroundSlide)}>Отмена</button>
               <button className={styles.buttonApplyToAll} onClick={() => dispatch(changeBackgroundSlide, {color: colorBackgroundSlide})}>Ок</button>
            </div>}

            <div className={styles.rowChangeColor}>
               <p>Изображение</p>
               <div className={styles.addImage}>
                  <p className={styles.addImageText}>Добавьте Изображение</p>
                  <input
                     type="file"
                     onChange={(e) => {downloadImg(e.target)}}
                     className={styles.addImageInput}
                  >
                  </input>
               </div>
            </div>
            
            <button className={styles.buttonComplite} onClick={props.handleClose}>Готово</button>
            <button className={styles.buttonApplyToAll} onClick={() => dispatch(changeBackgroundAllSlide, {})}>Применить ко всем</button>
         </div>
      </div>
   )
}

export {
   PopupBackgroundColor,
}