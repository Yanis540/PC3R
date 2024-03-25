import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import {toast} from "sonner"
import axios, { AxiosError } from "axios";
import { SERVER_URL } from "@/env";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { signUpSchema, SignUpSchema } from "../types";
type DataResponse = {
    error?: HTTPError, 
    user? : User, 
    tokens ? :Tokens
}
interface useLoginMutation  {
    data ?: any
    isPending : boolean 
    error : unknown 
    mutate : UseMutateFunction<any, unknown,SignUpSchema, unknown>
}

export const useSignUp = ()=>{
    const { register, handleSubmit,reset,
        formState: { errors }, } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });
    const router = useRouter()
    const {set_user,set_tokens} = useAuth()
    const {data,mutate,isPending:isLoading,error}:useLoginMutation = useMutation({
        mutationKey:["auth","sign-up"],
        mutationFn:async(props)=>{
            const response= await axios.post(SERVER_URL+"/auth/sign-up",props); 
            const data = await response.data ; 
            return data ; 
        },
        onSuccess : (data:DataResponse)=>{
            toast.success("Signed in up! ",{}); 
            reset()
            router.push('/auth/sign-in')

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