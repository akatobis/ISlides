import React, { useCallback, useMemo } from "react";

import "./ColorPicker.css";
import { Selector } from "./Selector/Selector";
import { clamp, getHueCoordinates, getSaturationCoordinates, parseColor } from "./Utils/ColorUtils";
import { hsvToRgb, rgbToHex } from "./Utils/Converters";

type ColorPickerProps = {
  color: string;
  onChange(color: string): void;
}

export const ColorPicker = (props: ColorPickerProps) => {
  const { color, onChange } = props;

  const parsedColor = useMemo(() => parseColor(color), [color]);
  const satCoords = useMemo(() => getSaturationCoordinates(parsedColor), [
    parsedColor
  ]);
  const hueCoords = useMemo(() => getHueCoordinates(parsedColor), [
    parsedColor
  ]);

  const handleHexChange = useCallback(
    (event: any) => {
      var val = event.target.value;
      if (val?.slice(0, 1) !== "#") {
        val = "#" + val;
      }
      onChange(val);
    },
    [onChange]
  );

  const handleRgbChange = useCallback(
    (component: any, value: any) => {
      const { r, g, b } = parsedColor.rgb;

      switch (component) {
        case "r":
          onChange(rgbToHex({ r: value ?? 0, g, b }));
          return;
        case "g":
          onChange(rgbToHex({ r, g: value ?? 0, b }));
          return;
        case "b":
          onChange(rgbToHex({ r, g, b: value ?? 0 }));
          return;
        default:
          return;
      }
    },
    [parsedColor, onChange]
  );

  const handleSaturationChange = useCallback(
    (event: any) => {
      const { width, height, left, top } = event.target.getBoundingClientRect();

      const x = clamp(event.clientX - left, 0, width);
      const y = clamp(event.clientY - top, 0, height);

      const s = (x / width) * 100;
      const v = 100 - (y / height) * 100;

      const rgb = hsvToRgb({ h: parsedColor?.hsv.h, s, v });

      onChange(rgbToHex(rgb));
    },
    [parsedColor, onChange]
  );

  const handleHueChange = useCallback(
    (event: any) => {
      const { width, left } = event.target.getBoundingClientRect();
      const x = clamp(event.clientX - left, 0, width);
      const h = Math.round((x / width) * 360);

      const hsv = { h, s: parsedColor?.hsv.s, v: parsedColor?.hsv.v };
      const rgb = hsvToRgb(hsv);

      onChange(rgbToHex(rgb));
    },
    [parsedColor, onChange]
  );

  return (
    <div className="cp-container">
        <Selector
          parsedColor={parsedColor}
          satCoords={satCoords}
          hueCoords={hueCoords}
          onSaturationChange={handleSaturationChange}
          onHueChange={handleHueChange}
        />

      <div className="cp-input-container">
        <div className="cp-input-group">
          <div
            className="cp-color-preview"
            style={{
              background: color
            }}
          />
          <div>
            <label className="cp-input-label" htmlFor="cp-input-hex">
              Hex
            </label>
            <input
              id="cp-input-hex"
              className="cp-hex-input"
              placeholder="Hex"
              value={parsedColor?.hex}
              onChange={handleHexChange}
            />
          </div>
        </div>

        <div className="cp-input-group">
          <div>
            <label className="cp-input-label" htmlFor="cp-input-r">
              R
            </label>
            <input
              id="cp-input-r"
              className="cp-rgb-input"
              placeholder="R"
              value={parsedColor.rgb.r}
              onChange={(event) => handleRgbChange("r", event.target.value)}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          <div>
            <label className="cp-input-label" htmlFor="cp-input-g">
              G
            </label>
            <input
              id="cp-input-g"
              className="cp-rgb-input"
              placeholder="G"
              value={parsedColor.rgb.g}
              onChange={(event) => handleRgbChange("g", event.target.value)}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          <div>
            <label className="cp-input-label" htmlFor="cp-input-b">
              B
            </label>
            <input
              id="cp-input-b"
              className="cp-rgb-input"
              placeholder="B"
              value={parsedColor.rgb.b}
              onChange={(event) => handleRgbChange("b", event.target.value)}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        </div>
      </div>
    </div>
  );
};