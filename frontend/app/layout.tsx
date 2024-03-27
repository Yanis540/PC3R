import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/context/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

// const inter = Inter({ subsets: ["latin"] });
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: "PC3R",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={cn(
        "relative h-full font-sans antialiased",
        fontSans.variable
      )}>
        <QueryProvider>
          <main className="flex flex-col min-h-screen bg-foreground">
            <Navbar /> 
            {children}
          </main>
        </QueryProvider>
        <Toaster position="top-right" richColors /> 
      </body>
    </html>
  );
}
