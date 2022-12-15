import styles from './Fonts.module.css';

function Fonts() {
   const fonts: string[] = ['Times New Roman', 'Georgia', 'Arial', 'Tahoma', 'Verdana', 'Impact'];

   return (
      <div className={styles.backgroundFonts}>
         <div className={styles.fonts}>
            {fonts.map(font => {
               return <p className={styles.font} key={font}>{font}</p>
            })}
         </div>
      </div>
   )
}

export default Fonts;