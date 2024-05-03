import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  chat?:  Chat
  set_chat: (chat?: Chat) => void
  add_message: (message?: Message) => void
  add_users: (users: UserDetails[]) => void
}

const useChat =  create<AuthState>(
    (set:any,get:any)=>({
        chat : undefined, 
        set_chat : (chat?:Chat)=>set((prev:AuthState)=>{
            return {...prev,chat:chat}
        }),
        add_message : (message?:Message)=>set((prev:AuthState)=>{
            if(!prev?.chat)
                return  prev
            return {...prev,chat:{...prev.chat,messages:[...prev.chat.messages,message]}}
        }),
        add_users : (users: UserDetails[])=>set((prev:AuthState)=>{
            if(!prev?.chat)
                return  prev
            return {...prev,chat:{...prev.chat,users:[...users,...prev.chat.users]}}
        }),
       
        
    }), 
        
)



export {
    useChat
}