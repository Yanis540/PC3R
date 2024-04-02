'use client'
import AuthContext from '@/context/AuthContext';
import React, { useEffect } from 'react';
import SideBar from './components/SideBar';
import Chat from './components/Chat/Chat';
import { useSocket } from '@/hooks';
import { useSocketStore } from '@/context/store';

interface ChatPageProps {

};

function ChatPage({}:ChatPageProps) {
    const { socket } = useSocketStore()
    useSocket()
    useEffect(() => {
        socket?.on('connect', (data) => {
            console.log("Connected ", socket.connected)
          
        })
        return () => {
            socket?.off('connect', () => { });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]) 
    return (
    <div className="flex-1 flex flex-col flex-grow bg-background ">
        <div className="flex-1 flex flex-row gap-x-1 border-t-[1px] border-gray-700 text-background  mt-2  ">
            <SideBar /> 
            <Chat /> 
        </div>
    </div>
    );
};

export default AuthContext(ChatPage);