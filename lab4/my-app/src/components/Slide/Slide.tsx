import styles from "./Slide.module.css"
import {SlideType} from "../../types"
import {Blocks} from "../Blocks/Blocks";
import React from "react";

type SlideProps = {
   slide: SlideType,
   idsSelectedSlides: string[],
   idsSelectedBlocks: string[],
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

   return (
       <div className={styles.slide}>
          <Blocks blocks={props.slide.blocks} idsSelectedBlocks={props.idsSelectedBlocks}/>
       </div>
   )
}

export {
    Slide,
}