import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import React from 'react';

interface MessageContentProps {
    message : Message 
    isSender : boolean 
};

function MessageContent({message,isSender}:MessageContentProps) {
    return (
    <Tooltip>
        <TooltipTrigger asChild>
            <div className={cn(
                "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted",
                isSender && "ml-auto bg-primary text-card-foreground"
            )}>
                {message?.content} 
            </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="border-gray-700">
            <h3 className="text-sm md:text-md font-semibold capitalize">{new Date(message?.created_at).toLocaleDateString()} {" - "} { new Date(message?.created_at).toLocaleTimeString()}</h3>
        </TooltipContent>
    </Tooltip>
        
    );
};

export default MessageContent;