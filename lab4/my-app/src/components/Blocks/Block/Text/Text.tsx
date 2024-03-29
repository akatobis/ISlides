import { changeText } from "../../../../actions/block";
import { dispatch } from "../../../../state";
import { Block, TypeBlock } from "../../../../types"
import styles from "./Text.module.css"

type TextProps = {
    block: Block,
    idsSelectedBlocks: string[],
    pos: {x: number, y: number},
    size: {width: number, height: number},
}

function Text(props: TextProps) {
    
    let textBlockStyle = {};
    if (props.block.content.typeBlock === TypeBlock.text) {
        const textBlock = props.block.content;
        textBlockStyle = {
            width: `${props.size.width}px`,
            height: `${props.size.height}px`,
            top:`${props.pos.y}px`,
            left:`${props.pos.x}px`,
            fontFamily: textBlock.font,
            color: textBlock.color,
            fontSize: textBlock.fontSize.toString() + 'px',
        }

        if (textBlock.isBold) {
            textBlockStyle = {
                ...textBlockStyle,
                fontWeight: 700,
            }
        }
        if (textBlock.isItalic) {
            textBlockStyle = {
                ...textBlockStyle,
                fontStyle: 'italic',
            }
        }
        if (textBlock.isStrikethrough) {
            textBlockStyle = {
                ...textBlockStyle,
                textDecoration: 'line-through ' + textBlock.color,
            }
        }
        if (textBlock.isUnderline) {
            textBlockStyle = {
                ...textBlockStyle,
                textDecoration: 'underline ' + textBlock.color,
            }
        }

        if (props.block.content.innerString === '' || props.block.content.innerString === undefined) {
            textBlockStyle = {
                ...textBlockStyle,
                border: '1px solid #888',
            }
        }

        if (props.idsSelectedBlocks.includes(props.block.id)) {
            textBlockStyle = {
                ...textBlockStyle,
                //border: '1px solid #000',
            }
        }
    }

    if (props.block.content.typeBlock === TypeBlock.text) {
        return (
            <textarea
                value={props.block.content.innerString}
                className={styles.textBlock}
                style={textBlockStyle}
                onChange={(e) => dispatch(changeText, e.target.value)}
            >
            </textarea>
        );
    }
    return (<div></div>)
}

export {
    Text,
}