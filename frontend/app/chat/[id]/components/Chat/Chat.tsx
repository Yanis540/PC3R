"use client"
import { useParams } from 'next/navigation';
import React from 'react';
import { useGetChat } from './hooks/use-get-chat';
import { Icons } from '@/components/icons';
import { CgSearchFound } from "react-icons/cg";
import { MdError } from "react-icons/md";
import { HTTPErrorCode } from '@/types';

interface ChatProps {

};

function Chat({}:ChatProps) {
    const {id} = useParams(); 
    const {data,isLoading,error} = useGetChat(id as string);  
    if(isLoading)return(
        <div className='flex-1 flex flex-col items-center justify-center text-primary border border-red-500'>
            <Icons.spinner /> 
        </div>
    )
    
    if(error || ! data)return(
        <div className="flex-1 flex flex-col items-center justify-center ">
            <div className="">
            {
                (error as HTTPError)?.error?.code == HTTPErrorCode.NOT_FOUND ? (
                    <CgSearchFound className="text-red-600 w-16 h-16 " /> 
                ): (
                    <MdError className="text-red-600 w-16 h-16 " /> 
                )
            }
            </div>
            <h3 className="text-red-500 font-medium text-lg md:text-xl">

                {(error as HTTPError)?.error?.message ??(error as Error).message}
            </h3>
        </div>
    )
    return (
    <div className="flex-1 border border-red-500">
        Chat
    </div>
    );
};

export default Chat;