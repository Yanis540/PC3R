"use client"
import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect } from 'react';

interface AuthContextProps {
    children: React.ReactNode
};

function AuthContext(Component:any) {
   
    return function IsAuth(props: any) {
        const {set_user,user} = useAuth(); 
        const router = useRouter()
        // useEffect(()=>{
        //     set_user(undefined)
        // },[])
        useEffect(() => {
          if (!user) {
            return router.push("/auth/sign-in");
          }
        }, [user,router]);
    
    
        if (!user) {
          return null;
        }
    
        return <Component {...props} />;
      };
    ;
};

export default AuthContext;