import styles from "./Navigation.module.css"
import {PresentationMaker} from "../../types";
import {NavSlide} from "./Navigation_slide/NavSlide"
import {selectSlides} from "../../actions/navigation/navigation";
import {dispatch, getState} from "../../state";

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
                        onClick={(e) => {
                            if (getState().idsSelectedSlides.length > 1 || !e.target.classList.contains(styles.slideBorderOn))
                            {
                                e.target.classList.toggle(styles.slideBorderOn);
                            }
                            dispatch(selectSlides, slide.id);
                        }}
                    >
                        <NavSlide
                            slide={slide}
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