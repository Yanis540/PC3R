import { useAuth } from "@/hooks"
import { useMemo } from "react"


export const useChatInformations = (chat:Chat)=>{
    const {user} = useAuth()
    const chatName = useMemo(()=>
        chat?.is_group_chat == true 
        ?   chat.name
        :   chat?.users?.find((u)=>u.id!=user?.id)
            ?.name??
            user?.name,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chat?.id,user?.id]
    )
    const chatPhoto = useMemo(()=>
        chat?.is_group_chat == true 
        ?   chat.photo
        :   chat?.users?.find((u)=>u.id!=user?.id)
            ?.photo??
            user?.photo,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chat?.id,user?.id]
    )
    return {photo:chatPhoto,name:chatName}
}