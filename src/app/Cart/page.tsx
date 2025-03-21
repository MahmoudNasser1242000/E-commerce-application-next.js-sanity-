"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { getMyCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { ICart } from "@/types";
import { useUser } from "@clerk/nextjs";
import { ShoppingCartIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = () => {
    const [cart, setCart] = useState<ICart | null>(null);
    const { user } = useUser();

    const getCart = async () => {
        const cart = await getMyCart(user?.emailAddresses[0].emailAddress);
        setCart(cart)
    }
    useEffect(() => {
        if (user?.emailAddresses[0].emailAddress !== undefined) {
            getCart()
        }
    }, [user?.emailAddresses[0].emailAddress]);
    return <>
        <section>
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-34">
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <h1 className="font-bold text-3xl text-primary flex items-center justify-center gap-2">
                            <span>Shopping Cart</span>
                            <span><ShoppingCartIcon /></span>
                        </h1>
                    </header>

                    {
                        !cart || !cart.products.length ? (
                            <h2 className="px-6 py-8 text-2xl">Your cart is empty</h2>
                        ) : (
                            <div className="mt-8">
                                <ul className="space-y-4">
                                    {
                                        cart.products.map((product) => (
                                            <li className="flex items-center gap-4" key={product._id}>
                                                <div className="overflow-hidden">
                                                    <Image
                                                        src={urlFor(product.image).url()}
                                                        width={800}
                                                        height={800}
                                                        alt={product.title}
                                                        className="size-28 rounded-sm object-cover transition duration-500 hover:scale-105"
                                                    />
                                                </div>

                                                <div>
                                                    <h3 className="text-xl">{product.title}</h3>

                                                    <dl className="mt-0.5 space-y-px text-[12px]">
                                                        <div className="space-x-1">
                                                            <dt className="inline">Price:</dt>
                                                            <dd className="inline text-gray-500 dark:text-gray-400">${product.price}</dd>
                                                        </div>

                                                        <div className="space-x-1">
                                                            <dt className="inline">Category:</dt>
                                                            <dd className="inline text-gray-500 dark:text-gray-400">{product.category}</dd>
                                                        </div>
                                                    </dl>
                                                </div>

                                                <div className="flex flex-1 items-center justify-end gap-2">
                                                    <button className="text-gray-600 transition hover:text-red-600">
                                                        <span className={cn(buttonVariants({variant: "ghost", className: "text-red-500 hover:text-red-400 cursor-pointer"}))}>
                                                            <Trash2 className="size-5" />
                                                        </span>
                                                    </button>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>

                                <div className="mt-8 flex justify-end border-t border-gray-100/60 pt-8">
                                    <div className="w-screen max-w-lg space-y-4">
                                        <div className="flex justify-end">
                                            <span
                                                className="inline-flex items-center justify-center rounded-full bg-primary px-2.5 py-0.5 text-white"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="-ms-1 me-1.5 size-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                                                    />
                                                </svg>

                                                <p className="text-lg font-bold font-mono whitespace-nowrap">
                                                    Total: ${
                                                        cart.products.reduce((acc, product) => acc + product.price, 0)
                                                    }
                                                </p>
                                            </span>
                                        </div>

                                        <div className="flex justify-end">
                                            <Button
                                                variant={"outline"}
                                                className="px-8 py-4 cursor-pointer rounded-sm"
                                            >
                                                Checkout
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    </>;
};

export default page;
