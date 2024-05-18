import React from "react";
import ProductCard from "../cards/ProductCard";
import MainButton from "../common/MainButton";

function OurProductSection() {
  const data = [
    {
      imageUrl: "/images/p_1.png",
      title: "Syltherine",
      description: "Stylish cafe chair",
      price: "2.500.000",
      otherPrice: "3.500.000",
      type: "DISCOUNTED",
      typeValue: "-30%",
    },
    {
      imageUrl: "/images/p_2.png",
      title: "Leviosa",
      description: "Stylish cafe chair",
      price: "2.500.000",
      otherPrice: "3.500.000",
      type: "DISCOUNTED",
      typeValue: "-30%",
    },
    {
      imageUrl: "/images/p_3.png",
      title: "Lolito",
      description: "Luxury big sofa",
      price: "7.000.000",
      otherPrice: "14.000.000",
      type: "DISCOUNTED",
      typeValue: "-50%",
    },
    {
      imageUrl: "/images/p_4.png",
      title: "Respira",
      description: "Outdoor bar table and stool",
      price: "500.000",
      otherPrice: "",
      type: "NEW",
      typeValue: "New",
    },
    {
      imageUrl: "/images/p_5.png",
      title: "Grifo",
      description: "Night lamp",
      price: "1.500.000",
      otherPrice: "",
      type: "NORMAL",
      typeValue: "",
    },

    {
      imageUrl: "/images/p_6.png",
      title: "Muggo",
      description: "Small mug",
      price: "150.000",
      otherPrice: "",
      type: "NEW",
      typeValue: "New",
    },
    {
      imageUrl: "/images/p_7.png",
      title: "Pingky",
      description: "Cute bed set",
      price: "7.000.000",
      otherPrice: "14.000.000",
      type: "DISCOUNTED",
      typeValue: "-50%",
    },

    {
      imageUrl: "/images/p_8.png",
      title: "Potty",
      description: "Minimalist flower pot",
      price: "500.000",
      otherPrice: "",
      type: "NEW",
      typeValue: "New",
    },
  ];
  return (
    <section className="w-full overflow-x-hidden">
      <div>
        <p className="text-[32px] font-bold text-center">Our Product</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] mt-[30px]">
        {data.map((item, index) => (
          <ProductCard {...item} key={index} />
        ))}
      </div>
      <div className="flex justify-center mt-[32px]">
        <MainButton
          text="Show More"
          classes="bg-transparent hover:bg-transparent text-primary font-bold border border-primary h-[48px]"
        />
      </div>
    </section>
  );
}

export default OurProductSection;
