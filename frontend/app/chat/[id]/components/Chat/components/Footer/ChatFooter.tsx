
import React from 'react';
import { Badge } from "@/components/ui/badge"
import {
    CornerDownLeft,
    Mic,
    Paperclip,
} from "lucide-react"
import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"

import MessageAttachements from './components/MessageAttachements';
import { FaArrowRight } from "react-icons/fa";
import { Input } from '@/components/ui/input';

interface ChatFooterProps {

};

function ChatFooter({ }: ChatFooterProps) {
    const handleSubmit = (e:any)=>{
        e.preventDefault();
    }
    return (
        <div className="relative flex flex-col rounded-xl p-2  ">
            <div className="flex-1 " />
                <form onSubmit={handleSubmit}className="flex flex-row items-center justify-between relative overflow-hidden bg-background  rounded-lg border-[1px] border-gray-600 ">
                    <MessageAttachements /> 
                    <div className="flex-1 ">
                        <Label htmlFor="message" className="sr-only">
                            Message
                        </Label>
                        <Input
                            id="message"
                            placeholder="Type your message here..."
                            className="h-full bg-background resize-none border-none border-0  shadow-none focus-visible:ring-0"
                        />
                    </div>
                    <div>
                        <Button type="submit" size="sm" className="ml-auto gap-1.5 bg-transparent border-0 border-none ">
                            <FaArrowRight className="text-primary hover:bg-transparent "  />
                        </Button>
                    </div>
                </form>
        </div>
    );
};

export default ChatFooter;