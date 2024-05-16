




import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateProfileSchema, UpdateProfileSchema } from "../types";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import {toast} from "sonner"
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { SERVER_URL } from "@/env";
import { useAuth } from "@/hooks";
import { useUploadImages } from "./use-upload-images";
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
            const config : AxiosRequestConfig = {
                headers:{
                    Authorization:`Bearer ${tokens?.access??" "}`
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
        update:mutate,
        data,isLoading,errors,error
    }
}




export const useUpadteProfilePicture = ()=>{
    const {uploadAsync,isLoading: isUploading} = useUploadImages(); 
    const {update,isLoading: isUpdating} = useUpdateProfile()
    const update_photo = async({files}:{files:FileList})=>{
        try{
            const data = await uploadAsync({files}); 
            if(!data?.url)
                return ; 
            update({
                photo: data.url,
                //! this code is taken from my projects : https://github.com/Yanis540/UBER-CLONE/blob/master/mobile/src/screen/Common/Profile/hooks/use-update-user.ts
                // {
                //     cloud:{
                //         asset_id:data.asset_id, 
                //         public_id:data.public_id, 
                //         access_mode:data.access_mode, 
                //         folder:data.folder, 
                //         resource_type:data.resource_type, 
                //         secure_url:data.secure_url, 
                //         signature:data.signature, 
                //         url:data.url, 
                //     }
                // }
            })
        }
        catch(err:any){

        }
    }
    const remove_photo = ()=>{
        update({photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"})
    }
    return {
        remove : remove_photo , 
        update:update_photo, 
        isLoading : isUploading|| isUpdating
    }
}