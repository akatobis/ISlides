import styles from "./Slide.module.css"
import {SlideType} from "../../types"
import {Blocks} from "../Blocks/Blocks";
import React from "react";
import {removeBlockSelection} from "../../actions/slide";
import {dispatch} from "../../state";

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

    return (
        <div className={styles.slide} style={slideStyle}>
            <Blocks blocks={props.slide.blocks}/>
        </div>
    )
}

export {
    Slide,
}