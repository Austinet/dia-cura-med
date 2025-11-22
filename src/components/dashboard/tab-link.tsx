import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Prop = {
  children: React.ReactNode;
  href: string;
};
const TabLink = ({ children, href }: Prop) => {
  const pathname = usePathname();
  const active =
    pathname === href ||
    pathname + "/" === href ||
    pathname.startsWith(href + "/");
  
  return (
    <Link
      href={href}
      className={`${
        active ? "bg-[#CFE5F2] text-[#094063]" : "text-[#CFE5F2]"
      } py-3 px-4 md:py-4 md:px-5 flex items-center gap-2 w-full rounded-lg font-medium text-[1.1rem] md:text-[1.2rem] hover:bg-[#CFE5F2]  hover:text-[#094063] mb-2`}
    >
      {children}
    </Link>
  );
};

export default TabLink;
