"use client"
import React, { useEffect } from 'react';
import SignInForm from './components/SignInForm';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import BackgroundWrapper from '@/components/BackgroundWrapper';

interface AuthProps {

};

function Auth({ }: AuthProps) {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user?.id) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])
  if (user)
    return null
  return (
    <BackgroundWrapper>
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-foreground w-full ">
        <div className="lg:p-8 border-[1px] border-primary rounded-md">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-background">
                Sign In
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and sign in to your account
              </p>
            </div>
            <SignInForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Don&apos;t have an account ? {" "}
              <Link
                href="/auth/sign-up"
                className="tracking-tight text-background hover:underline underline-offset-4 hover:text-muted-background"
              >
                Register
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </BackgroundWrapper>

  );
};

export default Auth;