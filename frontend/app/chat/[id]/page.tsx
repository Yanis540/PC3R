'use client'
import AuthContext from '@/context/AuthContext';
import React, { useEffect } from 'react';
import SideBar from './components/SideBar';
import Chat from './components/Chat/Chat';

interface ChatPageProps {

};

function ChatPage({}:ChatPageProps) {
    return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-background overflow-y-hidden">
        <div className="flex-1 flex flex-row gap-x-1 h-full border-t-[1px] border-gray-700 text-background  mt-2  ">
            <SideBar /> 
            <Chat /> 
        </div>
    </div>
    );
};

export default AuthContext(ChatPage);