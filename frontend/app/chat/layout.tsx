'use client'
import React from 'react';
import AuthContext from '@/context/AuthContext';
import SideBar from './components/SideBar/SideBar';

interface layoutProps {

};

function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-background overflow-y-hidden">
        <div className="flex-1 flex flex-row gap-x-1 h-full border-t-[1px] border-gray-700 text-background  mt-2  ">
            <SideBar /> 
            {children}
        </div>
    </div>
    );
};

export default AuthContext(layout);