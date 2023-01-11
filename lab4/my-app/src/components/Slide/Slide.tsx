import styles from "./Slide.module.css"
import {PresentationMaker, SlideType} from "../../types"
import {Blocks} from "../Blocks/Blocks";
import React, {CSSProperties, useEffect, useState} from "react";

type SlideProps = {
    slide: SlideType,
    idsSelectedSlides: string[],
    idsSelectedBlocks: string[],
    from: string,
    workZone: React.RefObject<HTMLDivElement>
}

function Slide(props: SlideProps) {
    let slideStyle = {} as CSSProperties;
    let slideSize = {} as CSSProperties;
    let targetNode = props.workZone.current;
    let id = "slide";

    const [innerWidth, setInnerWidth] = useState(Number(targetNode?.clientWidth));
    const [innerHeight, setInnerHeight] = useState(Number(targetNode?.clientHeight));
    const [sizeFactor, setSizeFactor] = useState(0);

    function getSlideSize() {
        setInnerWidth(Number(targetNode?.clientWidth));
        setInnerHeight(Number(targetNode?.clientHeight));

        if (Number(targetNode?.clientHeight) * 1.8 < Number(targetNode?.clientWidth)) {
            setInnerWidth(Number(targetNode?.clientHeight) * 1.8)
            setInnerHeight(Number(targetNode?.clientHeight));
        }
        if (Number(targetNode?.clientWidth) / 1.8 <= Number(targetNode?.clientHeight)) {
            setInnerHeight(Number(targetNode?.clientWidth) / 1.8)
            setInnerWidth(Number(targetNode?.clientWidth));
        }

        setSizeFactor(160 / innerWidth)
    }

    if (props.slide.backgroundColor !== "") {
        slideStyle = {
            background: props.slide.backgroundColor,
            backgroundImage: 'url()',
        }
    }
    if (props.slide.backgroundImage !== "") {
        slideStyle = {
            background: '',
            backgroundImage: `url(${props.slide.backgroundImage})`,
        } as CSSProperties;
    }

    useEffect(() => {
        targetNode = props.workZone.current;
        window.addEventListener("resize", getSlideSize);
        return (() => {
            window.removeEventListener("resize", getSlideSize)
        });

    }, [innerWidth, innerHeight]);

    useEffect(() => {
        targetNode = props.workZone.current;
        getSlideSize();
    }, []);

    useEffect(() => {
        setSizeFactor(160 / innerWidth)
    }, [innerWidth])

    slideSize = {
        ...slideSize,
        height: innerHeight + "px",
        width: innerWidth + "px"
    }

    slideStyle = {
        ...slideStyle,
        ...slideSize,
    }

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
        id += `${props.slide.id}-nav-slide`;
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