import { BlockType } from "../../types";

type BlockProps = {
   block: BlockType,
}

function Block(props: BlockProps) {
   const blockStyled = {
      width: props.block.width,
      heigth: props.block.heigth,

   }

   
}

export {
   Block,
}