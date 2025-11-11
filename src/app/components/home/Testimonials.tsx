import Image from "next/image";
import ButtonLink from "../ui/ButtonLink";
import { FaQuoteRight } from "react-icons/fa6";

const Testimonials = () => {
  return (
    <section>
      <div className="relative bg-[#F5FBFE] text-center py-[4rem] px-5 lg:flex justify-between items-center lg:gap-[5.62rem] lg:px-8 lg:py-[7rem] lg:text-left">
        <div className="lg:max-w-[29.375rem]">
          <h2 className="text-[1.5rem] text-[#020D14] font-bold mb-[1.5rem] lg:mb-[2.44rem] xl:text-[2.5rem] leading-[1.2]">
            Check out what our clients are saying about us.
          </h2>
          <p className="text-[1.25rem] lg:text-[1.125rem] text-[#666] font-semibold lg:font-bold leading-normal mb-[4rem] lg:mb-[2.5rem] lg:max-w-[16.3125rem]">
            So what are you waiting for? join us now.
          </p>
          <div className="absolute lg:static left-0 bottom-[5.06rem] flex justify-center lg:justify-start w-full">
            <ButtonLink href="/get-started" label="Get started" />
          </div>
        </div>
        <div className="pb-[6.56rem] flex flex-col lg:flex-row gap-[3.38rem] lg:gap-[0.81rem] items-center lg:pb-[3rem]">
          <div className="relative z-20 bg-white w-[19.625rem] rounded-[2.375rem] shadow-testimonialBox shadow px-[2rem] pt-[6.81rem] text-center">
            <div className="flex flex-col gap-[0.69rem] items-center mb-[0.81rem] absolute top-[-1.88rem] left-0 w-full">
              <Image
                src="/images/home/testimony.svg"
                alt="Users testimony"
                width={90}
                height={90}
                className=""
              />
              <FaQuoteRight className="text-2xl text-[#107BC0]" />
            </div>
            <div className="pb-[3.44rem] ">
              <h3 className="text-[1.25rem] text-[#020D14] font-bold leading-normal mb-[1.88rem]">
                John Eze
              </h3>
              <p className="text-base text-[#999] font-semibold leading-normal">
                &quot;Transformative! This app made managing my diabetes
                seamless. Personalized plans, expert guidance, and a supportive
                community. Grateful for this game-changer!&quot;
              </p>
            </div>
          </div>
          <div className="relative z-20 bg-white w-[19.625rem] rounded-[2.375rem] shadow-testimonialBox shadow px-[2rem] pt-[6.81rem] text-center">
            <div className="flex flex-col gap-[0.69rem] items-center mb-[0.81rem] absolute top-[-1.88rem] left-0 w-full">
              <Image
                src="/images/home/testimony1.svg"
                alt="Users testimony"
                width={90}
                height={90}
                className=""
              />
              <FaQuoteRight className="text-2xl text-[#107BC0]" />
            </div>
            <div className="pb-[3.44rem] ">
              <h3 className="text-[1.25rem] text-[#020D14] font-bold leading-normal mb-[1.88rem]">
                Sarah Alex
              </h3>
              <p className="text-base text-[#999] font-semibold leading-normal">
                &quot;As a long-time diabetes warrior, Diacura has
                revolutionized my approach. The comprehensive tracking, expert
                advice, and vibrant community inspire me daily.&quot;
              </p>
            </div>
          </div>
          {/* background vectors  */}
          <div className="hidden lg:block absolute right-0 top-[0.7rem] z-10">
            <Image
              src="/images/home/dash.png"
              alt="background"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
