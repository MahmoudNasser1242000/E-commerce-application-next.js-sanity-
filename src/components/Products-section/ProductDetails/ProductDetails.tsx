"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { addProductToCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { IProducts } from "@/types";
import { useUser } from "@clerk/nextjs";
import { BadgeCheck, OctagonX, ShoppingCart } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ProductDetails = ({ product }: { product: IProducts }) => {
    const { theme, resolvedTheme } = useTheme();
    const [themes, setTheme] = useState<"light" | "dark">();
    const { user } = useUser()

    useEffect(() => {
        if (resolvedTheme === "dark") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }, [resolvedTheme]);

    const addToCart = async () => {
        await addProductToCart(user?.emailAddresses[0]?.emailAddress, user?.username, product._id, themes);
    }
    return <>
        <section className="overflow-hidden mx-4 rounded-lg shadow-2xl dark:shadow-gray-700 md:grid md:grid-cols-3 mt-18">
            <div className="overflow-hidden">
                <Image
                    alt={product.title}
                    src={urlFor(product.image).url()}
                    width={800}
                    height={800}
                    className="w-full object-cover h-full hover:scale-105 transition duration-500"
                />
            </div>

            <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
                <p className="text-sm font-semibold tracking-widest uppercase">{product.category} category</p>

                <h2 className="mt-6 font-black uppercase">
                    <span className="text-4xl font-black sm:text-5xl lg:text-6xl"> {product.title} </span>

                    <span className="mt-2 block text-md">
                        <span className="flex gap-4 justify-center">
                            <span>${product.price}</span>
                            <span className="text-gray-400 line-through">${(product.price * 1.4).toFixed(2)}</span>
                        </span>
                    </span>
                </h2>

                <p className="mt-6 text-gray-400">
                    {product.description}
                </p>

                <Button
                    onClick={() => addToCart()}
                    className={"flex w-full text-lg py-6 text-white rounded-sm my-6"}
                >
                    <span>Add To Your Cart</span>
                    <ShoppingCart size={30} />
                </Button>

                <p className="mt-8 text-xs font-medium uppercase flex justify-center items-center gap-2">
                    {product.instantDelivery ? (
                        <>
                            <span className="text-green-400"><BadgeCheck /></span>
                            <span>Eligble For Instant Delivery</span>
                        </>
                    ): (
                        <>
                            <span className="text-orange-400"><OctagonX /></span>
                            <span>Not Eligble For Instant Delivery</span>
                        </>
                    )}
                </p>
            </div>
        </section>
    </>;
};
export default ProductDetails;
