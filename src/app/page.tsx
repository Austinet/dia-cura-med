import ContactUs from "./components/home/ContactUs";
import FAQs from "./components/home/FAQs";
import Features from "./components/home/Features";
import Hero from "./components/home/Hero";
import OurDoctors from "./components/home/OurDoctors";
import AboutUs from "./components/home/AboutUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Features />
      <OurDoctors />
      <FAQs />
      <ContactUs />
    </main>
  );
}
