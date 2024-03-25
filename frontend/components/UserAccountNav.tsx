'use client'
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import Link from 'next/link';
import {useAuth} from '@/hooks';

interface UserAccountNavProps {
    user: User
};

function UserAccountNav({user}:UserAccountNavProps) {
    const {signOut} = useAuth();
    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className='overflow-visible'>
            <Button variant='ghost' size='sm' className='relative text-background' >
                Account
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background w-60" align="end">
            <div className="flex items-center justify-start gap-2 p-2 ">
                <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="font-medium text-sm text-primary ">{user?.name}</p>
                </div>
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