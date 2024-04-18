'use client'
import AuthContext from "@/context/AuthContext";
import { useSocketStore } from "@/context/store";
import { useEffect } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Trips from "./components/Trips";
import { useSocket } from "@/hooks";
import BackgroundWrapper from "@/components/BackgroundWrapper";

function Home() {
  const { socket } = useSocketStore()
  useSocket()
  useEffect(() => {
    console.log(socket, socket?.connected)
    socket?.on('connect', (data) => {
      console.log("Connected")
      console.log(socket.connected)
      socket.emit('helloFromClient', { Message: "HI" })
    })
    socket?.on('helloFromServer', (data) => {
      console.log(data)
    })
    return () => {
      socket?.off('connect', () => { });
      socket?.off('helloFromServer', () => { });
    }
  }, [socket])
  return (
    <BackgroundWrapper>
      <div className="flex-1 flex flex-col min-h-full py-16  ">
        <MaxWidthWrapper className="flex flex-col gap-y-4 ">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold  text-center w-full bg-gradient-to-r from-primary via-green-500 to-green-300 inline-block text-transparent bg-clip-text">SNCF&apos;s Trips Chats</h1>
          <Trips />
        </MaxWidthWrapper>
      </div>
    </BackgroundWrapper>
  );
}

export default AuthContext(Home)