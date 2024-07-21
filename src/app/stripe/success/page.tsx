"use client";

import { cartAtom } from "@/storage/jotai";
import { useSetAtom } from "jotai";
import React, { useEffect } from "react";

function StripeSuccessPage() {
  const setCartItems = useSetAtom(cartAtom);

  useEffect(() => {
    setCartItems([]);
  }, []);
  return (
    <div>
      <div className="py-16">
        <p className="text-green-500 font-bold text-center uppercase text-2xl">
          🎉🎉🎉 Payment successful
        </p>
        <p className="text-center mt-8">
          Thank you for shopping with us. We have sent a receipt to your email
        </p>
      </div>
    </div>
  );
}

export default StripeSuccessPage;
