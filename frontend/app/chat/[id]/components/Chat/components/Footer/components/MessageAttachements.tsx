import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    
} from "@/components/ui/tooltip"
import {
    CornerDownLeft,
    Mic,
    Paperclip,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface MessageAttachementsProps {

};

function MessageAttachements({}:MessageAttachementsProps) {
    return (
        <div className="flex items-center  pt-0">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
            
        </div>
    );
};

export default MessageAttachements;