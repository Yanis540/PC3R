import { SERVER_URL } from "@/env"
import { useAuth } from "@/hooks"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { useEffect } from "react"
import { toast } from "sonner"

type DataResponse = {
    error?: HTTPError, 
    trips ? :Trip[]
}
interface useFetchTripsMutation  {
    data ?: DataResponse
    isPending : boolean 
    error : Error | null
}

export const useFetchTrips = ()=>{
   
    const {tokens} = useAuth()
    const {data,isPending:isLoading,error}:useFetchTripsMutation = useQuery({
        queryKey:["auth","sign-in"],
        queryFn:async()=>{
            const config : AxiosRequestConfig ={
                headers:{
                    "Authorization":`Bearer ${tokens?.access??" "}`
                }
            } 
            const response= await axios.get(SERVER_URL+"/trips",config); 
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
        data,isLoading,error
    }
}

