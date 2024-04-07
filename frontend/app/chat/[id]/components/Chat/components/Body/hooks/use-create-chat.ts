import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import {toast} from "sonner"
import axios, { AxiosError, AxiosProxyConfig, AxiosRequestConfig } from "axios";
import { SERVER_URL } from "@/env";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { HTTPErrorCode } from "@/types";
type DataResponse = {
    chat? : Chat, 
}
interface useLoginMutation  {
    data ?: DataResponse
    isPending : boolean 
    error : unknown 
    mutate : UseMutateFunction<any, unknown,{id:string}, unknown>
}

export const useCreateChat = ()=>{

    const {tokens,add_chat} = useAuth()
    const router = useRouter()
    const {data,mutate,isPending:isLoading,error}:useLoginMutation = useMutation({
        mutationKey:["chat","new"],
        mutationFn:async(props)=>{
            const config :AxiosRequestConfig = {
                headers:{
                    Authorization:`Bearer ${tokens?.access}`
                }
            }
            const response= await axios.post(SERVER_URL+"/chat/new",props,config); 
            const data = await response.data ; 
            return data ; 
        },
        onSuccess : (data:DataResponse)=>{
            add_chat(data.chat!);
            router.push(`/chat/${data?.chat?.id}`)
        },
        onError:(err:any)=>{
            if(err instanceof AxiosError && err?.response?.data?.error?.message){
                if(err?.response?.data?.error?.code == HTTPErrorCode.CHAT_ALREADY_EXISTS){
                    const id = (err?.response?.data?.error?.message as string).split(':')[1]
                    router.push(`/chat/${id}`)
                }
                else 
                    toast.error(`${err.response.data.error.message}`)
            }
            else 
                toast.error(`Unknown error occured`)
        }
    })
   



    return {
        create:mutate,
        data,isLoading,error
    }
}