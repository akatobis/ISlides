import { CSSProperties } from "react";
import { deleteBlocks } from "../../../../actions/block";
import { dispatch } from "../../../../state";
import styles from "./ContextMenu.module.css";

type ContextMenuProps = {
   top: number,
   left: number,
   handleContextMenu: Function,
}

function ContextMenu(props: ContextMenuProps) {
   const position: CSSProperties = {
      position: "fixed",
      top: props.top,
      left: props.left,
   }

   return (
      <>
         <div className={styles.menuContextContainer} style={position}>
            <button className={styles.btnDelete} onClick={() => dispatch(deleteBlocks, '')} >Удалить</button>
         </div>
         <div className={styles.background} onClick={() => props.handleContextMenu()} ></div>
      </>
   )
}

export default ContextMenu;