"use client";

import { useState } from "react";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";

function NavBar() {
  const [menu, setMenu] = useState(false);
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Shop",
      link: "/shop",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];

  const icons = [
    {
      iconUrl: "/images/user_icon.png",
      alt: "user icon",
      action: () => console.log("You just clicked on the user icon"),
    },
    {
      iconUrl: "/images/search_icon.png",
      alt: "search icon",
      action: () => console.log("You just clicked on the search icon"),
    },
    {
      iconUrl: "/images/heart_icon.png",
      alt: "heart icon",
      action: () => console.log("You just clicked on the heart icon"),
    },
    {
      iconUrl: "/images/cart_icon.png",
      alt: "cart icon",
      action: () => console.log("You just clicked on the cart icon"),
    },
  ];
  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="md:sticky md:top-0   md:shadow-none z-20 ">
      {/* DESKTOP */}
      <div className=" hidden lg:block animate-in fade-in zoom-in bg-white p-4">
        <div className="flex justify-between mx-[41px] items-center">
          <div>
            <img src="/images/logo.png" alt="logo" />
          </div>
          <div className="flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none">
            {links.map((link, index) => (
              <Link
                href={link.link}
                key={index}
                className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}
              >
                <p>{link.title}</p>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-[40px] select-none">
            {icons.map((icon, index) => (
              <img
                src={icon.iconUrl}
                onClick={icon.action}
                alt={icon.alt}
                key={index}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div
        className={` block lg:hidden shadow-sm  fixed top-0 w-full z-[999] bg-white py-4 animate-in fade-in zoom-in  ${
          menu ? " !bg-[#FFF3E3] py-2" : ""
        } `}
      >
        <div className="flex justify-between mx-[10px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none">
            <img src="/images/logo.png" alt="logo" className="w-[7rem]" />
          </div>
          <div className="flex items-center gap-[40px]">
            {menu ? (
              <X
                className="cursor-pointer animate-in fade-in zoom-in text-black"
                onClick={toggleMenu}
              />
            ) : (
              <MenuIcon
                onClick={toggleMenu}
                className="cursor-pointer animate-in fade-in zoom-in"
              />
            )}
          </div>
        </div>
        {menu ? (
          <div className="my-8 select-none animate-in slide-in-from-right">
            <div className="flex flex-col gap-8 mt-8 mx-4">
              {/* Add more links here */}
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.link}
                  className="text-black cursor-pointer"
                >
                  <p>{link.title}</p>
                </Link>
              ))}

              <div className="flex flex-col gap-[40px] select-none">
                {icons.map((icon, index) => (
                  <img
                    src={icon.iconUrl}
                    onClick={icon.action}
                    alt={icon.alt}
                    key={index}
                    className="cursor-pointer w-[28px] h-[28px] object-contain"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
