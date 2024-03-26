




import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateProfileSchema, UpdateProfileSchema } from "../types";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import {toast} from "sonner"
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { SERVER_URL } from "@/env";
import { useAuth } from "@/hooks";
type DataResponse = {
    error?: HTTPError, 
    message?:string
    user? : User, 
}
interface useUpdateProfileMutation  {
    data ?: DataResponse
    isPending : boolean 
    error : unknown 
    mutate : UseMutateFunction<any, unknown,UpdateProfileSchema, unknown>
}

export const useUpdateProfile = ()=>{
    const { register, handleSubmit,reset,
        formState: { errors }, } = useForm<UpdateProfileSchema>({
        resolver: zodResolver(updateProfileSchema),
    });
    const {set_user,tokens} = useAuth()
    const {data,mutate,isPending:isLoading,error}:useUpdateProfileMutation = useMutation({
        mutationKey:["user","update"],
        mutationFn:async(props)=>{
            console.log(props)
            const config : AxiosRequestConfig = {
                headers:{
                    Authorization:`Bearer ${tokens?.access??""}`
                }
            }
            const response= await axios.put(SERVER_URL+"/user",props,config); 
            const data = await response.data ; 
            return data ; 
        },
        onSuccess : (data:DataResponse)=>{
            toast.success(data.message); 
            if(!data?.user)
                return 

            set_user(data.user!)
            reset()

        },
        onError:(err:any)=>{
            if(err instanceof AxiosError && err?.response?.data?.error?.message)
                toast.error(`${err.response.data.error.message}`)
            else 
                toast.error(`Unknown error occured`)
        }
    })
    const onSubmit = handleSubmit((data)=>{
        // use mutate 
        mutate(data)
    })



    return {
        register,onSubmit,
        data,isLoading,errors,error
    }
}