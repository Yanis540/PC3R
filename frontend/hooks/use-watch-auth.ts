



import { SERVER_URL } from "@/env"
import { useAuth } from "@/hooks"
import { HTTPErrorCode } from "@/types"
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { useEffect, useMemo } from "react"
import { toast } from "sonner"

type DataResponse = {
    error?: HTTPError, 
    user ? :User
}
interface useWatchAuthMutation  {
    data ?: DataResponse
    isPending : boolean 
    error : any

}

export const useWatchAuth = ()=>{
    const {user,signOut,tokens,set_user} = useAuth()
    const {data,isPending:isLoading,error}:useWatchAuthMutation = useQuery({
        queryKey:["auth","me"],
        enabled : !! user,
        queryFn:async()=>{
            const config : AxiosRequestConfig ={
                headers:{
                    "Authorization":`Bearer ${tokens?.access??" "}`
                }
            } 
            const response= await axios.get(`${SERVER_URL}/auth/me`,config); 
            const data = await response.data ; 
            return data ; 
        },
        refetchInterval:5*60*1000

    })
   
    useEffect(()=>{
        if(!error || !user?.id)
            return 
        if(error instanceof AxiosError && (error?.response?.data?.error?.code as HTTPErrorCode) == HTTPErrorCode.INVALID_TOKEN ){
            if(user?.id||tokens){
                toast.error(`Invalid session`)
                signOut();
            }
        }
        else 
            toast.error(`${error?.message}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[error,user?.id])
    // ! Might cause an error ???? 
    useEffect(()=>{
        if(data?.user){
            console.log(data.user)
            set_user(data?.user)
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data?.user])



    return {
        data,isLoading,
        error : (error as AxiosError)?.response?.data?(error as AxiosError)?.response?.data as HTTPError : error
    }
}

