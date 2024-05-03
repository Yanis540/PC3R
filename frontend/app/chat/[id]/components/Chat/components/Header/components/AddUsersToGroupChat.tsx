import React, { useState } from 'react';
import { BiSolidPlusCircle } from "react-icons/bi";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useAddChatUsers, useSearchUser } from '@/hooks';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useChat } from '../../../hooks/use-chat';
interface AddUsersToGroupChatProps {

};

function AddUsersToGroupChat({}:AddUsersToGroupChatProps) {
    const {chat,add_users} = useChat()
    const [open, setOpen] = useState(false)

    const {add} = useAddChatUsers((users)=>{
        const filtered_users = [...users.filter((new_user)=>!(chat?.users.some((chat_user)=>chat_user.id == new_user.id)))]
        add_users(filtered_users)
    })
    const {data,name,register,setNameValue} = useSearchUser()
    const handleSelect = (user:UserDetails)=>{
        // add code 
        if(!chat?.users?.some((u)=>u.id == user.id)) 
            add({chat_id : chat?.id!,users_ids:[user?.id!]})
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div>
                    <BiSolidPlusCircle className="h-6 w-6 text-muted-foreground hover:text-primary duration-75 cursor-pointer" /> 
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add people to chat</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Command  className="rounded-lg border shadow-md w-full  ">
                        <CommandInput onValueChange={setNameValue} {...register("name")}placeholder="Type a command or search..."   />
                        <CommandList  className='max-h-[300px] overflow-y-auto scrollbar-hide '>
                            {!!name && (<CommandEmpty>No results found.</CommandEmpty>)}
                            <CommandGroup heading="Suggestions">
                            {
                                data.users.map((user)=>(
                                <CommandItem className="flex flex-row items-center gap-x-2"  key={user.id} value={user.email} onSelect={()=>{handleSelect(user)}}>
                                    <Avatar className="w-8 h-8 cursor-pointer" >
                                        <AvatarImage src={user?.photo??"https://github.com/shadcn.png"} alt="" />
                                    </Avatar>
                                    <span >{user?.name}</span>
                                </CommandItem>
                                ))
                            }
                            </CommandGroup>
                    
                        </CommandList>
                    </Command>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddUsersToGroupChat;