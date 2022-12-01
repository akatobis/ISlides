import styles from "./NavSlide.module.css";
import {SlideType} from "../../../types";
import { elemInArray } from "../../../auxiliaryFunctions";

type NavigationSlideProps = {
    slide: SlideType;
    idsSelectedSlides: string[],
}

const NavSlide = (props: NavigationSlideProps) => {
    let navSlideStyle = {
        border: '2px solid #888',
    }
    if (elemInArray(props.idsSelectedSlides, props.slide.id)) {
        navSlideStyle = {
            border: '2px solid #000',
        }
    }
    
    return(
        <div className={styles.navSlide} style={navSlideStyle}>

        </div>
    );
}

export {
    NavSlide,
}