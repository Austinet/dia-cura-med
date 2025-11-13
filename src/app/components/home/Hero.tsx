import ButtonLink from "../ui/ButtonLink";
import Image from "next/image";

const Hero = () => {
  return (
    <section>
      <div className="px-5 py-8 flex flex-col gap-4 md:flex-row-reverse md:justify-between md:items-center lg:py-[4rem] lg:px-8">
        <figure>
          {/* Mobile Screen */}
          <div className="md:hidden relative">
            <Image
              className="w-full h-auto object-cover"
              src="/images/home/hero-sm.png"
              alt="Doctor taking care of a patient"
              width={500}
              height={500}
            />

            <div className="absolute bottom-[2rem] left-[2rem] bg-white rounded-md p-3 space-y-1.5  shadow">
              <p className="flex items-center gap-2">
                <span className="inline-block w-[15px] h-[15px] bg-[#062D45] rounded-full shadow"></span>{" "}
                <span className="text-[16px] text-[#868686] font-normal font-Open-sans">
                  24/7 Healthcare Provision
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="inline-block w-[15px] h-[15px] bg-[#062D45] rounded-full shadow"></span>{" "}
                <span className="text-[16px] text-[#868686] font-normal font-Open-sans">
                  Expert Doctors
                </span>
              </p>
            </div>
          </div>

          {/* Large Screen */}
          <div className="hidden md:block">
            <Image
              className="w-full h-auto object-cover md:min-w-[350px] lg:min-w-[500px] xl:min-w-[600px]"
              src="/images/home/hero.png"
              alt="Doctor taking care of a patient"
              width={500}
              height={500}
            />
          </div>
        </figure>

        <div className="space-y-3.5 max-w-[500px] lg:space-y-5 xl:max-w-[620px] text-center md:text-left">
          <h2 className="font-Open-sans font-extrabold text-base lg:text-[24px]">
            Welcome onboard
          </h2>
          <h1 className="text-[30px] text-[#062D45] leading-11 font-Open-sans font-extrabold lg:leading-[62px] lg:text-[48px] max-w-[530px]">
            Get Expert Medical Help With Diabetes From Us
          </h1>
          <p className="font-normal font-Open-sans text-[#868686] lg:text-[20px]">
            Welcome to DiaCura-Med, redefining diabetes management. Discover
            personalized solutions, expert guidance, and a supportive community.
            Take control with intuitive tools. Your wellness starts here.
          </p>
          <ButtonLink
            label="Get Started"
            href="/get-started"
            className="mt-[1rem] lg:mt-[1.5rem]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
