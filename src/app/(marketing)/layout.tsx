import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DiaCura Med",
    template: "DiaCura Med | %s",
  },
  description:
    "Welcome to DiaCura-Med, redefining diabetes management. Discover personalized solutions, expert guidance, and a supportive community. Take control with intuitive tools. Your wellness starts here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased max-w-[1440px] mx-auto`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
