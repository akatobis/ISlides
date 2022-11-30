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
  blocks: BlockType[];
};

type BlockType = {
  id: string;
  content: TextBlock | Image | Figure;
  coordinatesX: number;
  coordinatesY: number;
  width: number;
  heigth: number;
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

type Image = {
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
  type BlockType,
  type TextBlock,
  type Image,
  type Figure,
  type Ellipse,
  type Rectangle,
  type Triangle,
  TypeBlock,
  FigureType,
};