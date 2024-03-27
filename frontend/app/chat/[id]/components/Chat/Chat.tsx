"use client"
import { useParams } from 'next/navigation';
import React from 'react';
import { useGetChat } from './hooks/use-get-chat';

interface ChatProps {

};

function Chat({}:ChatProps) {
    const {id} = useParams(); 
    const {data,isLoading} = useGetChat(id as string);  

    return (
        <div className="">
           Chat
        </div>
    );
};

export default Chat;