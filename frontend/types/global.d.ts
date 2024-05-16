import { ChatType, HTTPErrorCode } from "."



declare global {
    interface User {
        id: string 
        name: string 
        email: string 
        photo : string 
        createdAt ?: string 
        updatedAt ?: string
        chats : Chat []
    }
    type UserDetails = Omit<User, "createdAt"|"updatedAt"|"chats">
    type EmitEvent = "helloFromClient"|"register_to_chat"|"unregister_from_chat"|"send_message"
    type ReceiveEvent = "helloFromServer"|"registered_chat"|"unregistred_from_chat"|"receive_message"|"disconnect"|"connect"
    interface Trip {
        id : string 
        from : string 
        to : string 
        departure_time : Date 
        estimated_arrival_time : Date 
        chat_id : string 
        chat : Chat 
    }
    type CloudPhotoDetails = {
        access_mode  : string 
        asset_id : string 
        public_id : string   
        bytes : number 
        created_at : string 
        etag : string 
        folder : string 
        format : string 
        height : number 
        original_extension : string 
        original_filename : string 
        placeholder : boolean  
        resource_type : string   
        secure_url : string   
        signature : string   
        tags : any[]   
        url : string  
        version : number  
        version_id : string  
        width : number  
    }
    interface Chat {
        id :string
        date : Date 
        name : string 
        photo : string 
        trip : Trip  
        type : ChatType
        users : UserDetails[]
        messages : Message[]

    }
    
    interface Message {
        id : string 
        content : string 
        created_at : Date
        chat_id : string 
        chat : Chat  
        user_id : string
        user : UserDetails
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