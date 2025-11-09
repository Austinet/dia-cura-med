// import Image from "next/image";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}
    </main>
  );
}
