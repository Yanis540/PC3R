import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { useCreateChat } from "./use-create-chat";



export const useRedirectPersonnalMessage = (chatUser:ChatUser)=>{
    const {user} = useAuth();
    const router = useRouter();
    const {create,isLoading} = useCreateChat(); 
    const redirectToUserChat = ()=>{
        const chatExists = user?.chats?.find((chat)=>chat.is_group_chat == false && chat?.name.includes(chatUser?.id))
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

