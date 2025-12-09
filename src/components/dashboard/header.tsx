"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";
import { HiChatBubbleOvalLeft, HiOutlineUser } from "react-icons/hi2";
import { IoMenu } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import Aside from "./aside";
import { UserInterface } from "@/models/Users";

type HeaderProp = {
  role: "patient" | "doctor" | "admin";
};
const Header = ({ role }: HeaderProp) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserInterface>({} as UserInterface);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/users/me");
      const data = await res.json();
      console.log(data.user);
      setUser(data.user);
      setLoading(true);
    };
    fetchUser();
  }, []);

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
          <h2 className="hidden lg:block text-[1.8rem] text-[#020D14] font-semibold leading-normal">
            {role.charAt(0).toLocaleUpperCase() + role.slice(1) + "'s"}{" "}
            Dashboard
          </h2>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-3">
          <div className="relative flex w-[2.818rem] text-[#0D67A0] h-[3rem] items-center justify-center rounded-[0.5rem]">
            <FaBell className="text-2xl lg:text-4xl" />
            <p className="px-2 py-2 rounded-full bg-[#CFE5F2] absolute top-[0.3rem] right-[0.7rem]"></p>
          </div>
          {["patient", "doctor"].includes(role) && (
            <Link
              href={`/dashboard/${role}/messages`}
              className="relative flex text-[#0D67A0] h-[3rem] items-center justify-center rounded-[0.5rem]"
            >
              <HiChatBubbleOvalLeft className="text-2xl lg:text-4xl" />
              <p className="px-2 py-2 rounded-full bg-[#CFE5F2] absolute top-[0.3rem] right-[0.7rem]"></p>
            </Link>
          )}

          {!loading ? (
            <p>Loading...</p>
          ) : (
            <>
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
                className={`w-[300px] bg-white px-[1rem] py-[1.5rem] absolute right-[1rem] z-20 ${
                  openProfile ? "top-[5rem]" : "-top-[30rem]"
                } space-y-[0.5rem] rounded-b-[0.5rem] shadow-lg transition-all duration-500 lg:static lg:shadow-none lg:p-0 lg:w-fit`}
              >
                <h3 className="text-base font-bold leading-normal text-[#262626]">
                  {`${user.firstName
                    .charAt(0)
                    .toLocaleUpperCase()}${user.firstName
                    .slice(1)
                    .toLocaleLowerCase()}
                    ${user.lastName
                      .charAt(0)
                      .toLocaleUpperCase()}${user.lastName
                    .slice(1)
                    .toLocaleLowerCase()}
                    `}
                </h3>
                <p className="text-[0.875rem] font-semibold text-[rgb(64,64,64)] lg:hidden">
                  {user.role.charAt(0).toLocaleUpperCase() + user.role.slice(1)}
                </p>

                <Link
                  href={`/dashboard/${role}/profile`}
                  className="lg:hidden flex gap-1"
                >
                  <HiOutlineUser className="text-[1.7rem]" />
                  <span>View profile</span>
                </Link>
                <button className="lg:hidden flex gap-1">
                  <MdLogout className="text-[1.7rem]" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </header>
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Aside openMenu={openMenu} setOpenMenu={setOpenMenu} role={role} />
      </div>
    </>
  );
};

export default Header;
