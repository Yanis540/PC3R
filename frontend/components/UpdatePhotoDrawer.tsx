import React from 'react';


import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from './ui/button';
import { useAuth } from '@/hooks';
interface UpdatePhotoDrawerProps {
};
function UpdatePhotoDrawer({}:UpdatePhotoDrawerProps) {
    const {user } = useAuth()
    return (
    <Drawer >
        <DrawerTrigger asChild>
          <Avatar className="w-10 h-10">
                <AvatarImage src={user?.photo??"https://github.com/shadcn.png"} alt="profile" />
                <AvatarFallback>{user?.name}</AvatarFallback>
            </Avatar>
        </DrawerTrigger>
        <DrawerContent className="bg-background border-background">
            <div className="mx-auto w-full max-w-sm">
                <DrawerHeader className="flex flex-col items-center ">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={user?.photo??"https://github.com/shadcn.png"} alt="profile" />
                        <AvatarFallback>{user?.name}</AvatarFallback>
                    </Avatar>
                    <DrawerDescription>update your picture.</DrawerDescription>
                    
                </DrawerHeader>
                <div className="p-4 pb-0">
                    <div className="flex items-center justify-center space-x-2">
                
                    </div>
                    <div className="mt-3 h-[120px]">

                    </div>
                </div>
                <DrawerFooter className='flex flex-row items-center justify-between '>
                    <DrawerClose asChild>
                        <Button variant="destructive">Cancel</Button>
                    </DrawerClose>
                    <Button>Update</Button>

                </DrawerFooter>
            </div>
        </DrawerContent>
      </Drawer>
    );
};

export default UpdatePhotoDrawer;