import Image from "next/image";
import Link from "next/link";
import { quickLinks, termsLinks } from "../constants/constants";
import {
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaSquareYoutube,
  FaXTwitter,
} from "react-icons/fa6";

const socialLinks = [
  {
    id: 1,
    icon: <FaLinkedinIn />,
    label: "LinkedIn",
    url: "/",
  },
  {
    id: 2,
    icon: <FaFacebookF />,
    label: "Facebook",
    url: "/",
  },
  {
    id: 3,
    icon: <FaXTwitter />,
    label: "X",
    url: "/",
  },
  {
    id: 4,
    icon: <FaInstagram />,
    label: "Instagram",
    url: "/",
  },
  {
    id: 5,
    icon: <FaSquareYoutube />,
    label: "YouTube",
    url: "/",
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#094063]">
      <div className="px-5 py-8 lg:px-8 lg:py-14">
        <div className="mb-4 lg:mb-6">
          {/*Footer logo*/}
          <Image
            src="/images/footer-logo.svg"
            alt="DiaCura-Med Logo"
            width={238}
            height={50}
            className="w-[200px] lg:w-[238px] h-auto"
          />
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-white text-[20px] font-bold mb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => {
                const { id, href, label } = link;
                return (
                  <li key={id}>
                    <Link
                      href={href}
                      className="text-[#dee5e9] hover:text-white text-lg font-medium"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-white text-[20px] font-bold mb-2">Terms</h3>
            <ul className="space-y-2">
              {termsLinks.map((link) => {
                const { id, href, label } = link;
                return (
                  <li key={id}>
                    <Link
                      href={href}
                      className="text-[#dee5e9] hover:text-white text-lg font-medium"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-white text-[20px] font-bold mb-2">
              Connect with Us
            </h3>
            <ul className="space-y-2 ">
              {socialLinks.map((link) => {
                const { id, label, url, icon } = link;
                return (
                  <li key={id}>
                    <Link
                      href={url}
                      className="text-[#dee5e9] hover:text-white text-lg font-medium flex items-center gap-4"
                    >
                      {icon}
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="space-y">
            <h3 className="text-white text-[20px] font-bold mb-2">
              Find out more about us
            </h3>
            <p className="text-white">
              Subscribe to our newsletter to receive the latest updates and
              information about DiaCura-Med.
            </p>
            <form className="flex items-center gap-2 pt-2">
              <input
                className="bg-white w-full px-2 h-12 rounded-md outline-none border-none text-black placeholder:font-medium"
                placeholder="Enter your email address"
                type="email"
                required
              />
              <button className="bg-[#107bc0] hover:bg-[#9353e5] text-white h-12 rounded-sm flex items-center px-4">
                <FaArrowRight />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center p-5">
        <p className="font-medium text-base text-white">
          &copy; DiaCura-med {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
