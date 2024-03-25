'use client'
import { Button } from "@/components/ui/button";
import AuthContext from "@/context/AuthContext";
import { useSocketStore } from "@/context/store";
import { useSocket } from "@/hooks";
import { useEffect } from "react";
import { useFetchTrips } from "./hooks/use-fetch-trips";

function Home() {
  const{socket} = useSocketStore()
  const {data,isLoading,error} = useFetchTrips();
  console.log(data,isLoading,error)
  useEffect(()=>{
    console.log(socket,socket?.connected)
    socket?.on('connect',(data)=>{
      console.log("Connected")
      console.log(socket.connected)
      socket.emit('helloFromClient',{Message:"HI"})
    })
    socket?.on('helloFromServer',(data)=>{
      console.log(data)
    })
    return ()=>{
      socket?.off('connect',()=>{});
      socket?.off('helloFromServer',()=>{});
    }
  },[socket])
  return (
  <div className="flex-1 flex flex-col min-h-full ">
    <div className="flex-1 min-h-full ">
        <h1 className="text-background w-full ">hello</h1>
    </div>
   </div>
  );
}

export default AuthContext(Home)