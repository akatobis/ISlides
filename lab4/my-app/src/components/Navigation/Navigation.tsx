import styles from "./Navigation.module.css"
import {PresentationMaker} from "../../types";
import {NavSlide} from "./Navigation_slide/NavSlide"
import { useState } from "react";
import {HideShowNavButton} from './HideShowNavButton/HideShowNavButton'

type NavigationProps = {
    presentationMaker: PresentationMaker;
}

const Navigation = (props: NavigationProps) => {
    const [countSlide, setCountSlide] = useState(0)
    return (
        <div>
            <ol className={styles.navigation}>
                {props.presentationMaker.presentation.slides.map(slide => {
                    return (
                        <NavSlide
                            key={slide.id} slide={slide} idsSelectedSlides={props.presentationMaker.idsSelectedSlides} countSlide={countSlide}
                        />
                    )
                })}
            </ol>
            <HideShowNavButton/>
        </div>

    )
};


export {
    Navigation,
}