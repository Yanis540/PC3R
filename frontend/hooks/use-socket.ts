import { useEffect } from "react";
import { useSocketStore } from "@/context/store/use-socket-store";
import Socket from "@/lib/socket";
import { useAuth } from "./use-auth";



const useSocket = ()=>{
    const {socket,set_socket}= useSocketStore(); 
    const {tokens} = useAuth();
    useEffect(()=>{
        if(socket)
            return ; 
        console.log("Creating new socket conenction")
        const newSocket = new Socket(tokens?.access!);
        if(!newSocket)
            return ; 
        // newSocket.userId=user.id;
        set_socket(newSocket)
        return ()=>{
            newSocket.close();
            console.log("closing connection") 
            set_socket(undefined)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[tokens?.access])
}

export {
    useSocket
}