"use client"
import { useAuth } from '@/hooks';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { redirect } from "next/navigation";
import { useStore } from 'zustand';
import { taintUniqueValue } from 'next/dist/server/app-render/rsc/taint';


function AuthContext(Component: any) {

  return function IsAuth(props: any) {
    const [isClient, setIsClient] = useState<boolean>(false);
    const { user } = useStore(useAuth, (state) => state)

    useEffect(() => {
      setIsClient(true)
    }, [])

    if (!isClient) {
      return null
    }

    if (!user) {
      console.log(user, useAuth?.persist?.hasHydrated())
      if (useAuth?.persist?.hasHydrated()) {
        redirect("/auth/sign-in");
        return null;
      }
      else
        return null
    }
    return <Component {...props} />;
  };
  ;
};

export default AuthContext;