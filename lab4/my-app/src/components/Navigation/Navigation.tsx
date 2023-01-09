import styles from "./Navigation.module.css";
import {PresentationMaker} from "../../types";
import {NavSlide} from "./Navigation_slide/NavSlide";
import {useState, CSSProperties, useRef} from "react";
import {HideShowNavButton} from './HideShowNavButton/HideShowNavButton';

type NavigationProps = {
    presentationMaker: PresentationMaker;
}

const Navigation = (props: NavigationProps) => {
    const [show, setShow] = useState<boolean>(false)
    const navigation = useRef<HTMLOListElement>(null)

    let style = {} as CSSProperties
    if(show)
    {
        style = {
            width: 0,
        }
    }

    return (
        <div>
            <ol className={styles.navigation} style={style} ref={navigation}>
                {props.presentationMaker.presentation.slides.map(slide => {
                    return (
                        <NavSlide
                            key={slide.id} slide={slide} idsSelectedSlides={props.presentationMaker.idsSelectedSlides}
                        />
                    )
                })}
            </ol>
            <HideShowNavButton setShow={setShow} navigation={navigation}/>
        </div>

    )
};


export {
    Navigation,
}