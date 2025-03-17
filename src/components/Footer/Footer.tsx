"use client"
import { navLinks } from "@/constants/navLinks";
import { socialMedia } from "@/constants/socialMediaLinks";
import { INavLinks, ISocialMediaLinks } from "@/types";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React, { useEffect, useState } from "react";

const Footer = () => {
    const { theme, resolvedTheme } = useTheme();
    const [themes, setTheme] = useState<string>(""); //resolvedTheme


    useEffect(() => {
        if (resolvedTheme === "dark") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }, [resolvedTheme]);

    return <>
        <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 mt-42">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex justify-center text-teal-600">
                    <h1 className="flex items-center gap-4 text-3xl">
                        <Image
                            src={`/images/${themes === "dark" ? "logo-dark.svg" : "logo.svg"}`}
                            alt="Logo"
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                        <span className="font-bold text-gray-800 dark:text-gray-100 font-mono">
                            My Store
                        </span>
                    </h1>
                </div>

                <p className="mx-auto mt-6 max-w-lg text-center leading-relaxed text-gray-500">
                    Shop with confidence at [My Store], where quality meets convenience. Enjoy secure shopping, fast shipping, and top-notch customer service. Thank you for choosing us!
                </p>

                <ul className="mt-6 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                    {navLinks.map(({ href, label }: INavLinks) => (
                        <li>
                            <Link
                                key={href}
                                href={href}
                                className="text-md font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="mt-6 flex justify-center gap-6 md:gap-8">
                    {
                        socialMedia.map(({ title, href, icon: Icon }: ISocialMediaLinks) => (
                            <li key={href}>
                                <a
                                    href={href}
                                    target="_blank"
                                >
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Icon className="size-6" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{title}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </footer>
    </>;
};

export default Footer;
