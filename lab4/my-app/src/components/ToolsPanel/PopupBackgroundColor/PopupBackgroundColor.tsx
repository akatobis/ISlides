import {HexColorPicker} from "react-colorful";
import {useState} from "react";
import styles from './PopupBackgroundColor.module.css';
import { dispatch } from "../../../state";
import { changeBackgroundAllSlide, changeBackgroundSlide } from "../../../actions/slide";
import choseColorImg from "../../../images/chose_color.svg";

function PopupBackgroundColor(props: any) {
   const [colorBackgroundSlide, setColorBackgroundSlide] = useState("#fff");

   const [isOpenPopupColorBackgroundSlide, setIsOpenPopupColorBackgroundSlide] = useState(false);

   function downloadImg(input: any): any {

        function verifyExtensionImg(file: any): boolean {
            const extensionSelectedFile = file.type.split("/").pop();
            return extensionSelectedFile === "png" || extensionSelectedFile === "jpg" || extensionSelectedFile === "jpeg";
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
               <HexColorPicker color={colorBackgroundSlide} onChange={setColorBackgroundSlide} />
               <button className={styles.buttonComplite} onClick={() => setIsOpenPopupColorBackgroundSlide(!isOpenPopupColorBackgroundSlide)}>Отмена</button>
               <button className={styles.buttonApplyToAll} onClick={() => dispatch(changeBackgroundSlide, {color: colorBackgroundSlide})}>Ок</button>
            </div>}

            <div className={styles.rowChangeColor}>
               <p>Изображение</p>
               <div className={styles.addImage}>
                  <p className={styles.addImageText}>Добавьте Изображение</p>
                  <input
                     type="file"
                     onChange={(e) => {const target = e.target as Element; downloadImg(target)}}
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