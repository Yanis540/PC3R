import { cn } from '@/lib/utils';
import React from 'react';

interface BackgroundWrapperProps {
    children:React.ReactNode
    className ?: string 
};

function BackgroundWrapper({children,className}:BackgroundWrapperProps) {
    return (
    <div className={cn("flex-grow flex-1 bg-background",className)}>
        {children}
      </div>
    );
};

export default BackgroundWrapper;