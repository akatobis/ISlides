import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import style from "./ToolsPanal.module.css"
import { changeBackgroundSlide, deleteSlides } from "../../actions/slide";
import { dispatch } from "../../state";
import { addBlock, changeStyleText, deleteBlocks } from "../../actions/block";
import { addNewSlide} from "../../actions/navigation/navigation";
import {FigureType} from "../../types";


function ToolsPanal() {
   const [colorBackgroundSlide, setColorBackgroundSlide] = useState("#fff");
   const [colorTextBlock, setColorTextBlock] = useState("#fff");

   return (
      <div>
         <button className={style.button} onClick={() => {
            dispatch(addNewSlide,'')
        }}>add slide</button>
         <button onClick={() => dispatch(deleteSlides, '')}>Delete Slide</button>
         <button onClick={() => dispatch(deleteBlocks, '')}>Delete Block</button>
         <div className={style.changeBackgroundSlide}>
            <button onClick={() => dispatch(changeBackgroundSlide, {color: colorBackgroundSlide})}>Change Background Slide</button>
            <HexColorPicker color={colorBackgroundSlide} onChange={setColorBackgroundSlide} />
            <input type="file" onChange={(e) => {const target  = e.target as Element; dispatch(changeBackgroundSlide, {image: target})}}></input>
         </div>
         <div className={style.changeBackgroundSlide}>
            <p>Add Image</p>
            <input type="file" onChange={(e) => {const target  = e.target as Element; dispatch(addBlock, {img: target})} }></input>
         </div>
         <button onClick={() => dispatch(addBlock, {})}>Create Text Block</button>
         <div className={style.changeBackgroundSlide}>
            <button onClick={() => dispatch(changeStyleText, {newColor: colorTextBlock})}>Change Color Text</button>
            <HexColorPicker color={colorTextBlock} onChange={setColorTextBlock} />
         </div>
         <button>Change Text</button>
          <button onClick={() => dispatch(addBlock, {figureType: FigureType.ellipse})}>Add Ellipse</button>
          <button onClick={() => dispatch(addBlock, {figureType: FigureType.triangle})}>Add Triangle</button>
          <button onClick={() => dispatch(addBlock, {figureType: FigureType.rectangle})}>Add Rectangle</button>
      </div>
   )
}

export {
   ToolsPanal,
}