'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Icons } from "@/components/icons"

import React, { useEffect } from 'react';
import { useSignIn } from '../hooks/use-sign-in';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';

interface SignInFormProps {

};

function SignInForm({}:SignInFormProps) {

    const {onSubmit,errors,register,isLoading} = useSignIn();
    const {user} = useAuth()
    const router = useRouter()
    useEffect(()=>{
        if(user?.id){
            router.push('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user?.id])
    return (
    <div className={cn("grid gap-6")} >
        <form className="" onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                {...register("email")}
                disabled={isLoading}
              />
              {
                errors.email && (
                    <h1 className='font-medium text-red-500 text-sm my-2'>{errors?.email?.message}</h1>
                )
              }
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Password
              </Label>
              <Input
                id="password"
                placeholder="**************"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                {...register("password")}

                // disabled={isLoading}
              />
               {
                errors.password?.message && (
                    <h1 className='font-medium text-red-500 text-sm my-2'>{errors.password?.message}</h1>
                )
              }
            </div>
            <Button 
                disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ):(
                  "Sign In with Email"
              )
              }
            </Button>
          </div>
        </form>
       
      </div>
    );
};

export default SignInForm;