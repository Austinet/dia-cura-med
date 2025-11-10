import Link from "next/link";
import React from "react";

type ButtonLinkProps = {
  label: string;
  href: string;
  className?: string;
};
const ButtonLink = ({ label, href, className }: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={`${className} inline-block text-white font-bold bg-[#107BC0] hover:bg-[#9353e5] rounded-md text-lg sm:text-[20px] justify-center px-[2rem] py-[0.8rem]`}
    >
      {label}
    </Link>
  );
};

export default ButtonLink;
