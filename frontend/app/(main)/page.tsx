'use client'
import AuthContext from "@/context/AuthContext";
import { useSocketStore } from "@/context/store";
import { useEffect } from "react";
import { useFetchTrips } from "./hooks/use-fetch-trips";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Trips from "./components/Trips";
import { useSocket } from "@/hooks";

function Home() {
  const{socket} = useSocketStore()
  useSocket()
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
  <div className="flex-1 flex flex-col min-h-full mt-16  ">
    <div className="flex-1 min-h-full  ">
      <MaxWidthWrapper className="flex flex-col gap-y-4 ">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold  text-center w-full bg-gradient-to-r from-primary via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">SNCF&apos;s Trips Chats</h1>
        <h2 className="text-4xl font-semibold tracking-tight underline underline-offset-4 text-primary ">Current trips : </h2>
        <Trips /> 
      </MaxWidthWrapper>
    </div>
   </div>
  );
}

export default AuthContext(Home)