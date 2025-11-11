import Image from "next/image";
import ButtonLink from "../ui/ButtonLink";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const OurDoctors = () => {
  return (
    <section>
      <div className="max-w-[35rem] mx-auto px-5 my-[4rem] lg:my-[6.5rem] lg:max-w-[75.0625rem]">
        <div className="text-center">
          <h2 className="text-[1.5rem] lg:text-[2.8rem] font-bold leading-normal mb-[2.5rem] lg:mb-[5.56rem]">
            Our Doctors
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-[2rem] lg:gap-[3.38rem] lg:border lg:border-[#CCC] lg:rounded-[0.875rem] lg:shadow-md">
          <div className="lg:w-[30.5rem] lg:h-[26.9325rem]">
            <Image
              src="/images/home/smiling-doctor.jpg"
              alt="A doctor smiling"
              width={1000}
              height={1000}
              className="w-full lg:h-full rounded-2xl lg:rounded-l-[0.875rem] lg:rounded-r-none"
            />
          </div>
          <div className="lg:w-[40.5625rem] md:px-5">
            <h4 className="text-[#232323] text-[1.125rem] lg:text-[1.3rem] font-bold leading-normal mb-[0.5rem] lg:mb-[0.88rem]">
              Counsellor
            </h4>
            <h3 className="text-[#232323] text-[1.5rem] lg:text-[2rem] font-bold leading-normal mb-[1.5rem]">
              Dr. Michael Jons
            </h3>
            <p className="text-[#666] text-base lg:text-[1.25rem] font-semibold lg:font-normal leading-normal mb-[2.25rem] lg:mb-[2.5rem]">
              Provide expert advice on medical and healthcare issues to
              individuals, organizations, or healthcare facilities. Evaluate and
              suggest improvements to enhance the quality and efficiency of
              healthcare services.
            </p>
            <ButtonLink href="/" label="Learn more" />
          </div>
        </div>
        <div className="mt-[2.25rem] lg:mt-[3.75rem] flex items-center justify-between">
          <div className="w-[71px]"></div>
          <div className="">...</div>
          <div className="flex items-center gap-[1.12rem] text-white">
            <button className="bg-[#062D45] w-[1.625rem] h-[1.625rem] rounded-full flex items-center justify-center cursor-pointer">
              <FaChevronLeft />
            </button>
            <button className="bg-[#062D45] w-[1.625rem] h-[1.625rem] rounded-full flex items-center justify-center cursor-pointer">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurDoctors;
