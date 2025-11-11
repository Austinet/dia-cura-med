import FAQs from "./components/home/FAQs";
import Features from "./components/home/Features";
import Hero from "./components/home/Hero";
import OurDoctors from "./components/home/OurDoctors";
import AboutUs from "./components/home/AboutUs";
import OurDashboard from "./components/home/OurDashboard";
import Testimonials from "./components/home/Testimonials";

export default function Home() {
  return (
    <main>
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
