import AnimateOnScroll from "@/components/animation/animate-on-scroll";
import AboutUs from "@/components/home/about-us";
import FAQs from "@/components/home/faqs";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import OurDashboard from "@/components/home/our-dashboard";
import OurDoctors from "@/components/home/our-doctors";
import Testimonials from "@/components/home/testimonials";

export default function Home() {
  return (
    <AnimateOnScroll>
      <Hero />
      <AboutUs />
      <Features />
      <OurDashboard />
      <OurDoctors />
      <FAQs />
      <Testimonials />
    </AnimateOnScroll>
  );
}
