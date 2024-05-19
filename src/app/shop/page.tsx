import ShopBannerSection from "@/components/sections/shop/ShopBannerSection";
import ShopFilterSection from "@/components/sections/shop/ShopFilterSection";
import ShopHeroSection from "@/components/sections/shop/ShopHeroSection";
import ShopPaginationSection from "@/components/sections/shop/ShopPaginationSection";
import ShopProductSection from "@/components/sections/shop/ShopProductSection";

function ShopPage() {
  return (
    <div>
      <ShopHeroSection />
      <ShopFilterSection />
      <div className="mx-4 md:mx-[130px]">
        <ShopProductSection />
      </div>
      <div className="my-[70px]">
        <ShopPaginationSection />
      </div>

      <ShopBannerSection />
    </div>
  );
}

export default ShopPage;
