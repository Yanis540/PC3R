import React, { useEffect } from 'react';
import { useChat } from '../../hooks/use-chat';
import Message from './components/Message';
import { useWatchMessages } from './hooks/use-watch-messages';
import { useRegisterToChat } from './hooks/use-register-chat';

interface ChatBodyProps {

};

function ChatBody({}:ChatBodyProps) {
    const {chat} = useChat(); 
    useWatchMessages();
    useRegisterToChat(chat?.id!)
    if(!chat)
        return null; 
    if(chat?.messages.length == 0)return (
        <div className="flex-1 flex flex-col items-center  p-4  text-foreground">
            <h1 className="text-sm text-gray-700">Send or wait for someone to send a message</h1>
        </div>
    )
    return (
    <div className="flex-1 flex p-4 text-foreground border border-red-500">
        <div className="h-full w-full space-y-4 overflow-y-auto  ">
            {
                chat?.messages?.map((message,i)=>(
                    <Message key={message.id+" "+i} message={message} /> 
                ))
            }
        </div>

    </div>
    );
};
   
export default ChatBody;