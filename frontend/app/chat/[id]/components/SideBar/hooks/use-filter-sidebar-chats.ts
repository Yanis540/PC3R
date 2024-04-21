import { useAuth } from "@/hooks";
import { getChatInformations } from "@/utils";
import { useMemo, useState } from "react";



export const useFilterSideBarChats = ()=>{
    const {user} = useAuth();

    const [searchInput,setSearchInput] = useState<string|undefined>();
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchInput(e.target.value??undefined);
        
    } 
    const filteredChats = useMemo(()=>
        searchInput == undefined 
        ? user?.chats??[]
        :   (user?.chats??[])?.filter((c)=>getChatInformations(c).name?.toLocaleLowerCase().includes(searchInput?.toLocaleLowerCase())),
        [searchInput,user?.chats]
    )

    return {
        handleChange,filteredChats
    }
}