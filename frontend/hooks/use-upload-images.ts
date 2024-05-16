import { UseMutateAsyncFunction, UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_PRESET } from "../env";
import { toast } from "sonner";
const page_size = 10 ; 



type DataResponse =CloudPhotoDetails

interface  useUploadImagesType {
    error: unknown 
    data ?: DataResponse    
    isPending : boolean
    mutate:UseMutateFunction<any, unknown, {files:FileList}, unknown>
    mutateAsync:UseMutateAsyncFunction<DataResponse, unknown, {files:FileList}, unknown>
}

interface ImagePickerAsset {
    uri: string;
    type: string;
    name: string;
}

const useUploadImages = (selectLimit?:number)=>{
   
    
    const {data,isPending:isLoading,error,mutate:upload,mutateAsync:uploadAsync}:useUploadImagesType  = useMutation({
        mutationKey:["upload","images"], 
        mutationFn:async({files}:{files:FileList})=>{
            const formData = new FormData()
            formData.append("file",files[0] ); 
            formData.append("api_key",CLOUDINARY_API_KEY as any )
            formData.append("upload_preset",CLOUDINARY_PRESET as any)
           
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData , 
            {
                headers:{
                    'X-Requested-With': 'XMLHttpRequest', 
                    'Content-Type': 'multipart/form-data', 
                }
            } )
            const data = await response.data;
            return data ; 
        },
        onSuccess:(data)=>{
            if(!data)
                return ;
            toast.success("uploaded image correctly")
            return data ; 

        }, 
        onError:(err:any)=>{
            console.log(err)
            toast.error("Could not upload image")
        }
    }); 

    return {
        data:data,
        upload  ,
        uploadAsync, 
        isLoading,
        error
    }
}

export {
    useUploadImages
}