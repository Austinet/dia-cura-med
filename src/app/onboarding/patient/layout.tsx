import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/dashboard/footer";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DiaCura Med | DashboardLayoutLayout",
  description:
    "Welcome to DiaCura-Med, redefining diabetes management. Discover personalized solutions, expert guidance, and a supportive community. Take control with intuitive tools. Your wellness starts here.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased max-w-[1440px] mx-auto`}
      >
        <Toaster position="top-right" reverseOrder={false} />
        {children}
        <Footer />
      </body>
    </html>
 Dashboardoard
