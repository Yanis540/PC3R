import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  user?:  User
  tokens ? : Tokens
  set_user: (user?: User) => void
  signOut: () => void
  set_tokens: (tokens?: Tokens) => void
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
                return {...prev,user:null}
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