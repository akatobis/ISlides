import styles from "./Slide.module.css"
import {SlideType} from "../../types"
import {Blocks} from "../Blocks/Blocks";
import React from "react";

type SlideProps = {
   slide: SlideType,
   idsSelectedSlides: string[],
   idsSelectedBlocks: string[],
   from: string,
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

   let innerWidth;
   let innerHeight;

   function getSlideSize() {
      innerWidth = targetNode?.clientWidth;
      innerHeight = targetNode?.clientHeight;
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

   if (props.from === "navigation") {
      slideStyle = {
         ...slideStyle,
         width: "157px",
         height: "82px",
         borderRadius: "8px",
         marginLeft: "-1px",
         marginTop: "-0.5px",
      }
   } else {
      slideStyle = {
         ...slideStyle,
         ...slideSize,
      }
   }

   return (
       <div className={styles.slide} style={slideStyle}>
          <Blocks slideId={props.slide.id} blocks={props.slide.blocks} idsSelectedBlocks={props.idsSelectedBlocks}/>
       </div>
   )
}

export {
    Slide,
}