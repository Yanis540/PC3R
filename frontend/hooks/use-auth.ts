import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  user?:  User
  tokens ? : Tokens
  set_user: (user?: User) => void
  signOut: () => void
  set_tokens: (tokens?: Tokens) => void
  add_chat: (chat?: Chat) => void
}

const useAuth =  create(
    persist<AuthState>(
        (set:any,get:any)=>({
            user : undefined, 
            set_user : (user?:User)=>set((prev:AuthState)=>{
                return {...prev,user:user}
            }),
            set_tokens : (tokens?:Tokens)=>set((prev:AuthState)=>{
                return {...prev,tokens:tokens}
            }),
           
            signOut : ()=>set((prev:AuthState)=>{
                return {...prev,user:null,tokens:null}
            }),
            add_chat : (chat?:Chat)=>set((prev:AuthState)=>{
                return {...prev,user:prev.user==undefined || prev.user == null?undefined:{...prev.user,chats:[chat,...prev.user!.chats]}}
            }),
           
           
        }), 
        {
            name:"store-auth", 
            storage: createJSONStorage(()=>localStorage)
        }
    )
)



export {
    useAuth
}