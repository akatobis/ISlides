import styles from "./Slide.module.css"
import { BlockType, SlideType } from "../../types"
import { Block } from "../Block/Block";

type SlideProps = {
   slide: SlideType,
}

function Slide(props: SlideProps) {
   let slideStyle = {};
   if (props.slide.backgroundColor !== "") {
      slideStyle = {
         background: props.slide.backgroundColor,
         backgroundImage: 'url()',
      }
   }
   if (props.slide.backgroundImage !== "") {
      slideStyle = {
         background: '',
         backgroundImage: props.slide.backgroundImage,
      }
   }

   const blocks: BlockType[] = props.slide.blocks;

   return (
      <div className={styles.slide} style={slideStyle}>
         {/* {blocks.map(block => (
            <Block key={block.id} block={block}/>
         ))} */}
      </div>
   )
}

export {
   Slide,
}