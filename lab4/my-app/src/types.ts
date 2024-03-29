type PresentationMaker = {
  presentation: Presentation;
  idsSelectedBlocks: string[];
  idsSelectedSlides: string[];
};

type Presentation = {
  namePresentation: string;
  slides: SlideType[];
};

type SlideType = {
  id: string;
  backgroundColor: string;
  backgroundImage: string;
  blocks: Block[];
};

type Block = {
  id: string;
  content: TextBlock | ImageType | Figure;
  coordinatesX: number;
  coordinatesY: number;
  width: number;
  height: number;
};

type TextBlock = {
  typeBlock: TypeBlock.text;
  innerString: string;
  isBold: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isUnderline: boolean;
  color: string;
  font: string;
  fontSize: number;
};

enum TextStyles {
  none,
  bold,
  italic,
  strikethrough,
  underline,
}

type ImageType = {
  typeBlock: TypeBlock.image;
  imageBase64: string;
};

type Figure = {
  typeBlock: TypeBlock.figure;
  type: Ellipse | Rectangle | Triangle;
  colorFill: string;
  border: number;
  colorBorder: string;
};

type Ellipse = {
  figureType: FigureType.ellipse;
  rx: number;
  ry: number;
};

type Rectangle = {
  figureType: FigureType.rectangle;
};

type Triangle = {
  figureType: FigureType.triangle;
  topX: number;
};

enum TypeBlock {
  image = "image",
  text = "text",
  figure = "figure",
}

enum FigureType {
  ellipse,
  rectangle,
  triangle,
}

export {
  type PresentationMaker,
  type Presentation,
  type SlideType,
  type Block,
  type TextBlock,
  type ImageType,
  type Figure,
  type Ellipse,
  type Rectangle,
  type Triangle,
  TextStyles,
  TypeBlock,
  FigureType,
};