"use client";
import { ChevronsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-scroll";
import { motion } from "motion/react";

const GoToTop = () => {
    const [ArrowUp, setArrowUp] = useState<boolean>();
    useEffect(() => {
        if (window.scrollY >= 400) {
            setArrowUp(true);
        } else {
            setArrowUp(false);
        }
        window.addEventListener("scroll", () => {
            if (window.scrollY >= 400) {
                setArrowUp(true);
            } else {
                setArrowUp(false);
            }
        });

        return () => window.removeEventListener("scroll", () => { });
    }, []);

    return (
        <motion.span
            className={cn(
                "fixed bottom-7 right-4 sm:right-6 size-10 z-[2000] opacity-100 duration-500 ease-out",
                !ArrowUp && "opacity-0 cursor-none z-0",
                buttonVariants({
                    variant: "default",
                    className:
                        "px-6 py-5 rounded-sm",
                })
            )}
            initial={{ y: 0 }}
            animate={{ y: -17, transition: { duration: 1, repeat: Infinity, ease: "linear" } }}
        >
            <Link to="home" smooth={true} duration={500} className="cursor-pointer">
                <ChevronsUp className="ChevronsUp text-white" />
            </Link>
        </motion.span>
    );
};

export default GoToTop;
