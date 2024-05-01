import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import {toast} from "sonner"
import axios, { AxiosError, AxiosProxyConfig, AxiosRequestConfig } from "axios";
import { SERVER_URL } from "@/env";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { AddDuoChatSchema, addGroupChatSchema, AddGroupChatSchema, HTTPErrorCode } from "@/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
type DataResponse = {
    chat : Chat
}
interface useAddNewGroupChatMutation  {
    data ?: any
    isPending : boolean 
    error : unknown 
    mutate : UseMutateFunction<any, unknown,AddGroupChatSchema, unknown>
}
interface useAddNewDuoChatMutation  {
    data ?: any
    isPending : boolean 
    error : unknown 
    mutate : UseMutateFunction<any, unknown,AddDuoChatSchema, unknown>
}
export const useCreateChat = ()=>{

    const {tokens,add_chat} = useAuth()
    const router = useRouter()
     // ! Group Chat 
     const { register, handleSubmit,reset,
        formState: { errors }, } = useForm<AddGroupChatSchema>({
        resolver: zodResolver(addGroupChatSchema),
    });
    const {data:dataGroup,mutate:mutateGroup,isPending:isLoadingGroup,error:errorGroup}:useAddNewGroupChatMutation = useMutation({
        mutationKey:["chat","new","group"],
        mutationFn:async(props)=>{
            const config:AxiosRequestConfig = {
                headers:{
                    Authorization : `Bearer ${tokens?.access??" "}`
                }
            }
            const response= await axios.post(SERVER_URL+"/chat/new/group",props,config); 
            const data = await response.data ; 
            return data ; 
        },
        onSuccess : (data:DataResponse)=>{
            if(!data?.chat)
                return 
            reset()
            add_chat(data?.chat)
            router.push(`/chat/${data?.chat?.id}`)
        },
        onError:(err:any)=>{
            if(err instanceof AxiosError && err?.response?.data?.error?.message)
                toast.error(`${err.response.data.error.message}`)
            else 
                toast.error(`Unknown error occured`)
        }
    })
    const onSubmitGroup = handleSubmit((data)=>{
        // use mutate 
        mutateGroup(data)
    })
    const {data:dataDuo,mutate:mutateDuo,isPending:isLoadingDuo,error:errorDuo}:useAddNewDuoChatMutation = useMutation({
        mutationKey:["chat","new","duo"],
        mutationFn:async(props)=>{
            const config :AxiosRequestConfig = {
                headers:{
                    Authorization:`Bearer ${tokens?.access}`
                }
            }
            const response= await axios.post(SERVER_URL+"/chat/new/duo",props,config); 
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
        duo : {
            create:mutateDuo,
            data:dataDuo,isLoading:isLoadingDuo,error:errorDuo
        },
        group : {
            register,onSubmit:onSubmitGroup,
            data:dataGroup,
            isLoading:isLoadingGroup,
            errors,
            error:errorGroup
        }, 
    }
}