import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { logo } from "../assets";
import { links } from "../assets/constants";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handleClick }) => (
  <ul className="mt-10 grid gap-y-8 text-sm font-medium text-gray-400  ">
    {links.map((item) => (
      <li
        className={`hover:text-cyan-400 flex items-center  `}
        key={item.name}
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className={"w-6 h-6 mr-2"} />
        <Link href={item.to}>{item.name}</Link>
      </li>
    ))}
  </ul>
);

const Sidebar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]  ">
        <div className="w-20 h-14 mx-auto">
          <Image
            src={logo}
            alt="logo-icon"
            className="w-full h-full object-contain  "
          />
        </div>
        <NavLinks />
      </div>
      <div className="absolute md:hidden bg-black w-fit h-fit p-1 mx-auto rounded-lg shadow-lg z-[99] grid place-items-center top-6 right-3 ">
        {mobileMenu ? (
          <RiCloseLine
            onClick={() => setMobileMenu(false)}
            className="w-6 cursor-pointer h-6 text-white "
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setMobileMenu(true)}
            className="w-6 cursor-pointer h-6 text-white "
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenu ? "left-0" : "-left-full"
        }  `}
      >
        <div className="w-20 h-14 mx-auto">
          <Image
            src={logo}
            alt="logo-icon"
            className="w-full h-full object-contain  "
          />
        </div>
        <NavLinks handleClick={() => setMobileMenu(false)} />
      </div>
    </>
  );
};

export default Sidebar;
