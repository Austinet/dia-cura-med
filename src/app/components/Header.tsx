"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { IoClose, IoMenu } from "react-icons/io5";

const navLinks = [
  {
    id: 1,
    href: "#hero",
    label: "Home",
  },
  {
    id: 2,
    href: "#features",
    label: "FAQ",
  },
  {
    id: 3,
    href: "#footer",
    label: "Contact Us",
  },
];

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="p-5 relative flex justify-between items-center lg:px-8 lg:py-8 shadow">
      {/* Logo container */}
      <Link href={"/"}>
        <Image
          className=""
          src="/images/logo.svg"
          alt="Dia-cura Med logo"
          width={180}
          height={38}
          priority
        />
      </Link>

      {/* Nav Links */}
      <div className="flex items-center">
        <nav
          className={`absolute left-0 lg:static space-y-6 ${
            openMenu ? "top-18" : "-top-80"
          } transition-all duration-300 bg-white z-20 px-5 pb-6 w-full lg:p-0 lg:w-fit lg:flex lg:items-center lg:space-y-0 lg:gap-16 shadow-md lg:shadow-none`}
        >
          <ul className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-16">
            {navLinks.map((link) => {
              const { id, href, label } = link;
              return (
                <li key={id}>
                  <Link
                    href={href}
                    className="font-medium text-[1.1rem] text-gray-700 lg:pb-1.5 hover:border-b"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={"/login"}
            className="inline-block bg-[#107bc0] hover:bg-[#9353e5] px-[2.4rem] py-[0.7rem] lg:px-12 lg:py-[0.8rem] rounded-md text-white text-[1.2rem] font-bold hover:opacity-80"
          >
            Login
          </Link>
        </nav>

        {/* Menu icon for mobile */}
        <button
          className="outline-none lg:hidden text-[1.8rem] text-[#107bc0]"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? <IoClose /> : <IoMenu />}
        </button>
      </div>
    </header>
  );
};

export default Header;
