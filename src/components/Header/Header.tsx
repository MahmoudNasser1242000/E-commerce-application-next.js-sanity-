"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

// shadcn/ui components
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import ModeToggle from "./DarkModeToggle";
import { navLinks } from "@/constants/navLinks"
import { INavLinks } from "@/types";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
    const [open, setOpen] = useState<boolean>(false);
    const { theme, resolvedTheme } = useTheme();
    const [themes, setTheme] = useState<string>(""); //resolvedTheme
    const { user } = useUser()

    useEffect(() => {
        if (resolvedTheme === "dark") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }, [resolvedTheme]);

    return (
        <nav className="border-b fixed left-0 right-0 bg-white dark:bg-black py-1 nav z-1000">
            <div className="mx-auto flex justify-between h-16 max-w-screen-xl items-center px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 focus:ring-0">
                    <Image
                        src={`/images/${themes === "dark" ? "logo-dark.svg" : "logo.svg"}`}
                        alt="Logo"
                        width={50}
                        height={50}
                        className="object-contain"
                    />
                    <span className="text-xl font-bold text-gray-800 dark:text-gray-100 font-mono">
                        My Store
                    </span>
                </Link>

                {
                    user ? (
                        <>
                            <div className="mx-auto hidden space-x-6 md:flex">
                                {navLinks.map(({ href, label }: INavLinks) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="text-md font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>

                            <div className="flex items-center space-x-2">
                                <div className="flex items-center gap-x-4">
                                    <ModeToggle />
                                    <UserButton afterSwitchSessionUrl="/" />
                                </div>

                                <div className="md:hidden">
                                    <Sheet open={open} onOpenChange={setOpen}>
                                        <SheetTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Menu className="h-5 w-5" />
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent side="left" className="sm:w-[40%] md:w-[50%] w-[60%] mt-1 bg-white dark:bg-black">
                                            <SheetHeader>
                                                <SheetTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                                    <Image
                                                        src={`/images/${themes === "dark" ? "logo-dark.svg" : "logo.svg"}`}
                                                        alt="Logo"
                                                        width={55}
                                                        height={55}
                                                        className="object-contain"
                                                    />
                                                </SheetTitle>
                                            </SheetHeader>
                                            <div className="mt-1 flex flex-col gap-y-5">
                                                {navLinks.map(({ href, label, icon: Icon }: INavLinks) => (
                                                    <Link
                                                        key={href}
                                                        href={href}
                                                        onClick={() => setOpen(false)}
                                                        className={cn("text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white", buttonVariants({ variant: "ghost", className: "flex items-center justify-start mx-4" }))}
                                                    >
                                                        <span className="flex items-center justify-start gap-4 px-2">
                                                            <span><Icon /></span>
                                                            <span>{label}</span>
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <ModeToggle />
                            <Link href={`/sign-in`} className={cn(buttonVariants({ variant: "default", className: "px-5 py-2 rounded-sm text-white" }))}>
                                Sign In
                            </Link>
                            <Link href={`/sign-up`} className={cn(buttonVariants({ variant: "outline", className: "px-5 py-2 rounded-sm" }))}>
                                Sign Up
                            </Link>
                        </div>
                    )}
            </div>
        </nav >
    );
}
