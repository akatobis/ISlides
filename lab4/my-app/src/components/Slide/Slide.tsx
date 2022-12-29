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

   let targetNode = document.getElementById("WorkZone");
   console.log(targetNode);

   let innerWidth;
   let innerHeight;

   function getSlideSize() {
      innerWidth = document.getElementById("WorkZone")?.clientWidth;
      innerHeight = document.getElementById("WorkZone")?.clientHeight;
   }

   getSlideSize();

   if (innerWidth === undefined) {innerWidth = 0}
   if (innerHeight === undefined) {innerHeight = 0}

   let slideSize = {};
   if (innerHeight * 1.8 < innerWidth) {
      innerHeight -= 30;
      slideSize = {
         ...slideSize,
         height: innerHeight + "px",
      }
   }
   if (innerWidth / 1.8 <= innerHeight) {
      innerWidth -= 50;
      slideSize = {
         ...slideSize,
         width: innerWidth + "px",
      }
   }

   slideStyle = {
      ...slideStyle,
      ...slideSize,
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