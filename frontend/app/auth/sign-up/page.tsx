"use client";
import React from "react";
import SignUpForm from "./components/SignUpForm";
import Link from "next/link";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";

interface AuthProps {}

function Auth({}: AuthProps) {
  const router = useRouter();
  return (
    <BackgroundWrapper>
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-background  w-full ">
        <div className="lg:p-8 border-[1px] border-primary rounded-md">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <div  className='flex flex-col items-center justify-center'  >
                <Icons.logo className='h-11 w-11 text-primary cursor-pointer' onClick={()=>router.push('/')}/> 
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <SignUpForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Already have an account ?{" "}
              <Link
                href="/auth/sign-in"
                className="tracking-tight text-foreground hover:underline underline-offset-4 hover:text-muted-background"
              >
                Sign In
              </Link>
              .
            </p>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
}

export default Auth;
