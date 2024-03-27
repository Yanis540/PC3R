"use client"
import { useAuth } from '@/hooks';
import React, { useLayoutEffect } from 'react';
import { redirect } from "next/navigation";


function AuthContext(Component: any) {

  return function IsAuth(props: any) {
    const { user } = useAuth();
    useLayoutEffect(() => {
      if (!user) {
        return redirect("/auth/sign-in");
      }
    }, [user]);

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