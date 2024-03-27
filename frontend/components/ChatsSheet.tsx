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
import { useAuth } from '@/hooks';
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
            <SheetContent className="flex flex-col gap-y-2 bg-foreground border-foreground text-foregorund">
                <SheetHeader>
                    <SheetTitle className='text-background'>Your Chats</SheetTitle>
                </SheetHeader>
                <Chats /> 
             
            </SheetContent>
        </Sheet>
    );
};
function Chats(){
    const {user} = useAuth(); 
    const router = useRouter();
    const redirectToChat = (chat : Chat)=>{
        router.push(`/chat/${chat.id}`)
    } 
    if(user?.chats?.length == 0)
        return (
        <div className="flex flex-col items-center gap-y-4">
            <h1 className="text-muted-foreground text-sm ">Your chat list is empty, go get some friends ..</h1>
            <TbMoodEmpty className="text-background w-10 h-10"/>
        </div>
        )
    return (
    <div className="flex-1 flex flex-col gap-y-3 overflow-y-scroll scrollbar-hide ">
        {
            user?.chats?.map((chat)=>(
                <div key={chat?.id} onClick={()=>{redirectToChat(chat)}} className="flex flex-col p-4 cursor-pointer border-[1px] border-muted-foreground rounded-md  ">
                    <h3 className="text-sm font-medium text-background">{chat.name}
                    </h3>
                    <h6 className="text-xs font-medium text-background text-end w-full">{new Date(chat.date).toUTCString()}</h6>
                </div>
            ))
        }
        
    </div>
    )
}

export default ChatsSheet;