'use client'
import React from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth, useUpdateProfile } from '@/hooks';
import { Icons } from './icons';
interface UpdateProfileInformationsDialogProps {

};
function UpdateProfileInformationsDialog({ }: UpdateProfileInformationsDialogProps) {
    const {user} = useAuth();
    const {onSubmit,errors,register,isLoading} =useUpdateProfile()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex flex-col space-y-0.5 leading-none cursor-pointer">
                    <p className="font-medium text-sm text-foreground ">{user?.name}</p>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-foreground border-muted-foreground">
                <DialogHeader>
                    <DialogTitle className="text-background">Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right text-muted-foreground">
                            Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="john doe"
                            defaultValue={user?.name}
                            className="col-span-3"
                            {...register("name")}
                            disabled={isLoading}
                        />
                        {
                            errors.name && (
                                <h1 className='font-medium text-red-500 text-sm my-2 col-span-4'>{errors?.name?.message}</h1>
                            )
                        }
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right text-muted-foreground">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="**************"
                            type="password"
                            className="col-span-3"
                            {...register("password")}
                            disabled={isLoading}
                        />
                        {
                            errors.password && (
                                <h1 className='font-medium text-red-500 text-sm my-2 col-span-4'>{errors?.password?.message}</h1>
                            )
                        }
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="confirmPassword" className="text-right text-muted-foreground">
                            Confirm Password
                        </Label>
                        <Input
                            id="confirmPassword"
                            placeholder="**************"
                            type="password"
                            className="col-span-3"
                            {...register("confirmPassword")}
                            disabled={isLoading}
                        />
                        {
                            errors.confirmPassword && (
                                <h1 className='font-medium text-red-500 text-sm my-2 col-span-4'>{errors?.confirmPassword?.message}</h1>
                            )
                        }
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {
                                isLoading?(
                                    <Icons.spinner className='text-foreground' /> 
                                ):(
                                    "Update"
                                )
                            }
                        </Button>
                    </DialogFooter>
                </form>
             
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileInformationsDialog;