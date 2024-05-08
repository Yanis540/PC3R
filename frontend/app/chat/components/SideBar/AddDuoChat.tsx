'use client'
import React, { ReactNode } from 'react';
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
import { useSearchUser } from '@/hooks';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useCreateChat, useRedirectPersonnalChat } from '@/hooks';
interface AddDuoChatProps {
    children: ReactNode
};

function AddDuoChat({ children }: AddDuoChatProps) {
    const {data,name,register,setNameValue} = useSearchUser()
    const {redirect} = useRedirectPersonnalChat();
    const handleSelect = (user:UserDetails)=>{
        redirect(user?.id)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add A Duo Chat</DialogTitle>
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

export default AddDuoChat;