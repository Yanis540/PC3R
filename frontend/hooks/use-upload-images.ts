import { UseMutateAsyncFunction, UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from "../env";
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
   
    const pickImages = async (files: FileList): Promise<ImagePickerAsset[] | null> => {
        const filePromises: Promise<ImagePickerAsset>[] = Array.from(files).map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve({
                        uri: reader.result as string,
                        type: file.type,
                        name: file.name
                    });
                };
                reader.onerror = () => {
                    reject(null);
                };
                reader.readAsDataURL(file);
            });
        });

        try {
            const result = await Promise.all(filePromises);
            return result;
        } catch (err) {
            return null;
        }
    };
    const {data,isPending:isLoading,error,mutate:upload,mutateAsync:uploadAsync}:useUploadImagesType  = useMutation({
        mutationKey:["upload","images"], 
        mutationFn:async({files}:{files:FileList})=>{
            const assets = await pickImages(files)
            if(!assets)
                return undefined ; 
            const formData = new FormData()
            formData.append("file",{
                uri: assets[0].uri,
                type: 'image/jpeg',
                name: assets[0].name??"random.jpeg",
            } as any ); 
            formData.append("api_key",CLOUDINARY_API_KEY as any )
            formData.append("upload_preset","dlekxljn")
           
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
            return data ; 

        }, 
        onError:(err:any)=>{
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