// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import stripe from '@/app/lib/stripe'; // Adjust the import path

export async function POST(request: Request) {
  const { items } = await request.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.amount,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.BASED_URL}/success`,
      cancel_url: `${process.env.BASED_URL}/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
