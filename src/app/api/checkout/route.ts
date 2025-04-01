import { getMyCart } from "@/lib/cart";
import { urlFor } from "@/sanity/lib/image";
import { IProducts } from "@/types";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: `2025-02-24.acacia`,
});

export async function POST(req: Request) {
    try {
        const { email } = await req.json(); // Get email from request body
        if (!email) {
            return NextResponse.json({ error: "User email is required" }, { status: 400 });
        }
        const cart = await getMyCart(email);

        if (!cart || cart.products.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

        // Format line items for Stripe
        const lineItems = cart?.products.map((product: IProducts) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.title,
                    images: [urlFor(product.image).url()],
                    description: product.description,
                },
                unit_amount: Math.round(product.price * 100), // Convert to cents
            },
            quantity: 1,
        }));

        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `https://my-store-app-steel.vercel.app//payment-confirm/${cart._id}`,
            cancel_url: `https://my-store-app-steel.vercel.app//Cart`,
            customer_email: email,
            metadata: { cartId: cart._id },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe checkout error:", error);
        return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
    }
}