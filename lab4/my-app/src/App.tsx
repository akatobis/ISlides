import React from 'react';
import styles from "./App.module.css";
import stylesSlide from "./components/Slide/Slide.module.css";
import {Slide} from './components/Slide/Slide';
import {ToolsPanel} from './components/ToolsPanel/ToolsPanel';
import {PresentationMaker, SlideType} from './types';
import { Navigation } from './components/Navigation/Navigation';
import {useKeyPress} from './shortcuts';

type AppProps = {
    presentationMaker: PresentationMaker,
}

function App(props: AppProps) {
    useKeyPress();

    const slides: SlideType[] = props.presentationMaker.presentation.slides

    const idsSelectedSlides = props.presentationMaker.idsSelectedSlides;
    const idCurrSlide: string = idsSelectedSlides[0]

    return (
        <div className={styles.app}>
            <ToolsPanel/>
            <div className={styles.navAndSlides}>
                <Navigation presentationMaker={props.presentationMaker}/>
                <div className={stylesSlide.workZone} id="WorkZone">
                    {slides.map(slide => {
                        if (slide.id === idCurrSlide) {
                            return <Slide
                                key={slide.id}
                                slide={slide}
                                idsSelectedSlides={props.presentationMaker.idsSelectedSlides}
                                idsSelectedBlocks={props.presentationMaker.idsSelectedBlocks}
                            />
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
