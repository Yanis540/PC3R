"use client"
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useGetChat } from './hooks/use-get-chat';
import { Icons } from '@/components/icons';
import { CgSearchFound } from "react-icons/cg";
import { MdError } from "react-icons/md";
import { HTTPErrorCode } from '@/types';
import ChatHeader from './components/Header/ChatHeader';
import ChatBody from './components/Body/ChatBody';
import ChatFooter from './components/Footer/ChatFooter';
import AuthContext from '@/context/AuthContext';
import { useConnectSocket } from './hooks/use-connect-socket';
import { useSocketStore } from '@/context/store';
import { useChat } from './hooks/use-chat';

interface ChatProps {

};

function Chat({}:ChatProps) {
    const {id} = useParams(); 
    const {data,isLoading,error} = useGetChat(id as string);
   

    if(isLoading)return(
        <div className='flex-1 flex flex-col items-center justify-center text-primary '>
            <Icons.spinner /> 
        </div>
    )
    if(error || !isLoading && data == undefined)return(
        <div className="flex-1 flex flex-col items-center justify-center ">
            <div className="">
            {
                (error)?.error?.code == HTTPErrorCode.NOT_FOUND ? (
                    <CgSearchFound className="text-red-600 w-16 h-16 " /> 
                ): (
                    <MdError className="text-red-600 w-16 h-16 " /> 
                )
            }
            </div>
            <h3 className="text-red-500 font-medium text-lg md:text-xl">
                {error?.error?.message ??error?.message}
            </h3>
        </div>
    )
    return <MainChat />
   
};
function MainChat(){
    const {socket} = useSocketStore();  
    const {chat} = useChat()
    useConnectSocket(()=>{
        socket?.emit("register_to_chat",{
            chat_id : chat?.id
        })
    })
    return (
        <div className="flex-1 flex flex-col  h-[100%] relative ">
            <ChatHeader /> 
            <ChatBody /> 
            <ChatFooter /> 
        </div>
    );
}

export default Chat;