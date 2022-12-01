import styles from "./Slide.module.css"
import {SlideType} from "../../types"
import {Blocks} from "../Blocks/Blocks";
import React from "react";
import { elemInArray } from "../../auxiliaryFunctions";

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
   if (elemInArray(props.idsSelectedSlides, props.slide.id)) {
      slideStyle = {
         ...slideStyle,
         border: '1px solid #000',
      }
   }

   return (
       <div className={styles.slide} style={slideStyle}>
          <Blocks blocks={props.slide.blocks} idsSelectedBlocks={props.idsSelectedBlocks}/>
       </div>
   )
}

export {
    Slide,
}