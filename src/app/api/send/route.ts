import { EmailTemplate } from '@/components/Email-Template/Email-Template';
import { getMyCart } from '@/lib/cart';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY as string);

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        
        if (!email) {
            return NextResponse.json({ error: "User email is required" }, { status: 400 });
        }

        const cart = await getMyCart(email);
        if (!cart) {
            return NextResponse.json({ error: "Cart not found" }, { status: 404 });
        }

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [email],
            subject: `Hello ${cart.username}, Your order is confirmed`,
            react: await EmailTemplate({cart}),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.log(error);
        
        return Response.json({ error }, { status: 500 });
    }
}