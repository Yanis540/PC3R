'use client'
import React from 'react';
import { useChat } from '../../hooks/use-chat';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { IoIosInformationCircle } from "react-icons/io";
import ChatListUsers from './components/ChatListUsers';
interface ChatHeaderProps {

};

function ChatHeader({}:ChatHeaderProps) {
    const {chat} = useChat(); 
    return (
    <div className="flex-[0.1] border-b-[1px] border-gray-700">
        <div className="flex flex-row items-center justify-between px-2 py-3">
            {/* Left side */}
            <div className="flex-1 flex flex-row items-center gap-x-2 ">
                {/* TODO : modify the picture */}
                <Avatar className="w-8 h-8">
                    <AvatarImage src={chat?.photo??"https://github.com/shadcn.png"} alt="" />
                </Avatar>
                <div className="">
                    <h1 className="text-lg font-semibold text-foreground transition-all duration-75">{chat?.name}</h1>
                    <div className='flex flex-row items-center gap-x-2'>
                        <h2 className="text-md font-medium text-gray-400 ">{new Date(chat?.trip?.departure_time!).toLocaleDateString()}{" à"}</h2>
                        <div className="flex flex-row items-center gap-x-2">
                            <h6 className="font-medium text-sm md:text-md text-muted-foreground ">{new Date(chat?.trip?.departure_time!).toLocaleTimeString()} {"-"}</h6>
                            <h6 className="font-medium text-sm md:text-md text-muted-foreground ">{new Date(chat?.trip?.estimated_arrival_time!).toLocaleTimeString()}</h6>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <div className="flex flex-row items-center gap-x-2">
                <ChatListUsers /> 
                <IoIosInformationCircle className="h-8 w-8 text-muted-foreground hover:text-primary duration-75 cursor-pointer" /> 
            </div>
        </div>
    </div>
    );
};

export default ChatHeader;