import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TbMoodEmpty } from "react-icons/tb";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth, useChatInformations } from '@/hooks';
import Image from 'next/image';
import { CiChat1 } from "react-icons/ci";
import { useRouter } from 'next/navigation';

interface ChatsSheetProps {

};

function ChatsSheet({ }: ChatsSheetProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button  className="bg-transparent!important hover:bg-transparent border-none outline-none  text-background cursor-pointer"><CiChat1 className="w-8 h-8 text-primary"/></Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-y-2 bg-background border-background text-foreground border-none border-0">
                <SheetHeader>
                    <SheetTitle className='text-foreground'>Your Chats</SheetTitle>
                </SheetHeader>
                <Chats /> 
             
            </SheetContent>
        </Sheet>
    );
};
function Chats(){
    const {user} = useAuth(); 
    
    if(user?.chats?.length == 0)
        return (
        <div className="flex flex-col items-center gap-y-4">
            <h1 className="text-muted-foreground text-sm ">Your chat list is empty, go get some friends ..</h1>
            <TbMoodEmpty className="text-foreground w-10 h-10"/>
        </div>
        )
    return (
    <div className="flex-1 flex flex-col gap-y-3 overflow-y-scroll scrollbar-hide ">
        {
            user?.chats?.map((chat)=>(
             <ChatComponent key={chat?.id} chat={chat} /> 
            ))
        }
    </div>
    )
}

function ChatComponent({chat}:{chat:Chat}){
    const router = useRouter();
    const redirectToChat = (chat : Chat)=>{
        router.push(`/chat/${chat.id}`)
    } 
    const {user} = useAuth();
    const {name} = useChatInformations(chat,user)
    return (
    <div key={chat?.id} onClick={()=>{redirectToChat(chat)}} className="flex flex-col p-4 cursor-pointer border-[1px] border-muted-foreground rounded-md  ">
        <h3 className="text-sm font-medium text-foreground">{name}
        </h3>
        <h6 className="text-xs font-medium text-foreground text-end w-full">{new Date(chat.date).toUTCString()}</h6>
    </div>
    )
}

export default ChatsSheet;