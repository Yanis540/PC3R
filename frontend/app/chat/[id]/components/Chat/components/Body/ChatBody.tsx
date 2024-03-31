import React from 'react';
import { useChat } from '../../hooks/use-chat';

interface ChatBodyProps {

};

function ChatBody({}:ChatBodyProps) {
    const {chat} = useChat(); 
    return (
    <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide border border-red-500">
        <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted text-card-foreground">hello here </div>
        <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-card-foreground">hello here</div>
    </div>
    );
};

export default ChatBody;