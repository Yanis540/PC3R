


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import {toast} from "sonner"
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { SERVER_URL } from "@/env";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
type DataResponse = {
    users : UserDetails[], 
}
type AddChatUsersProps = {
    chat_id : string, 
    users_ids : string[] 
}
interface useAddChatUsersMutation  {
    data ?: any
    isPending : boolean 
    error : unknown 
    mutate : UseMutateFunction<any, unknown,AddChatUsersProps, unknown>
}

export const useAddChatUsers = (f?:((users: UserDetails[]) => void))=>{
   
    const router = useRouter()
    const {tokens} = useAuth()
    const {data,mutate,isPending:isLoading,error}:useAddChatUsersMutation = useMutation({
        mutationKey:["chat","add","users"],
        mutationFn:async(props)=>{
            const config :AxiosRequestConfig= {
                headers : {
                    Authorization : `Bearer ${tokens?.access??" "}`
                }
            }
            const response= await axios.post(SERVER_URL+"/chat/add/users",props,config); 
            const data = await response.data ; 
            return data ; 
        },
        onSuccess : (data:DataResponse)=>{
            toast.success("Users Added",{}); 
            if(f){
                f(data?.users!)
            }

        },
        onError:(err:any)=>{
            if(err instanceof AxiosError && err?.response?.data?.error?.message)
                toast.error(`${err.response.data.error.message}`)
            else 
                toast.error(`Unknown error occured`)
        }
    })




    return {
        data,isLoading,add:mutate,error
    }
}
