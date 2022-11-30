import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import style from "./ToolsPanal.module.css"
import { changeBackgroundSlide, deleteSlides } from "../../actions/slide";
import { dispatch } from "../../state";
import { addBlock } from "../../actions/block";

function ToolsPanal() {
   const [color, setColor] = useState("#fff");

   return (
      <div>
         <button onClick={() => dispatch(deleteSlides, '')}>Delete Slide</button>
         <button>Delete Block</button>
         <div className={style.changeBackgroundSlide}>
            <button onClick={() => dispatch(changeBackgroundSlide, {color: color})}>Change Background Slide</button>
            <HexColorPicker color={color} onChange={setColor} />
            <input type="file" onChange={(e) => {const target  = e.target as Element; dispatch(changeBackgroundSlide, {image: target})}}></input>
         </div>
         {/* <input type="file" onChange={(e) => {const target  = e.target as Element; dispatch(addBlock, {image: target})} }>Add Image</input> */}
         <button>Create Text Block</button>
         <button>Change Text</button>
      </div>
   )
}

export {
   ToolsPanal,
}