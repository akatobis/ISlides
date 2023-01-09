import {useRef, useState} from "react";
import style from './HideShowNavButton.module.css'

type HideShowNavButtonProps = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    navigation: React.RefObject<HTMLOListElement>,
}

export function HideShowNavButton (props: HideShowNavButtonProps) {

    const showButton = useRef<HTMLButtonElement>(null)
    const hideButton = useRef<HTMLButtonElement>(null)

    const[state, setState] =  useState(false)

    return (
        <div>
            {!state && <button
                ref={hideButton}
                className={style.buttonHideNav}
                onClick={()=>{

                    props.setShow(true)
                    setState(true)
                }}
            > 
            </button>}
            
            {state && <button
                ref={showButton}
                className={style.buttonShowNavCirc}
                onClick={()=>{
                    props.setShow(false)
                    setState(false)
                }}
            >
                <div className={style.buttonShowNavRect}></div>
            </button>}
        </div>
    )
}