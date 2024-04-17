import { useEffect, useState } from "react"


export const useClientSide = ()=>{
    const [isClientSide,setIsClientSide] = useState<boolean>(false);

    useEffect(()=>{
        setIsClientSide(true)
    },[])
    return {
        isClientSide
    }
}