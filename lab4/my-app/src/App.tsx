import React from 'react';
import './App.css';
import { Slide } from './components/Slide/Slide'
import { ToolsPanal } from './components/ToolsPanal/ToolsPanal';
import { PresentationMaker, SlideType } from './types';

type AppProps = {
  presentationMaker: PresentationMaker,
}

function App(props: AppProps) {
  const slides: SlideType[] = props.presentationMaker.presentation.slides
  
  return (
    <div>
      <ToolsPanal />
      <div>
        {slides.map(slide => (
          <Slide key={slide.id} slide={slide} />
        ))}
      </div>
    </div>
  );
}

export default App;
