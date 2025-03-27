"use client";
import DialogDelelteProduct from "@/components/Dialog/Dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/Cart";
import { urlFor } from "@/sanity/lib/image";
import { useUser } from "@clerk/nextjs";
import { ShoppingCartIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import CheckoutButton from "@/components/CheckoutButton/CheckoutButton";
import PaginationDemo from "@/components/Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import CartPageItemSkeleton from "@/components/Cart/CartPageItemLoading/CartPageItemSkeleton";

const page = () => {
    const limit = 5;

    const { state, fetchCart, clearCart } = useCart();
    const { user } = useUser();

    const { theme, resolvedTheme } = useTheme();
    const [themes, setTheme] = useState<string>("");
    const [start, setStart] = useState<number>(0);
    // const [end, setEnd] = useState<number>(limit);

    const params = useSearchParams();
    const page = Number(params.get("page"));

    const clearCartProducts = async () => {
        if (user?.emailAddresses[0].emailAddress !== undefined) {
            await clearCart(user?.emailAddresses[0].emailAddress, themes as "light" | "dark", true);
        }
    }

    useEffect(() => {
        if (user?.emailAddresses[0].emailAddress !== undefined) {
            fetchCart(user?.emailAddresses[0].emailAddress);
        }
    }, [user?.emailAddresses[0].emailAddress]);

    useEffect(() => {
        if (resolvedTheme === "dark") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }, [resolvedTheme]);

    useEffect(() => {
        setStart((page - 1) * limit);
    }, [page, start]);
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



                    <div className="mt-8">
                        <ul className="space-y-4">
                            {
                                state.cart ? (
                                    state.cart.products.length ? (
                                        state.cart.products.slice(start, (start + limit)).map((product) => (
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
                                                    <div className="text-gray-600 transition hover:text-red-600">
                                                        <DialogDelelteProduct productId={product._id} />
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <h2 className="px-6 py-8 text-2xl">Your cart is empty</h2>
                                    )
                                ) : (
                                    Array.from({ length: 4 }, (_, index) => <CartPageItemSkeleton key={index} />)
                                )
                            }
                        </ul>

                        {
                            state.cart && (
                                <div className="mt-8 flex justify-end border-t border-gray-100/60 pt-8">
                                    <div className="w-screen flex items-center justify-between">
                                        <div>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div>
                                                        <Button
                                                            className="px-8 py-4 cursor-pointer rounded-sm text-white"
                                                        >
                                                            Clear Cart
                                                        </Button>
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle className="text-red-500">Clear Cart</DialogTitle>
                                                        <DialogDescription>
                                                            Are you absolutely sure? This action cannot be undone. This will permanently delete the product.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <div>
                                                            <Button type="submit" className="text-white rounded-sm cursor-pointer" onClick={() => clearCartProducts()}>Confirm</Button>
                                                        </div>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>

                                        <div className="space-y-4">
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
                                                            state.cart.products?.reduce((acc, product) => acc + product.price, 0).toFixed(2)
                                                        }
                                                    </p>
                                                </span>
                                            </div>

                                            <div className="flex justify-end">
                                                <CheckoutButton cart={state.cart} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>

            {
                state.cart && (
                    <div className="mt-52 flex justify-center items-center">
                        <PaginationDemo total={state.cart.products.length / limit} page={page} type="Cart" />
                    </div>
                )
            }
        </section>
    </>
};

export default page;
