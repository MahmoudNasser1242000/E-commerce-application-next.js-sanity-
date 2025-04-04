"use client";
import { useCart } from "@/context/Cart";
import { addToast } from "@/lib/toast";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PaymentConfirmContent = ({ cartId }: { cartId: string }) => {
    const { state, clearCart } = useCart();
    const { resolvedTheme } = useTheme();
    const [themes, setTheme] = useState<string>("");
    const router = useRouter()

    const paymentConfirm = async () => {
        if (state.cart?._id === cartId) {
            // Send email to user
            await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: state.cart?.email }),
            });
            //Clear cart products
            await clearCart(state.cart?.email, themes as "light" | "dark", false)
        } else {
            addToast("warn", "Cart not found, Try again later!");
            // Redirect to home page
            router.push("/")
        }
    }

    useEffect(() => {
        if (resolvedTheme === "dark") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }, [resolvedTheme]);

    useEffect(() => {
        if (state.cart) {
            paymentConfirm()
        }
    }, [cartId, state.cart?._id]);

    return <>
        <Image src='/images/verified.png'
            alt='check'
            width={400}
            height={400}
        />
        <h2 className='text-[24px]'>Payment Successful !</h2>
        <h2 className='text-[17px] text-center mt-6 text-gray-500'>We sent an email with your
            order confirmation
            along with Digital Content
        </h2>
        <Link
            href="/"
            className='px-8 py-2 rounded-sm mt-6 text-white bg-primary'
        >
            Go to Home
        </Link>
    </>;
};

export default PaymentConfirmContent;
