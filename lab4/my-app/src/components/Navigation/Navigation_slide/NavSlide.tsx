import styles from "./NavSlide.module.css";
import {SlideType} from "../../../types";
import {useState} from 'react'
import {moveSlides, selectSlide} from '../../../actions/navigation/navigation';
import {removeBlockSelection} from '../../../actions/slide'
import {dispatch} from "../../../state";
import {useMousePress} from "../../../shortcuts";
import {Slide} from "../../Slide/Slide";

type NavigationSlideProps = {
    slide: SlideType;
    idsSelectedSlides: string[],
}

const NavSlide = (props: NavigationSlideProps) => {
    let navSlideStyle = {
        border: '2px solid #888',
    }
    let parentNavSlideStyle = {
        backgroundColor:'#fff',
        border:'none',
        color:'#fff',
        margin:'0px 0px 0px 5px',
    }
    let buttonNavSlideStyle = {
        backgroundColor:'#fff',
        color:'#fff',
        border:'none',
        margin:'0px 0px 0px 10px',
    }
    if ( props.idsSelectedSlides.includes(props.slide.id)) {
        navSlideStyle = {
            border: '2px solid #6600BA',
        }
        parentNavSlideStyle = {
            backgroundColor:'#FFF6FD',
            border:'none',
            color:'#fff',
            margin:'0px 0px 0px 5px',
        }
        buttonNavSlideStyle = {
            backgroundColor:'#FFF6FD',
            color:'#FFF6FD',
            border:'none',
            margin:'0px 0px 0px 10px',
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

    useMousePress(props.slide.id, "", "slide", document.getElementById(props.slide.id+"-nav"));
    
    return(
        <div className='container' style={parentNavSlideStyle} id={`${props.slide.id}-nav`}>
            <button
                className={styles.slideButton}
                style={buttonNavSlideStyle}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    dispatch(removeBlockSelection, {});
                    if (e.button === 0 && !e.ctrlKey){
                        dispatch(selectSlide, props.slide.id);
                    }
                }}
            >
                <li>
                    <div className={styles.navSlide}
                        draggable={true}
                        onDragStart={(e: React.DragEvent<HTMLDivElement>)=>{handleDragStart(e)}}
                        onDragLeave={(e: React.DragEvent<HTMLDivElement>)=>{handleDragOverEnd()}}
                        onDragEnter={(e: React.DragEvent<HTMLDivElement>)=>handleDragOverStart()}
                        onDragEnd={(e: React.DragEvent<HTMLDivElement>)=>{}}
                        onDragOver={(e: React.DragEvent<HTMLDivElement>)=>{enableDropping(e)}}
                        onDrop={(e: React.DragEvent<HTMLDivElement>)=>{handleDrop(e,props.slide)}}
                        style={ dragOver ? {fontWeight: 'bold', boxShadow: '5px 5px rgb(162, 40, 243)'} : navSlideStyle}
                    >
                       <Slide slide={props.slide} idsSelectedSlides={[]} idsSelectedBlocks={[]} from="navigation"></Slide>
                    </div>
                </li>
            </button>
        </div>
    );
}

export {
    NavSlide,
}