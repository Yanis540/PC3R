import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import {toast} from "sonner"
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { SERVER_URL } from "@/env";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
type DataResponse = {
    error?: HTTPError, 
    chat ? : Chat
}
interface useLoginMutation  {
    data ?: DataResponse
    isPending : boolean 
    error : unknown 
    mutate : UseMutateFunction<any, unknown,Trip, unknown>
}

export const useJoinChat = ()=>{
 
    const router = useRouter()
    const [joiningChatId,setJoiningChatId] = useState<string|undefined>()
    const {user,tokens} = useAuth()
    const {data,mutate,isPending:isLoading,error}:useLoginMutation = useMutation({
        mutationKey:["chat","join","user"],
        mutationFn:async(trip)=>{
            setJoiningChatId(trip.id)
            const config :AxiosRequestConfig= {
                headers:{
                    "Authorization" : `Bearer ${tokens?.access??""}`
                }
            }
            const response= await axios.post(`${SERVER_URL}/chat/join/user?id=${trip?.chat?.id}`,{},config); 
            const data = await response.data ; 
            return data ; 
        },
        onSuccess : (data:DataResponse)=>{
            setJoiningChatId(undefined)
            toast.success("Joined the chat ! ",{}); 
            router.push(`/chat/${data?.chat?.id}`)

        },
        onError:(err:any)=>{
            setJoiningChatId(undefined)
            if(err instanceof AxiosError && err?.response?.data?.error?.message)
                toast.error(`${err.response.data.error.message}`)
            else 
                toast.error(`Unknown error occured`)
        }
    })

    const joinChat = (trip:Trip)=>{
        if(trip?.chat?.users?.some((chat_user)=>chat_user.id == user?.id)){
            router.push(`/chat/${trip?.chat?.id}`)
            return 
        }
        mutate(trip);
    }
  



    return {
        data,isLoading,error,joinChat,joiningChatId
    }
}