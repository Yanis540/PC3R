'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { SearchInput } from '@/components/ui/input';
import { useAuth,useChatInformations } from '@/hooks';
import { cn } from '@/lib/utils';
import { getChatInformations } from '@/utils';
import { useParams, useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";

import { useFilterSideBarChats } from './hooks/use-filter-sidebar-chats';
import SideBarAddChat from './SideBarAddChat';
import Link from 'next/link';

interface SideBarProps {

};

function SideBar({}:SideBarProps) {
    const {handleChange,filteredChats} = useFilterSideBarChats();    
    
    return (
    <div className="flex-[0.3] xl:flex-[0.25] flex flex-col h-[100%] border-r-[1px] relative  border-gray-700 rounded-sm">
        <div className="flex-1 flex flex-col h-[100%] gap-y-1 py-2 px-3 text-foreground">
            <div className="flex flex-col gap-y-2 pb-2 border-b-[1px]  border-gray-800 ">
                <div className="flex flex-row items-center justify-between">
                    <h1 className='text-xl md:text-2xl font-semibold '>Discussion</h1>
                    <div className="flex flex-row items-center justify-between gap-x-2">
                        <SideBarAddChat /> 
                        <PiDotsThreeCircleFill className="text-gray-700 hover:text-foreground transition-all duration-100 w-9 h-9 cursor-pointer" />
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <SearchInput onChange={handleChange} placeholder="Search" className="h-10 w-full rounded-lg  border-gray-700 " /> 
                </div>
            </div>
            {/* Chats */}
            <div className="flex flex-col gap-y-1 overflow-y-auto  ">
                {
                    filteredChats?.map((chat)=><SidebarChat key={chat.id} chat={chat} /> )
                }
            </div>
        </div>
    </div>
    );
};

function SidebarChat({chat}:{chat:Chat}){
    const {id} = useParams(); 
    const router = useRouter()
    const {user}  = useAuth();
    const isActiveChat = (id_chat:string)=>id_chat == id
    const {name,photo} = useChatInformations(chat,user)
    return (
    <Link href={`/chat/${chat?.id}`}className={cn("flex flex-row items-center px-2 py-3 gap-x-4  border-b-[1px] border-gray-700 hover:bg-gray-900 transition-all duration-75 cursor-pointer",
        isActiveChat(chat.id) && "bg-blue-300/10"
    )}
    >
        <div>
            <Avatar className="w-8 h-8">
                <AvatarImage src={photo} alt="" />
            </Avatar>
        </div>
        <div className="flex-1 flex flex-col h-full w-full items-start justify-between ">
            <h2 className=''>{name}</h2>
            <h6 className="text-xs font-medium w-full text-muted-foreground text-end">
                {new Date(chat.date).toLocaleDateString()}{" "}
                {new Date(chat.date).toLocaleTimeString()}  
            </h6>
        </div>
    </Link>
)}

export default SideBar;