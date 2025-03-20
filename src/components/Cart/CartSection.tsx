import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { X } from "lucide-react";
import { ICart } from "@/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface IProps {
    cart: ICart | null;
    openCart: boolean;
    setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}
const CartSection = ({ openCart, setOpenCart, cart }: IProps) => {
    return <>
        <div
            className={`absolute left-[-320px] ${openCart ? "block" : "hidden"} w-screen max-w-sm border border-gray-600 bg-white p-4 text-gray-900 transition dark:bg-gray-900 dark:text-white px-4 py-8 sm:px-6 lg:px-8`}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
        >
            <Button onClick={() => setOpenCart(false)} variant={"ghost"} className="absolute end-4 top-4 cursor-pointer mx-4 md:mx-0">
                <span className="sr-only">Close cart</span>

                <X className="size-6" />
            </Button>

            {
                !cart ? (
                    <h2 className="px-6 py-4 text-2xl">Your cart is empty</h2>
                ) : (
                    <div className="mt-4 space-y-6 text-gray-700 dark:text-gray-200">
                        <ul className="space-y-4 mt-8">
                            {
                                cart.products.slice(0, 3).map((product) => (
                                    <li className={cn(buttonVariants({ variant: "ghost", className: "flex items-center justify-start w-full gap-4 h-fit" }))}>
                                        <Image
                                            src={urlFor(product.image).url()}
                                            width={800}
                                            height={800}
                                            alt={product.title}
                                            className="size-16 rounded-sm object-cover"
                                        />

                                        <div>
                                            <h3 className="text-sm line-clamp-1">{product.title}</h3>

                                            <dl className="mt-0.5 space-y-px text-[10px]">
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
                                    </li>
                                ))
                            }
                        </ul>

                        <div className="space-y-4 text-center">
                            <Link
                                href="/Cart"
                                className={cn(buttonVariants({ variant: "ghost", className: "rounded-sm border w-full px-5 py-6 text-sm transition hover:ring-1" }))}
                            >
                                View my cart ({cart.products.length || 0})
                            </Link>

                            <a
                                href="#"
                                className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                            >
                                Checkout
                            </a>
                        </div>
                    </div>
                )
            }
        </div>
    </>;
};

export default CartSection;
