"use client"
import { useAuth } from '@/hooks';
import React, { useEffect, useLayoutEffect } from 'react';
import { redirect } from "next/navigation";

interface AuthContextProps {
    children: React.ReactNode
};

function AuthContext(Component:any) {
   
    return function IsAuth(props: any) {
        const {user} = useAuth(); 
        // useEffect(()=>{
        //     set_user(undefined)
        // },[])
        useLayoutEffect(() => {
          if (!user) {
            return redirect("/auth/sign-in");
          }
        }, []);
    
        if (typeof window == "undefined")
          return null 
        if (!user) {
          return null;
        }
    
        return <Component {...props} />;
      };
    ;
};

export default AuthContext;