'use client'
import AuthContext from '@/context/AuthContext';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';

interface ChatProps {

};

function Chat({}:ChatProps) {
    const {id} = useParams(); 
    console.log(id)
    return (
    <div className="flex-1 flex flex-col flex-grow bg-foreground ">
        <div className="flex-1 flex flex-row gap-x-10 text-background  mt-2 border border-red-500 ">
            <div>
                Sidebar 
                {/* TODO : mobile sidebar */}
            </div>
            <div>
                Main chat 
            </div>
        </div>
    </div>
    );
};

export default AuthContext(Chat);