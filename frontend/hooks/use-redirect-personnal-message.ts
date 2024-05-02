import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { ChatType } from "@/types";
import { useCreateChat } from "@/hooks";
import { IsDuoChat } from "@/utils";



export const useRedirectPersonnalChat = ()=>{
    const {user} = useAuth();
    const router = useRouter();
    const {duo:{create,isLoading}} = useCreateChat(); 
    const redirectToUserChat = (id:string)=>{
        const chatExists = user?.chats?.find((chat)=>IsDuoChat(chat,user?.id!,id))
        if(chatExists){
            router.push(`/chat/${chatExists.id}`)
            return 
        }
        // add the chat 
        create({id:id});
    }
    return {
        redirect : redirectToUserChat,
        isLoading
    }
}

