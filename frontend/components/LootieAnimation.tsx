'use client'
import React , {LegacyRef} from 'react';
import scrollData  from "../assets/Lootie/scroll.json"
import Lottie from "lottie-react"

interface LottieAnimationProps {
    type ?: "scroll"
    loop ? : boolean 
    ref ?: LegacyRef<HTMLDivElement> 
    className ? : string
};

function LottieAnimation({type, loop=true,ref=undefined, className=""}:LottieAnimationProps) {
    const animationData = (()=>{
        switch(type){
            case "scroll":
                return scrollData
            default :
                return scrollData
           
        }

    })() ; 

    return (
        <Lottie ref={ref} animationData={animationData} loop={loop}  className={className}/> 
    );
};

export default LottieAnimation;