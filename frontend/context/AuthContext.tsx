"use client"
import { useAuth } from '@/hooks';
import React, { useLayoutEffect } from 'react';
import { redirect } from "next/navigation";


function AuthContext(Component: any) {

  return function IsAuth(props: any) {
    const { user } = useAuth();
    // https://github.com/pmndrs/zustand/issues/346

    if (useAuth.persist.hasHydrated()== false)
      return null
    if (!user) {
      redirect("/auth/sign-in");
      return null;
    }

    return <Component {...props} />;
  };
  ;
};

export default AuthContext;