import React from 'react';

interface BackgroundWrapperProps {
    children:React.ReactNode
};

function BackgroundWrapper({children}:BackgroundWrapperProps) {
    return (
    <div className="flex-grow flex-1 bg-foreground">
        {children}
      </div>
    );
};

export default BackgroundWrapper;