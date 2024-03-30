"use client"
import { useAuth } from '@/hooks';
import React, { useEffect, useLayoutEffect } from 'react';
import { redirect } from "next/navigation";


function AuthContext(Component: any) {

  return function IsAuth(props: any) {
    const { user } = useAuth();
    // https://github.com/pmndrs/zustand/issues/346
    useEffect(()=>{
      if(useAuth.persist.hasHydrated() == true && !user){
        redirect("/auth/sign-in");

      }
    },[user,useAuth.persist.hasHydrated()])
    if (useAuth.persist.hasHydrated()== false)
      return null

    return <Component {...props} />;
  };
  ;
};

export default AuthContext;