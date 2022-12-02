import styles from "./NavSlide.module.css";
import {SlideType} from "../../../types";
import { elemInArray } from "../../../auxiliaryFunctions";
import {useState} from 'react'
import {moveSlides} from './../../../actions/navigation/navigation'
import {dispatch} from './../../../state'

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

    const [ dragOver, setDragOver ] = useState(false); 

    const handleDragOverStart = () => setDragOver(true);
    
    const handleDragOverEnd = () => setDragOver(false);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        console.log('drag',event.currentTarget.id)
    }

    const enableDropping = (event: React.DragEvent<HTMLDivElement>) => { 
        event.preventDefault();
    }
    
    const handleDrop = (event: React.DragEvent<HTMLDivElement>,slide:SlideType) => {
        event.preventDefault();
        console.log('drop',slide.id)
        dispatch(moveSlides,slide.id)
        setDragOver(false);
    }
    
    return(
        <div className={styles.navSlide}
        draggable={true}
        onDragStart={(e)=>{handleDragStart(e)}}
        onDragLeave={(e)=>{handleDragOverEnd()}}
        onDragEnter={(e)=>handleDragOverStart()}
        onDragEnd={(e)=>{}}
        onDragOver={(e)=>{enableDropping(e)}}
        onDrop={(e)=>{handleDrop(e,props.slide)}}
        style={ dragOver ? {fontWeight: 'bold', background: 'red'} : navSlideStyle}
        >
        </div>
    );
}

export {
    NavSlide,
}