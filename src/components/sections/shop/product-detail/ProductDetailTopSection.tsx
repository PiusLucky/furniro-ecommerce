import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import React from "react";

export default function ProductDetailTopSection({
  product_id,
}: {
  product_id: string;
}) {
  return (
    <section className="bg-primary-light px-4 md:px-[70px] flex h-[100px] gap-3 items-center">
      <div className="text-[#9F9F9F]">Home</div>
      <ChevronRight />
      <div className="text-[#9F9F9F]">Shop</div>
      <ChevronRight />
      <Separator
        orientation="vertical"
        className="h-[40px] border border-[#9F9F9F]"
      />
      <div className="font-semibold">Product {product_id}</div>
    </section>
  );
}
