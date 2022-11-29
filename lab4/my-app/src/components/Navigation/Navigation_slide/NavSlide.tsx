import styles from "./NavSlide.module.css";
import {SlideType} from "../../../types";

type NavigationSlideProps = {
    slide: SlideType;
}

const NavSlide = (props: NavigationSlideProps) => {
    return(
        <div className={styles.navSlide}>

        </div>
    );
}

export {
    NavSlide,
}