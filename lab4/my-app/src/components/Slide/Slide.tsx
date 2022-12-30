import styles from "./Slide.module.css"
import {PresentationMaker, SlideType} from "../../types"
import {Blocks} from "../Blocks/Blocks";
import React from "react";
import { connect } from "react-redux";

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
       <div className={styles.slide} style={slideStyle}>
          <Blocks blocks={props.slide.blocks} idsSelectedBlocks={props.idsSelectedBlocks}/>
       </div>
   )
}

const mapStateToProps = (state: SlideType) => {
   return {slide: state}
}

export default connect(mapStateToProps)(Slide);