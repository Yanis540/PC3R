"use client"
import { useSocket } from '@/hooks';
import React from 'react';

interface SocketContextProps {
    children : React.ReactNode
};

function SocketContext({children}:SocketContextProps) {
    useSocket()
    return (
    <>
        {children}
    </>
    );
};

export default SocketContext;