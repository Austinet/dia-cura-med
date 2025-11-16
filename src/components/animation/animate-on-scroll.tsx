"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const AnimateOnScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const initAOS = async () => {
      await import("aos");
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: true,
        anchorPlacement: "top-bottom",
      });
    };

    initAOS();
  }, []);
  return <main className="overflow-x-hidden">{children}</main>;
};

export default AnimateOnScroll;
