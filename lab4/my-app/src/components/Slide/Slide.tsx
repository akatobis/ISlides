import styles from "./Slide.module.css"
import {SlideType} from "../../types"
import {Blocks} from "../Blocks/Blocks";
import React, {CSSProperties} from "react";

let sizeFactor = 1;

type SlideProps = {
    slide: SlideType,
    idsSelectedSlides: string[],
    idsSelectedBlocks: string[],
    from: string,
}

function Slide(props: SlideProps) {
    let slideStyle = {} as CSSProperties;
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
        } as CSSProperties;
    }

    let slideSize = {} as CSSProperties;
    let targetNode = document.getElementById("WorkZone");
    let innerWidth = 0;
    let innerHeight = 0;

    function getSlideSize() {
        innerWidth = Number(targetNode?.clientWidth);
        innerHeight = Number(targetNode?.clientHeight);
    }

    getSlideSize();

    if (!innerWidth) {
        innerWidth = 0;
    }
    if (!innerHeight) {
        innerHeight = 0
    }

    if (innerHeight * 1.8 < innerWidth) {
        innerWidth = innerHeight * 1.8
        sizeFactor = 88 / innerHeight
    }
    if (innerWidth / 1.8 <= innerHeight) {
        innerHeight = innerWidth / 1.8;
        sizeFactor = 160 / innerWidth;
    }

    slideSize = {
        ...slideSize,
        height: innerHeight + "px",
        width: innerWidth + "px"
    }

    slideStyle = {
        ...slideStyle,
        ...slideSize,
    }

    let id = props.slide.id;
    if (props.from === "navigation") {
        slideStyle = {
            ...slideStyle,
            boxSizing: "border-box",
            transform: `scale(${sizeFactor * 0.97})`,
            borderRadius: `${8 / sizeFactor}px`,
            position: "absolute",
            overflow: "hidden",
            pointerEvents: "none",
        }
        id += "-nav";
    }

    return (
        <div className={styles.slide} style={slideStyle} id={id}>
            <Blocks slideId={props.slide.id} blocks={props.slide.blocks} idsSelectedBlocks={props.idsSelectedBlocks}
                    from={props.from}/>
        </div>
    )
}

export {
    Slide,
}