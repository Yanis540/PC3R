import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/context/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider"
import Layout from "@/Layout";

// const inter = Inter({ subsets: ["latin"] });
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: "PC3R",
  description: "Projet PC3R pour master 1 sorbonne université parcours STL",
  keywords:[
    "STL",
    "Sorbonne",
    "Master",
    "Master 1",
    "Informatique",
    "PC3R",
    "programmation concurrente",
    "romain",
    "marwan",
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body  className={cn(
        "relative h-full font-sans antialiased",
        fontSans.variable
      )}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
