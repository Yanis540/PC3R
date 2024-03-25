


declare global {
    interface User {
        id: String 
        name: String 
        email: String 
        photo ?: String 
        createdAt ?: String 
        updatedAt ?: String
        chats : Chat []
    }
    type ChatUser = Omit<User, "createdAt"|"updatedAt"|"chats">
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
        name : Date 
        trip : Trip  
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
        error : {
            message : string 
            code : string 
        }
    }
}

export {}