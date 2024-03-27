
import { SERVER_URL } from "@/env"
import { useAuth } from "@/hooks"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { useEffect } from "react"
import { toast } from "sonner"

type DataResponse = {
    error?: HTTPError, 
    chat ? :Chat
}
interface useGetChatQuery  {
    data ?: DataResponse
    isPending : boolean 
    error : Error | null
}

export const useGetChat = (id:string)=>{
   
    const {tokens} = useAuth()
    const {data,isPending:isLoading,error}:useGetChatQuery = useQuery({
        queryKey:["chat","get"],
        queryFn:async()=>{
            const config : AxiosRequestConfig ={
                headers:{
                    "Authorization":`Bearer ${tokens?.access??""}`
                }
            } 
            const response= await axios.get(`${SERVER_URL}/chat?id=${id}`,config); 
            const data = await response.data ; 
            return data ; 
        }
    })
    useEffect(()=>{
        if(error?.message){
            if(error instanceof AxiosError && error?.response?.data?.error?.message)
                toast.error(`${error.response.data.error.message}`)
            else 
                toast.error(`${error.message}`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[error?.message])



    return {
        data,isLoading,
        error : (error as AxiosError)?.response?.data?(error as AxiosError)?.response?.data as HTTPError : error
    }
}

