"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { FaBell } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

type HeaderProp = {
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  role: "patient" | "doctor" | "admin";
};
const Header = ({ setOpenMenu, role }: HeaderProp) => {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <header className="p-5 relative w-full flex justify-between items-center lg:p-8 shadow">
        {/* Logo container mobile */}
        <div className="flex items-center gap-[0.7rem]">
          {/* Menu icon for mobile */}
          <button
            className="outline-none lg:hidden"
            onClick={() => setOpenMenu(true)}
          >
            <IoMenu className="text-[1.8rem]" />
          </button>
          <Image
            src="/images/dashboard/logo.svg"
            alt="Dia-cura Med logo"
            width={120}
            height={38}
            className="lg:hidden"
            priority
          />
          <h1 className="hidden lg:block text-[1.25rem] lg:text-[2rem] text-[#020D14] font-semibold leading-normal">
            {role.charAt(0).toLocaleUpperCase() + role.slice(1) + "'s"}{" "}
            Dashboard
          </h1>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-3">
          <div className="relative flex w-[2.818rem] h-[3rem] bg-transparent-blue items-center justify-center rounded-[0.5rem]">
            <FaBell className="text-2xl lg:text-4xl" />
            <p className="px-2 py-2 rounded-full bg-red-500 absolute top-[0.3rem] right-[0.7rem]"></p>
          </div>
          <div onClick={() => setOpenProfile(!openProfile)}>
            <Image
              src="/images/dashboard/face.svg"
              alt="profile picture"
              width={120}
              height={38}
              className="rounded-full w-[2.5rem] h-[2.5rem] lg:w-[4rem] lg:h-[4rem]"
              priority
            />
          </div>

          {/* User card */}
          <div
            className={`w-[320px] bg-white px-[1rem] py-[2rem] absolute right-[1rem] z-20 ${
              openProfile ? "top-[3rem]" : "-top-[30rem]"
            } space-y-[0.5rem] rounded-b-[0.5rem] shadow-lg transition-all duration-500 lg:static lg:shadow-none lg:p-0 lg:w-fit`}
          >
            <h3 className="text-base font-bold leading-normal text-[#262626]">
              Austine Ogaga Udhe
            </h3>
            <p className="text-[0.875rem] font-semibold text-[#404040]">
              ID: DM-PA-1234
            </p>
            <p className="text-[0.875rem] font-semibold text-[#404040] lg:hidden">
              {role.charAt(0).toLocaleUpperCase() + role.slice(1)}
              Admin
            </p>
            <button className="lg:hidden inline-flex">View profile</button>
            <button className="lg:hidden inline-flex">Logout</button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
