import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import style from "./ToolsPanal.module.css"
import { changeBackgroundSlide, deleteSlides } from "../../actions/slide";
import { dispatch } from "../../state";
import { addBlock, changeStyleText, deleteBlocks } from "../../actions/block";
import { addNewSlide} from "../../actions/navigation/navigation";
import {FigureType, TextStyles} from "../../types";
import { changeColorFigure } from "../../actions/figure/figure";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function ToolsPanal() {
   const [colorBackgroundSlide, setColorBackgroundSlide] = useState("#fff");
   const [colorTextBlock, setColorTextBlock] = useState("#fff");
   const [colorFigureFill, setColorFigureFill] = useState("#fff");
   const [colorFigureBorder, setColorFigureBorder] = useState("#000");

   const [fontSize, setFontSize] = useState('');

   const handleChangeFontSize = (event: SelectChangeEvent) => {
      setFontSize(event.target.value as string);
   };

   const [fontFamily, setFontFamily] = useState('');

   const handleChangeFontFamily = (event: SelectChangeEvent) => {
      setFontFamily(event.target.value as string);
   };

function verifyExtentionImg(file: any): boolean {
    const extensionSelectedFile = file.type.split("/").pop();
    return extensionSelectedFile === "png" || extensionSelectedFile === "jpg" || extensionSelectedFile === "jpeg" || extensionSelectedFile === "svg";
}

function donwloadImg(input: any, isSlide: boolean): any {
    const imgFile = input.files[0];

    if (!verifyExtentionImg(imgFile)) {
        return "";
    }

  const reader = new FileReader();
  reader.readAsDataURL(imgFile);
  reader.onload = () => {
    if (reader.result) {
      input.value = '';
      if (isSlide) {
         dispatch(changeBackgroundSlide, {image: reader.result.toString()});
      } else {
         dispatch(addBlock, {img: reader.result.toString()})
      }
    } else {
      console.log("Ошибка обработки файла");
    }
  };
  reader.onerror = () => {
    console.log("Ошибка открытия файла");
  };
}

   return (
      <div>
         <button className={style.button} onClick={() => {dispatch(addNewSlide,'')}}>add slide</button>

         <button onClick={() => dispatch(deleteSlides, '')}>Delete Slide</button>
         <button onClick={() => dispatch(deleteBlocks, '')}>Delete Block</button>

         <div className={style.changeBackgroundSlide}>
            <button onClick={() => dispatch(changeBackgroundSlide, {color: colorBackgroundSlide})}>Change Background Slide</button>
            <HexColorPicker color={colorBackgroundSlide} onChange={setColorBackgroundSlide} />
            <input type="file" onChange={(e) => {const target  = e.target as Element; donwloadImg(target, true)}}></input>
         </div>

         <div className={style.changeBackgroundSlide}>
            <p>Add Image</p>
            <input type="file" onChange={(e) => {const target  = e.target as Element; donwloadImg(target, false)} }></input>
         </div>

         <button onClick={() => dispatch(addBlock, {})}>Create Text Block</button>

         <div className={style.changeBackgroundSlide}>
            <button onClick={() => dispatch(changeStyleText, {newColor: colorTextBlock})}>Change Color Text</button>
            <HexColorPicker color={colorTextBlock} onChange={setColorTextBlock} />

            <button onClick={() => dispatch(changeStyleText, {newTextStyle: TextStyles.bold})}>Bold</button>
            <button onClick={() => dispatch(changeStyleText, {newTextStyle: TextStyles.italic})}>Italic</button>
            <button onClick={() => dispatch(changeStyleText, {newTextStyle: TextStyles.underline})}>Underline</button>
            <button onClick={() => dispatch(changeStyleText, {newTextStyle: TextStyles.strikethrough})}>Strikethrough</button>

            {/* material ui */}
            <Box sx={{ minWidth: 120 }}>
               <FormControl fullWidth>
               <InputLabel id="demo-simple-select-label">Font Size</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={fontSize}
                  label="Font Size"
                  onChange={handleChangeFontSize}
               >
                  <MenuItem value={14}>14</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
               </Select>
               </FormControl>
            </Box>
            {/* material ui */}
            <button onClick={() => dispatch(changeStyleText, {newFontSize: fontSize})}>Change Font Size</button>|

            {/* material ui */}
            <Box sx={{ minWidth: 220 }}>
               <FormControl fullWidth>
               <InputLabel id="demo-simple-select-label">Font Family</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={fontFamily}
                  label="Font Family"
                  onChange={handleChangeFontFamily}
               >
                  <MenuItem value={"Calibri"}>Calibri</MenuItem>
                  <MenuItem value={'Arial'}>Arial</MenuItem>
                  <MenuItem value={"Verdana"}>Verdana</MenuItem>
               </Select>
               </FormControl>
            </Box>
            {/* material ui */}
            <button onClick={() => dispatch(changeStyleText, {newFont: fontFamily})}>Change Font Size</button>|
         </div>

          <button onClick={() => dispatch(addBlock, {figureType: FigureType.ellipse})}>Add Ellipse</button>
          <button onClick={() => dispatch(addBlock, {figureType: FigureType.triangle})}>Add Triangle</button>
          <button onClick={() => dispatch(addBlock, {figureType: FigureType.rectangle})}>Add Rectangle</button>

          <HexColorPicker color={colorFigureFill} onChange={setColorFigureFill} />
          <button
              onClick={() => {dispatch(changeColorFigure, {colorFill: colorFigureFill})}}
          >Change Fill Color</button>

          <HexColorPicker color={colorFigureBorder} onChange={setColorFigureBorder} />
          <button
              onClick={() => {dispatch(changeColorFigure, {colorBorder: colorFigureBorder})}}
          >Change Border Color</button>

      </div>
   )
}

export {
   ToolsPanal,
}