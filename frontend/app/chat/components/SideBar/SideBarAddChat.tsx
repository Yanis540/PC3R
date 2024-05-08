'use client'
import { ComponentProps } from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks"
import { Button } from "@/components/ui/button"


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaPlus } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AddGroupChat from "./AddGroupChat"
import AddDuoChat from "./AddDuoChat"
interface SideBarAddChatProps {

};

function SideBarAddChat({ }: SideBarAddChatProps) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex flex-col items-center" >
                    <FaPlus className="text-gray-700 hover:text-foreground transition-all duration-100 w-6 h-6 cursor-pointer" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background text-foreground w-60" align="end">
                <DropdownMenuLabel>Add Chat </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <AddGroupChat>
                    <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                        <div>
                            Group
                        </div>
                    </DropdownMenuItem>
                </AddGroupChat>
                <AddDuoChat>
                    <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                        <div>
                            Duo
                        </div>
                    </DropdownMenuItem>
                </AddDuoChat>

            </DropdownMenuContent>
        </DropdownMenu>

    )



};

export default SideBarAddChat;