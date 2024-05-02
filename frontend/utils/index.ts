import { ChatType } from "@/types"


export const getChatInformations = (chat:Chat,user?:User)=>{
    
    const chatName = 
        chat?.type != ChatType.duo
        ?   chat.name
        :   chat?.users?.find((u)=>u.id!=user?.id)
            ?.name??
            user?.name
    ;  
    
    const chatPhoto = 
        chat?.type != ChatType.duo
        ?   chat.photo
        :   chat?.users?.find((u)=>u.id!=user?.id)
            ?.photo??
            user?.photo
    ;
    
    return {photo:chatPhoto,name:chatName}
}

export const IsDuoChat = (chat:Chat,id1:string,id2:string)=>{
    const isDuoChat = 
        chat.name === `${id1}-${id2}`
        ||  chat.name === `${id2}-${id1}`
    ;
    return isDuoChat;
}