import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { ChatType } from "@/types";
import { useCreateChat } from "@/hooks";



export const useRedirectPersonnalMessage = (chatUser:ChatUser)=>{
    const {user} = useAuth();
    const router = useRouter();
    const {duo:{create,isLoading}} = useCreateChat(); 
    const redirectToUserChat = ()=>{
        const chatExists = user?.chats?.find((chat)=>(chat?.type == ChatType.duo) && chat?.name.includes(chatUser?.id))
        if(chatExists){
            router.push(`/chat/${chatExists.id}`)
            return 
        }
        // add the chat 
        create({id:chatUser.id});
    }
    return {
        redirect : redirectToUserChat,
        isLoading
    }
}

