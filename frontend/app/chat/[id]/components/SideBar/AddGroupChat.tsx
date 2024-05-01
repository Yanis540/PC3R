import React, { ReactNode } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateChat } from '@/hooks';

interface AddGroupChatProps {
    children: ReactNode
};

function AddGroupChat({ children }: AddGroupChatProps) {
    const {
        group:{
            onSubmit,register,
            errors,isLoading
        }
    } = useCreateChat();
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add A group Chat</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="grid gap-4 py-4">
                    <div  className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="Dectator"
                            {...register("name")}
                            className="col-span-3"
                        />
                        {errors.name && (
                        <h1 className="font-medium text-red-500 text-sm my-2">
                            {errors?.name?.message}
                        </h1>
                        )}
                    </div>
                    <DialogFooter className="flex flex-col items-center justify-end w-full ">
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
             
            </DialogContent>
        </Dialog>
    );
};

export default AddGroupChat;