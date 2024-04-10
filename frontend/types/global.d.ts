import { ChatType, HTTPErrorCode } from "."



declare global {
    interface User {
        id: spectring 
        name: string 
        email: string 
        photo : string 
        createdAt ?: string 
        updatedAt ?: string
        chats : Chat []
    }
    type ChatUser = Omit<User, "createdAt"|"updatedAt"|"chats">
    type EmitEvent = "helloFromClient"|"register_to_chat"|"send_message"
    type ReceiveEvent = "helloFromServer"|"registered_chat"|"receive_message"|"disconnect"|"connect"
    interface Trip {
        id : string 
        from : string 
        to : string 
        departure_time : Date 
        estimated_arrival_time : Date 
        chat_id : string 
        chat : Chat 
    }
    interface Chat {
        id :string
        date : Date 
        name : string 
        photo : string 
        trip : Trip  
        type : ChatType
        users : ChatUser[]
        messages : Message[]

    }
    
    interface Message {
        id : string 
        content : string 
        created_at : Date
        chat_id : string 
        chat : Chat  
        user_id : string
        user : ChatUser
    }
    interface Tokens {
        access : string
    }
    interface HTTPError {
        error :{
            message : string 
            code : HTTPErrorCode 
        }

        }
   
}

export {}