import { useSocketStore } from "@/context/store"
import { useSocket } from "@/hooks"
import { useEffect } from "react"


export const useConnectSocket =(f ?: ()=>void)=>{
    const { socket } = useSocketStore()
    useSocket()
    useEffect(() => {
        socket?.on('connect', (data) => {
            console.log("Connected ", socket.connected)
            if (f) {
                f()
            }
        })
        return () => {
            socket?.off('connect', () => { });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]) 
}