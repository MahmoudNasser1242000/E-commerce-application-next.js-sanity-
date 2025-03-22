"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { ICart } from "@/types";

export default function CheckoutButton({ cart }: { cart: ICart }) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: cart.email }),
        });

        const data = await res.json();
        setLoading(false);

        if (data.url) {
            window.location.href = data.url; // Redirect to Stripe Checkout
        } else {
            alert("Error: " + data.error);
        }
    };

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
