import Socket from '@/lib/socket'
import { create } from 'zustand'

interface SocketStore {
  socket?:  Socket
  set_socket: (socket?:  Socket) => void
}

const useSocketStore =  create<SocketStore>(
    (set:any,get:any)=>({
        socket : undefined,
        set_socket : (socket?:Socket)=>set((prev:SocketStore)=>{
            return {...prev,socket:socket}
        }),
      
    }), 
)



export {
    useSocketStore
}