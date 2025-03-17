import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../../ui/button";

const Banner = () => {
    return <div>
        <section>
            <div className="mx-auto max-w-screen-xl px-4 pt-26 pb-16 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl text-black dark:bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 dark:text-transparent bg-clip-text">
                        Improve Shopping Flow.
                        <strong className="font-extrabold text-primary sm:block"> Boost Revenue. </strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Shop the latest trends with ease. Enjoy great deals, fast shipping, and a seamless checkout experience!
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            className={cn(buttonVariants({variant: "default", className: "px-10 rounded-sm py-5 text-white"}))}
                            href="#"
                        >
                            Get Started
                        </Link>

                        <Link 
                            className={cn(buttonVariants({variant: "outline", className: "px-10 rounded-sm py-5 dark:text-white"}))}
                            href="#"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    </div>;
};

export default Banner;
