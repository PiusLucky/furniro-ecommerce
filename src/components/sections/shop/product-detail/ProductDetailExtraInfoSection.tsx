import React from "react";

export default function ProductDetailExtraInfoSection() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex gap-[53px]">
        <p className="text-customGray text-normal md:text-[24px] font-semibold">
          Description
        </p>
        <p className="text-customGray text-normal md:text-[24px]">
          Additional Information
        </p>
        <p className="text-customGray text-normal md:text-[24px]">
          Reviews [5]
        </p>
      </div>
      <div className="mt-[37px] ">
        <p className="text-customGray text-normal">
          Embodying the raw, wayward spirit of rock &apos;n&apos; roll, the
          Kilburn portable active stereo speaker takes the unmistakable look and
          sound of Marshall, unplugs the chords, and takes the show on the road.
        </p>
        <p className="text-customGray text-normal mt-[30px]">
          Weighing in under 7 pounds, the Kilburn is a lightweight piece of
          vintage styled engineering. Setting the bar as one of the loudest
          speakers in its class, the Kilburn is a compact, stout-hearted hero
          with a well-balanced audio which boasts a clear midrange and extended
          highs for a sound that is both articulate and pronounced. The analogue
          knobs allow you to fine tune the controls to your personal preferences
          while the guitar-influenced leather strap enables easy and stylish
          travel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-[37px]">
        <div className=" flex flex-col bg-primary-light  rounded-[8px] justify-center items-center">
          <img
            src={"/images/sofa.png"}
            alt="product"
            className="w-full object-cover"
          />
        </div>
        <div className=" flex flex-col bg-primary-light  rounded-[8px] justify-center items-center">
          <img
            src={"/images/sofa.png"}
            alt="product"
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
