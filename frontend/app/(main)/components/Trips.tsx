"use client"
import React from 'react';
import { useFetchTrips } from '../hooks/use-fetch-trips';
import { Icons } from '@/components/icons';
import { FaArrowCircleRight } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useJoinChat } from '../hooks/use-join-chat';
import { useAuth } from '@/hooks';
import { CiCircleCheck } from "react-icons/ci";
import { cn } from '@/lib/utils';


interface TripsProps {

};

function Trips({}:TripsProps) {
    const {data,isLoading,error} = useFetchTrips();
    const {user} = useAuth();
    const IsUserInChat = (trip:Trip)=>{
        return trip?.chat?.users?.some((u)=>u.id == user?.id)
    }
    const {isLoading:isLoadingChatJoining,joinChat,joiningChatId} = useJoinChat(); 
    const redirectToChat = (trip:Trip)=>joinChat(trip)
    if(isLoading)
        return (
        <div className="flex-1 flex flex-col h-screen items-center justify-center">
            <Icons.spinner className="text-primary animate-spin" /> 
        </div>
        )
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {
            data?.trips?.map((trip)=>{
                const userInChat = IsUserInChat(trip)
                return (
                <div key={trip.id} className="flex flex-col gap-3 p-4  bg-background border-[1px] border-primary rounded-md text-foreground">
                    {/* From To  */}
                    <div className="flex flex-col w-full  ">
                        <div className="flex flex-row items-center justify-between border-b-[0.5px] border-gray-300 pb-3">
                            <h1>{trip.from}</h1>
                            <h1>{new Date(trip.departure_time).toLocaleTimeString()}</h1>
                        </div>
                        <div className="flex flex-row items-center justify-between pt-3">
                            <h1>{trip.to}</h1>
                            <h1>{new Date(trip.estimated_arrival_time).toLocaleTimeString()}</h1>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-row items-center justify-end  ">
                        <h1 className={cn("text-muted-foreground text-md pr-4",userInChat&& "text-green-500")}>{userInChat?"see conversation":"access chat"}</h1>
                        {
                            (joiningChatId == undefined ) || (joiningChatId != trip.id) ? (
                                userInChat ? (
                                    <CiCircleCheck className="cursor-pointer text-green-500" onClick={()=>{redirectToChat(trip)}} />
                                ): (
                                    <FaArrowCircleRight className="cursor-pointer" onClick={()=>{redirectToChat(trip)}} />
                                )
                            ): (
                                <Icons.spinner className="text-primary"/> 
                            )
                        }
                    </div>
                </div>
                )
            }
              
            )
        }
    </div>
    );
};

export default Trips;