"use client"
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";
import QueryProvider from "@/context/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider"
import { useWatchAuth } from '@/hooks';
interface LayoutProps {
    children : ReactNode
};

function Layout({children}:LayoutProps) {
    return (
    <>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          <QueryProvider>
            <TooltipProvider>
                <Main>
                    {children}
                </Main>
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
        <Toaster position="top-right" richColors /> 
    </>
    );
};

function Main({children}:{children:ReactNode}){
    useWatchAuth()
    return (
    <main className="flex flex-col h-screen bg-background">
        <Navbar /> 
        {children}
      </main>
    )
}

export default Layout;