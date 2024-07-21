"use client";

import MainButton from "@/components/common/MainButton";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import makeApiCallService from "@/lib/service/apiService";
import { billingAtom, cartAtom } from "@/storage/jotai";
import { useAtomValue } from "jotai";
import { useState } from "react";

function CheckoutDetailSection() {
  const [loading, setLoading] = useState(false);
  const products = useAtomValue(cartAtom);
  const billing = useAtomValue(billingAtom);
  const { toast } = useToast();

  const computeSubTotal = () => {
    let total = 0;
    for (const product of products) {
      total += Number(product.quantity) * Number(product.unitPrice);
    }
    return total;
  };

  const handleCheckout = async () => {
    if (!billing?._id) {
      toast({
        variant: "destructive",
        title: "Empty Billing Info",
        description: "Kindly fill your billing information",
      });

      return;
    }
    setLoading(true);
    await makeApiCallService("/api/payment", {
      method: "POST",
      body: {
        billingId: billing?._id,
        products: products.map((product) => {
          return {
            id: product.id,
            qty: product.quantity,
          };
        }),
      },
    })
      .then((res) => {
        if (typeof window !== undefined) {
          if (res?.response?.data?.url) {
            window.location = res?.response?.data?.url;
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <section>
      <div className="flex justify-between">
        <p className="font-bold text-[18px]">Product</p>
        <p className="font-bold text-[18px]">Subtotal</p>
      </div>

      <div className="mt-4 flex flex-col gap-3 justify-between">
        {products.map((product, index) => (
          <div key={index} className="flex justify-between">
            <p className="text-customGray2 text-sm ">
              {product.productName}{" "}
              <span className="font-bold text-black">X {product.quantity}</span>
            </p>
            <p>{Number(product.unitPrice) * Number(product.quantity)}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 justify-between">
        <div className="flex justify-between">
          <p className="text-customGray2 text-sm ">Total</p>
          <p className="text-primary font-bold text-[20px]">
            Rs. {computeSubTotal()}
          </p>
        </div>
      </div>

      <div className="my-[30px]">
        <Separator />
      </div>

      <p>
        Your personal data will be used to support your experience throughout
        this website, to manage access to your account, and for other purposes
        described in our <strong>privacy policy</strong>.
      </p>

      <div className="my-16 flex justify-center">
        <MainButton
          text="Place order"
          classes="bg-white hover:bg-white border  border-black rounded-[15px] h-[55px] text-black"
          isLoading={loading}
          action={handleCheckout}
        />
      </div>
    </section>
  );
}

export default CheckoutDetailSection;
