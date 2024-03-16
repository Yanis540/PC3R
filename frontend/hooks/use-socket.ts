import { useEffect } from "react";
import { useSocketStore } from "@/context/store/use-socket-store";
import Socket from "@/lib/socket";



const useSocket = ()=>{
    const {socket,set_socket}= useSocketStore(); 

    useEffect(()=>{
        if(socket)
            return ; 
        const newSocket = new Socket();
        if(!newSocket)
            return ; 
        // newSocket.userId=user.id;
        set_socket(newSocket)
        return ()=>{
            newSocket.close(); 
            set_socket(undefined)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[set_socket])
}

export {
    useSocket
}