
import { SERVER_URL } from "@/env"
import { useAuth } from "@/hooks"
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { useEffect } from "react"
import { toast } from "sonner"
import { useChat } from "./use-chat"

type DataResponse = {
    error?: HTTPError, 
    chat ? :Chat
}
interface useGetChatMutation  {
    data ?: DataResponse
    isPending : boolean 
    error : any
    mutate : UseMutateFunction<any, unknown,any, unknown>

}

export const useGetChat = (id:string)=>{
   
    const {tokens} = useAuth()
    const {set_chat} = useChat(); 
    const {data,mutate,isPending:isLoading,error}:useGetChatMutation = useMutation({
        mutationKey:["chat","get"],
        mutationFn:async()=>{
            const config : AxiosRequestConfig ={
                headers:{
                    "Authorization":`Bearer ${tokens?.access??""}`
                }
            } 
            const response= await axios.get(`${SERVER_URL}/chat?id=${id}`,config); 
            const data = await response.data ; 
            return data ; 
        },
        onError:(err)=>{
            if(err instanceof AxiosError && err?.response?.data?.error?.message)
                toast.error(`${err.response.data.error.message}`)
            else 
                toast.error(`${err.message}`)
        },
        onSuccess:(data:DataResponse)=>{
            if(!data.chat)
                return 
            set_chat(data.chat)
        }
    })
   
    useEffect(()=>{
        mutate({})
    },[mutate])



    return {
        data,isLoading,
        error : (error as AxiosError)?.response?.data?(error as AxiosError)?.response?.data as HTTPError : error
    }
}

