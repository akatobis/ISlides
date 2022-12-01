import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import style from "./ToolsPanal.module.css"
import { changeBackgroundSlide, deleteSlides } from "../../actions/slide";
import { dispatch } from "../../state";
import { addBlock, deleteBlocks } from "../../actions/block";
import { addNewSlide} from "../../actions/navigation/navigation";
import {FigureType} from "../../types";

function ToolsPanal() {
   const [color, setColor] = useState("#fff");

   return (
      <div>
         <button className={style.button} onClick={() => {
            dispatch(addNewSlide,'')
        }}>add slide</button>
         <button onClick={() => dispatch(deleteSlides, '')}>Delete Slide</button>
         <button onClick={() => dispatch(deleteBlocks, '')}>Delete Block</button>
         <div className={style.changeBackgroundSlide}>
            <button onClick={() => dispatch(changeBackgroundSlide, {color: color})}>Change Background Slide</button>
            <HexColorPicker color={color} onChange={(e) => setColor} />
            <input type="file" onChange={(e) => {const target  = e.target as Element; dispatch(changeBackgroundSlide, {image: target})}}></input>
         </div>
         {/* <input type="file" onChange={(e) => {const target  = e.target as Element; dispatch(addBlock, {image: target})} }>Add Image</input> */}
         <button onClick={() => dispatch(addBlock, {})}>Create Text Block</button>
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