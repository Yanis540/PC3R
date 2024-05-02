'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import React from 'react';
import { Icons } from '@/components/icons';
import { useRedirectPersonnalChat } from '@/hooks';

interface MessageSenderProps {
    user : UserDetails
};

function MessageSender({user:chatUser}:MessageSenderProps) {
    const {redirect,isLoading} = useRedirectPersonnalChat();
    const handleClick = ()=>{
        redirect(chatUser?.id!)
    }
    return (
    <Tooltip>
        <TooltipTrigger asChild>
            <Avatar className="w-8 h-8 cursor-pointer" onClick={handleClick} >
                <AvatarImage src={chatUser?.photo??"https://github.com/shadcn.png"} alt="" />
            </Avatar>
        </TooltipTrigger>
        <TooltipContent side="top" className="border-gray-700">
            {
                isLoading ? (
                    <Icons.spinner />
                ) : (
                 <h3 className="text-sm md:text-md font-semibold capitalize">{chatUser?.name}</h3>
                )
            }
        </TooltipContent>
    </Tooltip>
 
    );
};

export default MessageSender;