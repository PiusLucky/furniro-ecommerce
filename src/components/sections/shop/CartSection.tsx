"use client";

import MainButton from "@/components/common/MainButton";
import { Separator } from "@/components/ui/separator";
import { cartAtom } from "@/storage/jotai";
import { useAtom } from "jotai";
import { useRouter } from "next-nprogress-bar";

import React, { useEffect, useState } from "react";

export default function CartSection({
  toggleShowCart,
}: {
  toggleShowCart: () => void;
}) {
  const [subTotal, setSubTotal] = useState(0);
  const [products, setProducts] = useAtom(cartAtom);
  const router = useRouter();

  const removeProductFromCart = (productId: number | string) => {
    const filteredProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(filteredProducts);
  };

  const computeSubTotal = () => {
    let total = 0;
    for (const product of products) {
      total += product.quantity * product.unitPrice;
    }
    setSubTotal(total);
  };

  useEffect(() => {
    computeSubTotal();
  }, [products]);
  return (
    <div className="w-[417px] h-[746px] bg-white p-[30px] flex justify-between flex-col">
      <div>
        <div className="flex justify-between items-center mb-[36px]">
          <p className="font-semibold text-[24px]">Shopping Cart</p>
          <div onClick={toggleShowCart} className="hover:cursor-pointer">
            <img src="/images/cart_alt_icon.png" alt="cart icon" />
          </div>
        </div>
        <Separator />
        <div className="mt-[24px] flex flex-col gap-[20px]">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex  items-center gap-[32px] w-full justify-between"
            >
              <div>
                <img
                  src={product.productImageUrl}
                  alt="product image"
                  className="w-[108px] h-[105px] rounded-[1rem] object-cover"
                />
              </div>

              <div>
                <p className="text-normal">{product.productName}</p>
                <p>
                  {product.quantity} X{" "}
                  <span className="text-primary font-medium text-sm">
                    Rs. {product.unitPrice}
                  </span>
                </p>
              </div>

              <div
                className="cursor-pointer"
                onClick={() => removeProductFromCart(product.id)}
              >
                <img src={"/images/delete_icon.png"} alt="close icon" />
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="flex justify-center mt-8 text-gray-400">
              No product is cart
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-[23px]">
          <p>Subtotal</p>
          <p className="text-primary text-normal font-semibold">
            Rs. {subTotal}
          </p>
        </div>
        {subTotal ? (
          <div>
            <Separator />
            <div className="mt-8 flex justify-center">
              <MainButton
                text="Checkout"
                classes="bg-white hover:bg-white text-black  border border-black rounded-[50px] h-[40px] w-[150px]"
                action={() => router.push("/checkout")}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
