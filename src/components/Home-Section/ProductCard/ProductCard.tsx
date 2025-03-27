"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useCart } from "@/context/Cart";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { IProducts } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductCard = ({ product }: { product: IProducts }) => {
    const { resolvedTheme } = useTheme();
    const [themes, setTheme] = useState<"light" | "dark">();
    const { user } = useUser();

    const {addProduct} = useCart();

    const router = useRouter();

    useEffect(() => {
        if (resolvedTheme === "dark") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }, [resolvedTheme]);
    const addToCart = async () => {
        if (user) {
            await addProduct(user?.emailAddresses[0]?.emailAddress, user?.username, product._id, themes as "light" | "dark");
        } else {
            router.push("/sign-in")
        }
    }
    return <>
        <div className="group h-[300px] rounded-sm">
            <div className="h-[60%] overflow-hidden border border-b-0 dark:border-none rounded-t-sm">
                <Image
                    src={urlFor(product.image).url()}
                    alt={product.title}
                    width={800}
                    height={800}
                    className="object-cover rounded-t-sm transition duration-500 group-hover:scale-106 size-full"
                />
            </div>

            <div className="border p-6">
                <p className="text-gray-600 space-x-2">
                    <span>${product.price.toString()}</span>
                    <span className="text-gray-400 line-through"> ${(product.price * 1.4).toFixed(2).toString()}</span>
                </p>

                <h3 className="mt-1.5 text-lg font-medium line-clamp-1">{product.title}</h3>

                <p className="mt-1.5 line-clamp-2 text-gray-600">
                    {product.description}
                </p>

                <div className="mt-4 flex justify-center gap-4">
                    <Button
                        onClick={() => addToCart()}
                        className={"w-[50%] cursor-pointer rounded-sm bg-gray-100 hover:bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"}
                    >
                        Add to Cart
                    </Button>

                    <Link
                        href={`/Products/Product-Details/${product._id}`}
                        className={cn(buttonVariants({className: "w-[50%] cursor-pointer rounded-sm bg-gray-900 hover:bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"}))}
                    >
                        Details...
                    </Link>
                </div>
            </div>
        </div>
    </>;
};

export default ProductCard;
