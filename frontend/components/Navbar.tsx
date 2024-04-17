"use client"
import React, { useMemo } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
// import Cart from './Cart';
import { useAuth, useClientSide } from '@/hooks';
import { Icons } from './icons';
import UserAccountNav from './UserAccountNav';
import ChatsSheet from './ChatsSheet';
import { usePathname, useRouter } from 'next/navigation';

interface NavbarProps {

};

function Navbar({}:NavbarProps) {
    const {user} = useAuth(); 
    const {isClientSide} = useClientSide()
    const router = useRouter();
    const pathname = usePathname()
    const isUserSignedIn = useMemo(()=>!!user?.id,[user?.id])

    if((!user && pathname!="/"))
        return null 
    return (
        <div className="bg-background sticky z-50 top-0  inset-x-0 h-16 ">
           <header className='relative bg-background'>
                <MaxWidthWrapper>
                    <div className="">
                        <div className='flex h-16 items-center'>
                            {/* TODO : mobile NAV */}

                            <div className="ml-4 flex lg:ml-0 text-primary" >
                                <Link href="/">
                                    <Icons.logo className="h-10 w-10" /> 
                                </Link>
                            </div>

                          
                            <div className="ml-auto flex items-center">
                                <div className="flex flex-1 items-center justify-end space-x-6">
                                    {
                                        isUserSignedIn ? (
                                        <>
                                            <Button  variant="ghost" onClick={()=>{router.push('/trips')}}>Trip</Button>
                                            <div className='ml-4 flow-root lg:ml-6'>
                                                {/* Cart */}
                                                <ChatsSheet /> 
                                            </div>
                                            <UserAccountNav /> 
                                        </>
                                        ):(
                                        <>
                                            <Button variant={"outline"} className="border-primary hover:bg-primary hover:text-background" onClick={()=>{router.push('/auth/sign-in')}} >
                                                Sign In
                                            </Button>
                                        </>
                                        )
                                    }
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
           </header>
        </div>
    );
};

export default Navbar;