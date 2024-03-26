"use client"
import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
// import Cart from './Cart';
import { useAuth } from '@/hooks';
import { Icons } from './icons';
import NavItems from './NavItems';
import UserAccountNav from './UserAccountNav';

interface NavbarProps {

};

function Navbar({}:NavbarProps) {
    const {user} = useAuth(); 
    if(!user)
        return null 
    return (
        <div className="bg-foreground sticky z-50 top-0  inset-x-0 h-16 ">
           <header className='relative bg-foreground'>
                <MaxWidthWrapper>
                    <div className="border-b-[1px] border-primary">
                        <div className='flex h-16 items-center'>
                            {/* TODO : mobile NAV */}

                            <div className="ml-4 flex lg:ml-0 text-primary" >
                                <Link href="/">
                                    <Icons.logo className="h-10 w-10" /> 
                                </Link>
                            </div>

                            <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch ">
                                <NavItems /> 
                            </div>
                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                
                                    <UserAccountNav /> 
                                      
                                    {/* {user?null : <div className="flex lg:ml-6">
                                        <span  className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                    </div>} */}
                                    <div className='ml-4 flow-root lg:ml-6'>
                                        {/* Cart */}
                                        {/* <Cart />  */}
                                    </div>
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