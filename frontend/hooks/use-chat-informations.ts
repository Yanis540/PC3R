import { ChatType } from "@/types"
import { useMemo } from "react"


export const useChatInformations = (chat:Chat,user?:User)=>{
    const chatName = useMemo(()=>
        chat?.type != ChatType.duo
        ?   chat.name
        :   chat?.users?.find((u)=>u.id!=user?.id)
            ?.name??
            user?.name,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chat?.id,user?.id]
    )
    const chatPhoto = useMemo(()=>
        chat?.type != ChatType.duo
        ?   chat.photo
        :   chat?.users?.find((u)=>u.id!=user?.id)
            ?.photo??
            user?.photo,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [chat?.id,user?.id]
    )
    return {photo:chatPhoto,name:chatName}
}