import { useState } from "react";
import style from './HideShowNavButton.module.css'

export function HideShowNavButton () {
    const[state, setState] =  useState(false)

    return (
        <div>
            {!state && <button 
                className={style.buttonHideNav}
                onClick={()=>setState(true)}
            > 
            </button>}
            
            {state && <button 
                className={style.buttonShowNav}
                onClick={()=>setState(false)}
            >
            </button>}
        </div>
    )
}