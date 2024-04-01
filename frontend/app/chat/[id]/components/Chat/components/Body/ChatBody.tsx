import React from 'react';
import { useChat } from '../../hooks/use-chat';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatBodyProps {

};

function ChatBody({}:ChatBodyProps) {
    const {chat} = useChat(); 
    return (
    <div className="flex-1 flex p-4  border border-red-500 text-foreground">
        <div className="h-full  space-y-4 overflow-y-scroll scrollbar-hide">
            <div className="flex flex-row items-center gap-x-2 ">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={"https://github.com/shadcn.png"} alt="" />
                        </Avatar>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="border-gray-700">
                        <h3 className="text-sm md:text-md font-semibold ">Yanis</h3>
                    </TooltipContent>
                </Tooltip>
             
                <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
                    hello here 
                </div>
            </div>
            <div className="flex flex-row items-center gap-x-2 ">
                
             
                <div className=" flex w-full max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-card-foreground">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis unde et, voluptates libero, quo atque, beatae dolorum similique impedit qui culpa id doloremque cupiditate autem? Itaque quae quasi rerum quos ex reprehenderit culpa atque porro, pariatur quidem. Accusamus, voluptatum ex.
                </div>
            </div>
            
        </div>
    </div>
    );
};

export default ChatBody;