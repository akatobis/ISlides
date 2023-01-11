import React, {useEffect, useRef} from 'react';
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

    const [drag, setDrag] = React.useState({
        active: false,
        x: 0,
        y: 0
      });
    
      const [dims, setDims] = React.useState({
        w: 200,
        h: 200
      });
    
      const boxStyle = {
        width: `${dims.w}px`,
        height: `${dims.h}px`
      };
    
      const startResize = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setDrag({
          active: true,
          x: e.clientX,
          y: e.clientY
        });
      };
    
      const resizeFrame = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { active, x, y } = drag;
        if (active) {
          const xDiff = Math.abs(x - e.clientX);
          const yDiff = Math.abs(y - e.clientY);
          const newW = x > e.clientX ? dims.w - xDiff : dims.w + xDiff;
          const newH = y > e.clientY ? dims.h + yDiff : dims.h - yDiff;
    
          setDrag({ ...drag, x: e.clientX, y: e.clientY });
          setDims({ w: newW, h: newH });
        }
      };
    
      const stopResize = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setDrag({ ...drag, active: false });
      };

      const ref = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.app} id="main">
            <ToolsPanel idsSelectedBlocks={props.presentationMaker.idsSelectedBlocks} />
            <div className={styles.navAndSlides}>
                <Navigation workZone={ref} presentationMaker={props.presentationMaker}/>
                <div ref={ref} className={stylesSlide.workZone} id="WorkZone">
                    {slides.map(slide => {
                        if (slide.id === idCurrSlide) {
                            return <Slide
                                workZone={ref}
                                key={slide.id}
                                slide={slide}
                                idsSelectedSlides={props.presentationMaker.idsSelectedSlides}
                                idsSelectedBlocks={props.presentationMaker.idsSelectedBlocks}
                                from=""
                            />
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
