import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import React from 'react';

interface MessageSenderProps {
    user : ChatUser
};

function MessageSender({user}:MessageSenderProps) {
    return (
    <Tooltip>
        <TooltipTrigger asChild>
            <Avatar className="w-8 h-8">
                <AvatarImage src={user?.photo??"https://github.com/shadcn.png"} alt="" />
            </Avatar>
        </TooltipTrigger>
        <TooltipContent side="top" className="border-gray-700">
            <h3 className="text-sm md:text-md font-semibold capitalize">{user?.name}</h3>
        </TooltipContent>
    </Tooltip>
 
    );
};

export default MessageSender;