import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { addChangePresentationMakerHandler, getState, setState } from './state';
import { TextBlock, TypeBlock, Block, Presentation, PresentationMaker, FigureType} from './types';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const deleteTextBlock: TextBlock = {
  typeBlock: TypeBlock.text,
  innerString: "",
  isBold: false,
  isItalic: false,
  isStrikethrough: false,
  isUnderline: false,
  color: "#000",
  fontSize: 16,
  font: "Calibri",
};

const deletBlocks: Block[] = [
  {
    id: "1",
    content: deleteTextBlock,
    coordinatesX: 200,
    coordinatesY: 200,
    width: 400,
    height: 250,
  },
  {
    id: "2",
    content: deleteTextBlock,
    coordinatesX: 200,
    coordinatesY: 200,
    width: 400,
    height: 250,
  },
  {
    id: "3",
    content: deleteTextBlock,
    coordinatesX: 200,
    coordinatesY: 200,
    width: 400,
    height: 250,
  },
  {
    id: "4",
    content: deleteTextBlock,
    coordinatesX: 200,
    coordinatesY: 200,
    width: 400,
    height: 250,
  },
  {
    id: "5",
    content: deleteTextBlock,
    coordinatesX: 200,
    coordinatesY: 200,
    width: 400,
    height: 250,
  },
  {
    id: "6",
    content: deleteTextBlock,
    coordinatesX: 200,
    coordinatesY: 200,
    width: 400,
    height: 250,
  },
  {
    id: "7",
    content: deleteTextBlock,
    coordinatesX: 200,
    coordinatesY: 200,
    width: 400,
    height: 250,
  },
];

const blockWithEllipse: Block = {
  id: "8",
  content: {
      typeBlock: TypeBlock.figure,
      type: {
          figureType: FigureType.ellipse,
          rx: 10,
          ry: 10,
      },
      colorFill: "#FF0000",
      border: 30,
      colorBorder: "#000000",
  },
  coordinatesX: 200,
  coordinatesY: 200,
  width: 400,
  height: 250,
}

const blockWithRectangle: Block = {
  id: "9",
  content: {
    typeBlock: TypeBlock.figure,
    type: {
      figureType: FigureType.rectangle,
    },
    colorFill: "#FF0000",
    border: 30,
    colorBorder: "#000000",
  },
  coordinatesX: 400,
  coordinatesY: 400,
  width: 500,
  height: 800,
}

const blockWithTriangle: Block = {
  id: "10",
  content: {
    typeBlock: TypeBlock.figure,
    type: {
      figureType: FigureType.triangle,
      topX: 10,
    },
    colorFill: "#FF0000",
    border: 30,
    colorBorder: "#000000",
  },
  coordinatesX: 200,
  coordinatesY: 200,
  width: 400,
  height: 250,
}

const deletePresentation: Presentation = {
  namePresentation: 'my presentation',
  slides: [
    {
      id: "1",
      backgroundColor: "#fff",
      backgroundImage: "",
      blocks: [],
    },
    {
      id: "2",
      backgroundColor: "#222",
      backgroundImage: "",
      blocks: [blockWithEllipse],
    },
    {
      id: "3",
      backgroundColor: "#333",
      backgroundImage: "",
      blocks: [blockWithRectangle],
    },
    {
      id: "4",
      backgroundColor: "#444",
      backgroundImage: "",
      blocks: [blockWithTriangle],
    },
    {
      id: "5",
      backgroundColor: "#555",
      backgroundImage: "",
      blocks: [],
    },
    {
      id: "6",
      backgroundColor: "#666",
      backgroundImage: "",
      blocks: [],
    },
  ],
};

const deleteOpm: PresentationMaker = {
  presentation: deletePresentation,
  idsSelectedSlides: ['1'],
  idsSelectedBlocks: [],
};
/*setState(deleteOpm);*/

function render() {
  root.render(
    <React.StrictMode>
        <App presentationMaker={getState()} />
    </React.StrictMode>
  );
}

addChangePresentationMakerHandler(render)
render()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
