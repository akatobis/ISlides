import styles from "./Navigation.module.css"
import {PresentationMaker} from "../../types";
import {NavSlide} from "./Navigation_slide/NavSlide"
import {selectSlides} from "../../actions/navigation/navigation";
import {dispatch} from "../../state";

type NavigationProps = {
    presentationMaker: PresentationMaker;
}

const Navigation = (props: NavigationProps) => {
    return (
        <div className={styles.navigation}>
            {props.presentationMaker.presentation.slides.map(slide => {
                return (
                    <button
                        className={styles.slideButton}
                        key={slide.id}
                        onClick={() => {dispatch(selectSlides, slide.id);}}
                    >
                        <NavSlide
                            slide={slide} idsSelectedSlides={props.presentationMaker.idsSelectedSlides}
                        />
                    </button>
                )
            })}
        </div>
    )
};


export {
    Navigation,
}