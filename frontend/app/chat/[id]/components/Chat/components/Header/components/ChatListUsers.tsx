'use client'
import React from 'react';
import { LuUsers2 } from "react-icons/lu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useChat } from '../../../hooks/use-chat';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface ChatListUsersProps {

};

function ChatListUsers({ }: ChatListUsersProps) {
    const {chat} = useChat(); 
    return (
        <Sheet>
            <SheetTrigger asChild>
                <LuUsers2 className="h-8 w-8 text-muted-foreground hover:text-primary duration-75 cursor-pointer " />
            </SheetTrigger>
            <SheetContent className="flex flex-col bg-foreground text-background border-none border-0">
                <SheetHeader>
                    <SheetTitle className="text-background">Users</SheetTitle>
                    <SheetDescription>
                        
                    </SheetDescription>
                </SheetHeader>
                <div className="flex-1 flex flex-col gap-y-4 overflow-y-auto scrollbar-hide  ">
                    {
                        chat?.users?.map((user)=>(
                            <div key={user?.id} className="flex flex-row items-center gap-x-2 p-2 text-background  border-b-[1px] border-b-gray-800 hover:bg-gray-900 transition-all duration-75  rounded-sm">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={user?.photo??"https://github.com/shadcn.png"} alt="" />
                                </Avatar>
                                <h1 className="text-md font-light text-gray-400">{user?.name}</h1>
                            </div>
                        ))
                    }
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ChatListUsers;