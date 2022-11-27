import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import style from "./ToolsPanal.module.css"
import { changeBackgroundSlide } from "../../actions/slide";
import { dispatch } from "../../state";

function ToolsPanal() {
   const [color, setColor] = useState("#fff");

   return (
      <div>
         <button>Delete Slide</button>
         <button>Delete Block</button>
         <div className={style.changeBackgroundSlide}>
            <button onClick={() => dispatch(changeBackgroundSlide, {color: color})}>Change Background Slide</button>
            <HexColorPicker color={color} onChange={setColor} />
            <input type="file" onChange={() => dispatch(changeBackgroundSlide, {image: event.target})}></input>
         </div>
         <button>Add Image</button>
         <button>Create Text Block</button>
         <button>Change Text</button>
      </div>
   )
}

export {
   ToolsPanal,
}