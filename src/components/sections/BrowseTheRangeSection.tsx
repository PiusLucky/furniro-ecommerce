import React from "react";

function BrowseTheRangeSection() {
  const data = [
    {
      imageUrl: "/images/btr_1.png",
      title: "Dining",
    },
    {
      imageUrl: "/images/btr_2.png",
      title: "Living",
    },
    {
      imageUrl: "/images/btr_3.png",
      title: "Bedroom",
    },
  ];
  return (
    <section>
      <div>
        <p className="text-[32px] font-bold text-center">Browse The Range</p>
        <p className="text-20 text-customGray text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mt-[30px] md:mt-[62px]">
        {data.map((item, index) => (
          <div key={index}>
            <div>
              <img
                src={item.imageUrl}
                alt="category image"
                className="h-[480px] rounded-[10px] object-cover"
              />
            </div>
            <p className="text-[19px] text-customBlack font-semibold mt-[30px] text-center">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BrowseTheRangeSection;
