"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ICart } from "@/types";
import { useCart } from "@/context/Cart";
import { useTheme } from "next-themes";

export default function CheckoutButton({ cart }: { cart: ICart }) {
    const [loading, setLoading] = useState(false);
    const { resolvedTheme } = useTheme();
    const [themes, setTheme] = useState<string>("");

    const { clearCart } = useCart();

    const handleCheckout = async () => {
        setLoading(true);
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: cart?.email }),
        });

        const data = await res.json();
        setLoading(false);

        if (data.url) {
            // Redirect to Stripe Checkout
            window.open(data.url, "_blank");
            // Send email to user
            await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: cart?.email }),
            });
            //Clear cart products
            await clearCart(cart.email, themes as "light" | "dark", false)
        } else {
            alert("Error: " + data.error);
        }
    };

    useEffect(() => {
        if (resolvedTheme === "dark") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }, [resolvedTheme]);

    return (
        <Button
            onClick={handleCheckout}
            disabled={loading}
            variant={"outline"}
            className="px-8 py-4 cursor-pointer rounded-sm"
        >
            {loading ? "Processing..." : "Checkout"}
        </Button>
    );
}
