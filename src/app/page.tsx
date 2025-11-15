"use client";
import FAQs from "./components/home/FAQs";
import Features from "./components/home/Features";
import Hero from "./components/home/Hero";
import OurDoctors from "./components/home/OurDoctors";
import AboutUs from "./components/home/AboutUs";
import OurDashboard from "./components/home/OurDashboard";
import Testimonials from "./components/home/Testimonials";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {
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
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <AboutUs />
      <Features />
      <OurDashboard />
      <OurDoctors />
      <FAQs />
      <Testimonials />
    </main>
  );
}
