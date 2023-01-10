import {useEffect} from 'react'

type useAnimationsProps = {
    navigation: React.RefObject<HTMLOListElement>,
    hideButtonRef: React.RefObject<HTMLButtonElement>,
    showButtonRef: React.RefObject<HTMLButtonElement>,
}

function useAnimations(props: useAnimationsProps) {
    let start = Date.now();

    let timer = setInterval(function() {
        let timePassed = Date.now() - start;

        if (timePassed >= 2000) {
            clearInterval(timer);
            return;
        }
        draw(timePassed);

    }, 20);

    function draw(timePassed: number) {
        props.navigation.current!.style.left = timePassed / 5 + 'px';
    }

    useEffect(()=>{

    },[])

}

export default useAnimations;