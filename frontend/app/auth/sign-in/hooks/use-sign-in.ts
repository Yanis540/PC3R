import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInSchema, signInSchema } from "../types";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import {toast} from "sonner"
import axios, { AxiosError } from "axios";
import { SERVER_URL } from "@/env";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
type DataResponse = {
    error?: HTTPError, 
    user? : User, 
    tokens ? :Tokens
}
interface useLoginMutation  {
    data ?: any
    isPending : boolean 
    error : unknown 
    mutate : UseMutateFunction<any, unknown,SignInSchema, unknown>
}

export const useSignIn = ()=>{
    const { register, handleSubmit,reset,
        formState: { errors }, } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
    });
    const router = useRouter()
    const {set_user,set_tokens} = useAuth()
    const {data,mutate,isPending:isLoading,error}:useLoginMutation = useMutation({
        mutationKey:["auth","sign-in"],
        mutationFn:async({email,password})=>{
            const response= await axios.post(SERVER_URL+"/auth/sign-in",{email,password}); 
            const data = await response.data ; 
            return data ; 
        },
        onSuccess : (data:DataResponse)=>{
            toast.success("Signed in ! ",{}); 
            set_user(data.user!)
            set_tokens(data.tokens!)
            reset()
            router.push('/')

        },
        onError:(err:any)=>{
            if(err instanceof AxiosError && err?.response?.data?.error?.message)
                toast.error(`${err.response.data.error.message}`)
            else 
                toast.error(`Unknown error occured`)
        }
    })
    const onSubmit = handleSubmit((data)=>{
        console.log(data)
        // use mutate 
        mutate(data)
    })



    return {
        register,onSubmit,
        data,isLoading,errors,error
    }
}