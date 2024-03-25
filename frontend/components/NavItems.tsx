'use client'
import React, { useEffect, useRef, useState } from 'react';
import NavItem from './NavItem';
import { useOnClickOutSide } from '@/hooks';

interface NavItemsProps {

};

function NavItems({}:NavItemsProps) {
    const [activeIndex,setActiveIndex] = useState<null | number>();
    const isAnyOpen = activeIndex !== null; 
    const navRef = useRef<HTMLDivElement|null>(null);
    useOnClickOutSide(navRef,()=>setActiveIndex(null));


    useEffect(()=>{
        const handler = (e:KeyboardEvent)=>{
            if(e.key === 'Escape')
                setActiveIndex(null);
        }

        document.addEventListener("keydown",handler);
        return ()=>{
            document.removeEventListener("keydown",handler);
        }
    },[])
    return (
        <div ref={navRef} className="flex gap-4 h-full ">
        {/* {
            PRODUCT_CATEGORIES.map((category,i)=>{
                const handleOpen = ()=>{
                    if(activeIndex === i )
                        setActiveIndex(null)
                    else setActiveIndex(i)
                }
                const isOpen = i === activeIndex; 

                return (
                    <NavItem 
                        isOpen={isOpen} handleOpen={handleOpen} 
                        category={category} key={category.value}
                        isAnyOpen={isAnyOpen}
                    />
                )
            })
        } */}
        </div>
    );
};

export default NavItems;