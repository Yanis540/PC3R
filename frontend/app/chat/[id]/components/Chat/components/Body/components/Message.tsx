import { useAuth } from '@/hooks';
import { cn } from '@/lib/utils';
import React, { useMemo } from 'react';
import MessageSender from './MessageSender';
import MessageContent from './MessageContent';

interface MessageProps {
    message : Message 
};

function Message({message}:MessageProps) {
    const {user} = useAuth(); 
    const isSender = useMemo(()=>user?.id == message?.user_id,[user?.id,message?.user_id]);
    return (
    <div className={cn("flex flex-row items-center ", "gap-x-2")}>
        {!isSender&& (
            <MessageSender user={message?.user!} /> 
        )}
        <MessageContent message={message} isSender={isSender} /> 
    </div>
    );
};

export default Message;