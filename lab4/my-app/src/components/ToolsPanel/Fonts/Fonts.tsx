import { changeStyleText } from '../../../actions/block';
import { dispatch } from '../../../state';
import styles from './Fonts.module.css';

function Fonts(props: any) {
   const fonts: string[] = ['Times New Roman', 'Georgia', 'Arial', 'Tahoma', 'Verdana', 'Impact'];

   function handleChoseFont(font: string): void {
      dispatch(changeStyleText, {newFont: font});
      props.handleChoseFont(font);
      props.handleClose();
   }

   return (
      <div>
         <div className={styles.fonts}>
            {fonts.map(font => {
               return <p className={styles.font} key={font} onClick={() => handleChoseFont(font)}>{font}</p>
            })}
         </div>

         <div className={styles.backgroundFonts} onClick={props.handleClose}></div>
      </div>
   )
}

export default Fonts;