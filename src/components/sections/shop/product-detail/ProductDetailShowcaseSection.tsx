"use client";

import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import ReactStars from "react-stars";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import MainButton from "@/components/common/MainButton";
import { MinusIcon, PlusIcon } from "lucide-react";
import { PRODUCTS } from "@/lib/constants";
import { useAtom } from "jotai";
import { cartAtom } from "@/storage/jotai";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function ProductDetailShowcaseSection({
  productId,
}: {
  productId: string;
}) {
  const MAX_QUANTITY = 5;

  const mini = [
    "/images/sofa_mini.png",
    "/images/sofa_mini.png",
    "/images/sofa_mini.png",
    "/images/sofa_mini.png",
  ];

  const extraDetailsData = [
    {
      item: "SKU",
      value: "SS001",
    },
    {
      item: "Category",
      value: "Sofas",
    },
    {
      item: "Tags",
      value: "Sofa, Chair, Home, Shop",
    },
    {
      item: "Share",
      value: (
        <div className="flex gap-[23px]">
          <div>
            <img src="/images/facebook.png" alt="facebook" />
          </div>
          <div>
            <img src="/images/linkedin.png" alt="linkedin" />
          </div>
          <div>
            <img src="/images/twitter.png" alt="twitter" />
          </div>
        </div>
      ),
    },
  ];

  const [quantity, setQuantity] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  const [cart, setCart] = useAtom(cartAtom);

  const handleQuantityDecrement = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };
  const handleQuantityIncrement = () => {
    if (quantity === MAX_QUANTITY) return;
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    const productInCart = cart.find((product) => product.id === productId);

    // NOTE: When we already have the product in the cart [EXISTING PRODUCT]
    if (productInCart) {
      let updatedProducts = [];
      const productObject: IProduct = {
        id: productId,
        productImageUrl: productInCart?.productImageUrl,
        productName: productInCart?.productName,
        quantity,
        unitPrice: Number(productInCart?.unitPrice),
      };

      // NOTE: Remove it from cart & set afresh
      const filteredProducts = cart.filter(
        (product) => product.id !== productId
      );

      updatedProducts = filteredProducts;
      updatedProducts.push(productObject);

      setCart(updatedProducts);
    }

    // NOTE: When we dont have the product already in the cart [FRESH PRODUCT]
    if (!productInCart) {
      const product = PRODUCTS.find((product) => {
        return product.id === productId;
      });

      const productObject: IProduct = {
        id: productId,
        productImageUrl: product?.imageUrl,
        productName: product?.title,
        quantity,
        unitPrice: Number(product?.price),
      };
      setCart((prevProducts) => [...prevProducts, productObject]);
    }

    toast({
      title: "Cat in the Bag :)",
      description: "Product added to cart successfully",
      action: <ToastAction altText="Goto schedule to undo">Close</ToastAction>,
    });
  };

  const specificProduct = PRODUCTS.find((product) => {
    return product.id === productId;
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LHS */}
      <div className="flex gap-8 ">
        <div className="hidden md:inline-flex flex-col gap-8">
          {mini.map((item, index) => (
            <div
              key={index}
              className="bg-primary-light h-[80px] rounded-[8px] inline-flex items-center px-2"
            >
              <img src={item} alt="product mini glance" />
            </div>
          ))}
        </div>
        <div className=" flex flex-col bg-primary-light  rounded-[8px] h-[500px] justify-center items-center">
          <img
            src={specificProduct?.imageUrl}
            alt="product"
            className="w-[425px] h-[500px] object-cover rounded-[10px]"
          />
        </div>
      </div>
      {/* RHS */}
      <div>
        <p className="text-[42px]">{specificProduct?.title}</p>
        <p className="text-customGray text-[24px] font-medium">
          Rs. {specificProduct?.price}
        </p>
        <div className="flex items-center gap-[22px]">
          <ReactStars count={5} color1="#FFC700" size={24} color2={"#FFC700"} />
          <Separator
            orientation="vertical"
            className="h-[40px] border border-customGray2"
          />
          <p>5 Customer Review</p>
        </div>

        <p className="mt-4">
          Setting the bar as one of the loudest speakers in its class, the
          Kilburn is a compact, stout-hearted hero with a well-balanced audio
          which boasts a clear midrange and extended highs for a sound.
        </p>

        <div>
          <p className="text-customGray text-[14px] mb-[12px] mt-[22px]">
            Size
          </p>
          <Pagination className="flex !justify-start">
            <PaginationContent className="flex gap-[38px]">
              <PaginationItem>
                <PaginationLink href="" isActive>
                  L
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="">XL</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="">XS</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="flex gap-[18px] items-center mt-32">
          <div className="inline-flex h-[64px] px-[15px] gap-[35px] items-center border border-customGray2 rounded-[10px]">
            <MinusIcon
              className="cursor-pointer"
              onClick={handleQuantityDecrement}
            />
            <p className="font-semibold text-normal select-none">{quantity}</p>
            <PlusIcon
              className="cursor-pointer"
              onClick={handleQuantityIncrement}
            />
          </div>
          <div>
            <MainButton
              text="Add to Cart"
              classes="bg-white text-black hover:bg-white border border-black rounded-[15px]"
              action={handleAddToCart}
            />
          </div>
        </div>

        <div className="my-[41px]">
          <Separator className="border border-[#D9D9D9]" />
        </div>

        <div className="flex flex-col gap-4">
          {extraDetailsData.map((item, index) => (
            <div key={index} className="flex gap-4">
              <p className="text-customGray">{item.item}</p>
              <p className="text-customGray">:</p>
              <div className="text-customGray">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
