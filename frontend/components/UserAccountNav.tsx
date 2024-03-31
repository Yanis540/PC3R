'use client'
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import Link from 'next/link';
import {useAuth} from '@/hooks';
import UpdatePhotoDrawer from './UpdatePhotoDrawer';
import UpdateProfileInformationsDialog from './UpdateProfileInformationsDialog';

import { Avatar, AvatarImage } from './ui/avatar';
import ChatsSheet from './ChatsSheet';

interface UserAccountNavProps {
};

function UserAccountNav({}:UserAccountNavProps) {
    const {user,signOut} = useAuth();
    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className='overflow-visible'>
            <Avatar className="w-8 h-8">
                <AvatarImage src={user?.photo??"https://github.com/shadcn.png"} alt="" />
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background text-foreground w-60" align="end">
            <div className="flex flex-row items-center justify-between gap-2 p-2 ">
                <UpdateProfileInformationsDialog /> 
                <UpdatePhotoDrawer /> 
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href='/profile' className="cursor-pointer">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={signOut}>Log Out</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    );
};

export default UserAccountNav;