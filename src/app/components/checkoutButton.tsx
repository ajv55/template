'use client';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ name: 'Sample Item', amount: 2000, quantity: 1 }], // Replace with actual items
      }),
    });

    const { id } = await res.json();

    const stripe = await stripePromise;
    const { error } = await stripe!.redirectToCheckout({ sessionId: id });

    if (error) {
      console.error('Stripe checkout error:', error);
    }

    setLoading(false);
  };

  return (

    <div className='p-8 flex flex-col gap-4 justify-center items-center bg-indigo-300 w-full'>
        <h1 className="text-2xl text-white font-bold mb-4">Your Product</h1>
        <p className="text-lg text-gray-500 mb-6">Complete your purchase by clicking the button below:</p>
        <p className='text-gray-500 font-bold'>Please make sure to add <strong className='text-red-500'>YOUR OWN API KEYS FOR STRIPE, NEXT AUTH, and your own MonogoDB string.</strong></p>
        <button
        onClick={handleCheckout}
        disabled={loading}
        className={`flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-transform transform ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-500 to-blue-500 hover:scale-105 hover:from-indigo-600 hover:to-blue-600 active:scale-95'}`}
    >
        {loading ? (
        <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8H4z"></path>
        </svg>
        ) : (
        'Checkout'
        )}
    </button>
    </div>
  );
};

export default CheckoutButton;
