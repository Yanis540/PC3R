import { useSocketStore } from "@/context/store";
import { useChat } from "../../../hooks/use-chat"
import { useEffect } from "react";



export const useWatchMessages = ()=>{
    const {add_message,chat} = useChat(); 
    const {socket}= useSocketStore(); 

    useEffect(()=>{
        socket?.on('receive_message',(data:Message)=>{
            console.log("Receieved a new message on chat : ",data?.chat_id)
            if(data?.chat_id == chat?.id){
                add_message(data)
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[socket,chat?.id])
}