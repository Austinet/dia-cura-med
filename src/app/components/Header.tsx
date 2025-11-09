// import { Link}
// import { FaTicketSimple } from "react-icons/fa6";
// import { IoMenu, IoClose } from "react-icons/io5";
"use client";
import Link from "next/link";
import { useState } from "react";

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
        <div className="flex items-center gap-[0.35rem] font-semibold text-[1.4rem] text-blue-700">
          <h2>DiaCura-Med</h2>
        </div>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center">
        <nav
          className={`absolute left-0 lg:static space-y-6 ${
            openMenu ? "top-16" : "-top-80"
          } transition-all duration-300 bg-white z-20 px-4 pb-6 w-full lg:p-0 lg:w-fit lg:flex lg:items-center lg:space-y-0 lg:gap-16 shadow-md lg:shadow-none`}
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
            className="inline-block bg-[#107bc0] hover:bg-[#9353e5] px-[2.4rem] py-[0.7rem] lg:px-10 lg:py-[0.85rem] rounded-[15px] text-white text-[1.2rem] font-bold hover:opacity-80"
          >
            Login
          </Link>
        </nav>

        {/* Menu icon for mobile */}
        <button
          className="outline-none lg:hidden"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {/* {openMenu ? (
            <IoClose className="text-[1.8rem]" />
          ) : (
            <IoMenu className="text-[1.8rem]" />
          )} */}
          Menu
        </button>
      </div>
    </header>
  );
};

export default Header;
