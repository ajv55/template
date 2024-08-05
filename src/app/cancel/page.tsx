// app/cancel/page.tsx
import Link from 'next/link';
import React from 'react';

const CancelPage = () => {
  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>Your payment was cancelled. Please try again.</p>
      <Link href='/'>Home</Link>
    </div>
  );
};

export default CancelPage;
