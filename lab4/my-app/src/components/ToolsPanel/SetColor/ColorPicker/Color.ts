type Color = {
  hex: string;
  rgb: ColorRGB;
  hsv: ColorHSV;
}

type ColorRGB = {
  r: number;
  g: number;
  b: number;
}

type ColorHSV = {
  h: number;
  s: number;
  v: number;
}

export type {
   Color,
   ColorHSV,
   ColorRGB,
}
