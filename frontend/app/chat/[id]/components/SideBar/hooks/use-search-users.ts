
import { SERVER_URL } from "@/env"
import { useAuth } from "@/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { useEffect } from "react"
import { useForm ,useWatch } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type DataResponse = {
    users ? :UserDetails[]
}
interface useFetchTripsMutation  {
    data ?: DataResponse
    isPending : boolean 
    error : Error | null
}

const searchUserSchema = z.object({
    name : z.string()
})
type SearchUserSchema = z.infer<typeof searchUserSchema>

const useSearchUser = ()=>{
    const {tokens} = useAuth()
    const { register,setValue,watch,getValues,control, handleSubmit,reset,
        formState: { errors }, } = useForm<SearchUserSchema>({
        resolver: zodResolver(searchUserSchema),
    });
    const name = useWatch({
        control,
        name: "name",
    });

    const {data,isPending:isLoading,error}:useFetchTripsMutation = useQuery({
        queryKey:["user","details",name],
        enabled:!!name,
        queryFn:async()=>{
            const config : AxiosRequestConfig ={
                headers:{
                    "Authorization":`Bearer ${tokens?.access??" "}`
                }
            } 
            const response= await axios.post(SERVER_URL+"/user/details",{name:name??" "},config); 
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
        data:{
            users : data?.users??[]
        },
        isLoading,error,
        register,name,
        setNameValue : (v:string)=>setValue("name",(v!=''?v:undefined) as string)
        
    }
}
export {
    useSearchUser
}
