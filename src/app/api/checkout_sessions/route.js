import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/session';



export async function POST() {
    const user = await getUserSession();
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            submit_type: 'pay',
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: 'price_1TnaFJBLgX7dxFJxtN0zgVjq',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/pricing/cancel`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}