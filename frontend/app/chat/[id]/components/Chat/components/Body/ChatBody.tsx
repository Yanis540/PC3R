import React, { useEffect } from 'react';
import { useChat } from '../../hooks/use-chat';
import Message from './components/Message';
import { useSocketStore } from '@/context/store';
import { useAuth, useSocket } from '@/hooks';

interface ChatBodyProps {

};

function ChatBody({}:ChatBodyProps) {
    const {chat} = useChat(); 
    const {user} = useAuth();
    const { socket } = useSocketStore()
    useSocket()
    useEffect(() => {
        console.log(socket, socket?.connected)
        socket?.on('connect', (data) => {
            console.log("Connected")
            console.log(socket.connected)
            socket?.emit('register_to_chat',{
                user_id : user?.id,
                chat_id : "clu4troqx0000113lo5g6np5k",
            })
        })
        socket?.on('registered_chat',(data)=>{
            console.log(data)
            socket.emit('send_message',{
                user_id : user?.id,
                chat_id : "clu4troqx0000113lo5g6np5k",
                content : "Hello there"
            })
        })
        socket?.on('receive_message',(data)=>{
            console.log(data)
        })
        return () => {
            socket?.off('connect', () => { });
            // socket?.off('helloFromServer', () => { });
        }
    }, [socket])
    if(!chat)
        return null; 
    if(chat?.messages.length == 0)return (
        <div className="flex-1 flex flex-col items-center  p-4  text-foreground">
            <h1 className="text-sm text-gray-700">Send or wait for someone to send a message</h1>
        </div>
    )
    return (
    <div className="flex-1 flex p-4 text-foreground">
        <div className="h-full w-full space-y-4 overflow-y-auto  ">
            {
                chat?.messages?.map((message)=>(
                    <Message key={message.id} message={message} /> 
                ))
            }
        </div>

    </div>
    );
};
   
export default ChatBody;