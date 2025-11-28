"use client";

import { Dispatch, SetStateAction } from "react";
import { LuCross } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { TbLayoutGrid, TbReportAnalytics } from "react-icons/tb";
import {
  HiChat,
  HiClipboardCheck,
  HiOutlineChartPie,
  HiOutlineCog,
  HiOutlineFolderOpen,
  HiOutlineUsers,
  HiUserGroup,
} from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import TabLink from "./tab-link";
import LogoutButton from "@/app/(auth)/logout/page";
import { HiBookOpen, HiOutlineUser } from "react-icons/hi2";
import { BiCapsule } from "react-icons/bi";

type Props = {
  role: "patient" | "doctor" | "admin";
  openMenu?: boolean;
  setOpenMenu?: Dispatch<SetStateAction<boolean>>;
};

const Aside = ({ role, openMenu, setOpenMenu }: Props) => {
  const tabLinks = [
    {
      href: `/dashboard/${role}/`,
      label: "Dashboard",
      icon: <TbLayoutGrid className="text-[1.7rem]" />,
    },
    ...(role === "doctor"
      ? [
          {
            href: "/dashboard/doctor/patients",
            label: "Patients",
            icon: <HiOutlineUsers className="text-[1.7rem]" />,
          },
          {
            href: "/dashboard/doctor/appointments",
            label: "Appointments",
            icon: <HiClipboardCheck className="text-[1.7rem]" />,
          },
          {
            href: "/dashboard/doctor/messages",
            label: "Messages",
            icon: <HiChat className="text-[1.7rem]" />,
          },
          {
            href: "/dashboard/doctor/education",
            label: "Education",
            icon: <HiBookOpen className="text-[1.7rem]" />,
          },
        ]
      : role === "patient"
      ? [
          {
            href: "/dashboard/patient/logs",
            label: "Glucose Logs",
            icon: <TbReportAnalytics className="text-[1.7rem]" />,
          },
          {
            href: "/dashboard/patient/medications",
            label: "Medications",
            icon: <BiCapsule className="text-[1.7rem]" />,
          },
          {
            href: "/dashboard/patient/appointments",
            label: "Appointments",
            icon: <HiClipboardCheck className="text-[1.7rem]" />,
          },
          {
            href: "/dashboard/patient/messages",
            label: "Messages",
            icon: <HiChat className="text-[1.7rem]" />,
          },
          {
            href: "/dashboard/patient/education",
            label: "Education",
            icon: <HiBookOpen className="text-[1.7rem]" />,
          },
        ]
      : [
          {
            href: "/dashboard/admin/users-management",
            label: "Users Management",
            icon: <HiUserGroup className="text-[1.7rem]" />,
            subTabs: [
              {
                href: "/dashboard/admin/users-management/patients",
                label: "Patients",
                icon: <HiOutlineUsers className="text-[1.7rem]" />,
              },
              {
                href: "/dashboard/admin/users-management/doctors",
                label: "Doctors",
                icon: <LuCross className="text-[1.7rem]" />,
              },
            ],
          },
          {
            href: "/dashboard/admin/content-management",
            label: "Content Management",
            icon: <HiOutlineFolderOpen className="text-[1.7rem]" />,
          },
          {
            href: "/dashboard/admin/appointments",
            label: "Appointments",
            icon: <HiClipboardCheck className="text-[1.7rem]" />,
          },
          {
            href: "/dashboard/admin/doctors-kyc",
            label: "Doctor's KYC",
            icon: <FaRegUserCircle className="text-[1.7rem]" />,
          },
          {
            href: "/dashboard/admin/analytics",
            label: "Analytics",
            icon: <HiOutlineChartPie className="text-[1.7rem]" />,
          },
        ]),
    {
      href: `/dashboard/${role}/profile`,
      label: "Profile",
      icon: <HiOutlineUser className="text-[1.7rem]" />,
    },
    {
      href: `/dashboard/${role}/settings`,
      label: "Settings",
      icon: <HiOutlineCog className="text-[1.7rem]" />,
    },
  ];

  return (
    <aside
      className={`min-w-[250px] lg:min-w-[350px] w-full lg:w-fit min-h-[80vh] absolute top-0 lg:static ${
        openMenu ? "left-0" : "-left-320"
      } bg-[#000a] transition-all duration-500 z-20 lg:bg-[#094063]`}
    >
      <nav className="bg-[#094063] w-[80%] p-5 pb-[4rem] lg:w-full lg:p-8">
        {/* Logo container */}
        <div className="flex items-center justify-between">
          <Image
            src="/images/dashboard/dashboard-logo.svg"
            alt="Dia-cura Med logo"
            width={200}
            height={50}
            className=""
            priority
          />
          {setOpenMenu && (
            <AiOutlineClose
              className="text-[1.8rem] xl:hidden text-[#CFE5F2]"
              onClick={() => setOpenMenu(false)}
            />
          )}
        </div>
        <ul className="py-6 mt-8 mb-16 space-y-[1rem] lg:space-y-[1.3rem]">
          {tabLinks.map((link) => {
            if (!link.subTabs) {
              return (
                <li key={link.label} className="max-w-[500px]">
                  <TabLink href={link.href}>
                    {link?.icon}
                    <span>{link.label}</span>
                  </TabLink>
                </li>
              );
            } else {
              return (
                <li key={link.label} className="max-w-[500px]">
                  <TabLink href={link.href}>
                    {link?.icon}
                    <span>{link.label}</span>
                  </TabLink>

                  <ul className="pl-8">
                    {link.subTabs.map((sub) => (
                      <li key={sub.label}>
                        <TabLink href={sub.href}>
                          {sub.icon}
                          <span>{sub.label}</span>
                        </TabLink>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
          })}
        </ul>
        <LogoutButton />
      </nav>
    </aside>
  );
};

export default Aside;
