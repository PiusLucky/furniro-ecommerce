import React from "react";

function StripeCancelPage() {
  return (
    <div>
      <div className="py-16">
        <p className="text-red-500 font-bold text-center uppercase text-2xl">
          😥😥😥 Payment failed
        </p>
        <p className="text-center mt-8">
          Sorry, your payment failed at this time. Kindly try again
        </p>
      </div>
    </div>
  );
}

export default StripeCancelPage;
