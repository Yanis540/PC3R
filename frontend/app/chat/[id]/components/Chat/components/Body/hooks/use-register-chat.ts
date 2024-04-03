import { useSocketStore } from "@/context/store"
import { useSocket } from "@/hooks"
import { useEffect } from "react"


export const useRegisterToChat =(chat_id:string)=>{
    const { socket } = useSocketStore()
    useEffect(() => {
        // socket?.on('connect', (data) => {
        //     socket!.emit('register_to_chat',{
        //         chat_id : chat_id
        //     })
        // })
        socket?.on('registered_chat',(data)=>{
            console.log("Registered to chat : ",chat_id)
        })
        return () => {
            socket?.off('registered_chat', () => { });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket,chat_id]) 
}