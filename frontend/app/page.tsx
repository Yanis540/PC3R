'use client'
import { useSocketStore } from "@/context/store";
import { useSocket } from "@/hooks";
import { cpSync } from "fs";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useSocket()
  const{socket} = useSocketStore()
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
   <div className="flex-1 min-h-full bg-foreground ">
      <h1 className="text-background w-full ">hello</h1>
   </div>
  );
}
