"use client";
import Image from "next/image";
import ButtonLink from "../ui/ButtonLink";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
const doctors = [
  {
    id: 1,
    name: "Austine Doe",
    role: "Counsellor",
    duties: `Provide expert advice on medical and healthcare issues to
            individuals, organizations, or healthcare facilities. Evaluate
            and suggest improvements to enhance the quality and efficiency
            of healthcare services.`,
    picture: "/images/home/smiling-doctor.jpg",
  },
  {
    id: 2,
    name: "Michael Jons",
    role: "Counsellor",
    duties: `Provide expert advice on medical and healthcare issues to
            individuals, organizations, or healthcare facilities. Evaluate
            and suggest improvements to enhance the quality and efficiency
            of healthcare services.`,
    picture: "/images/home/smiling-doctor.jpg",
  },
  {
    id: 3,
    name: "Grace Doe",
    role: "Counsellor",
    duties: `Provide expert advice on medical and healthcare issues to
            individuals, organizations, or healthcare facilities. Evaluate
            and suggest improvements to enhance the quality and efficiency
            of healthcare services.`,
    picture: "/images/home/smiling-doctor.jpg",
  },
];

const OurDoctors = () => {
  return (
    <section>
      <div className="max-w-[35rem] mx-auto px-5 my-[4rem] lg:my-[6.5rem] lg:max-w-[75.0625rem] relative">
        <div className="text-center">
          <h2 className="text-[1.5rem] lg:text-[2.8rem] font-bold leading-normal mb-[2.5rem] lg:mb-[5.56rem]">
            Our Doctors
          </h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          className="max-w-[350px] h-[700px] mx-auto lg:w-full lg:max-w-full lg:h-[510px]"
        >
          {doctors.map((doctor) => {
            const { id, name, role, duties, picture } = doctor;
            return (
              <SwiperSlide key={id}>
                <div className="flex flex-col lg:flex-row items-center gap-[2rem] lg:gap-[3.38rem] lg:border lg:border-[#CCC] lg:rounded-[0.875rem] lg:shadow-md">
                  <div className="lg:w-[30.5rem] lg:h-[26.9325rem] w-full">
                    <Image
                      src={picture}
                      alt="A doctor smiling"
                      width={1000}
                      height={1000}
                      className="w-full h-auto lg:h-full rounded-2xl lg:rounded-l-[0.875rem] lg:rounded-r-none object-cover"
                    />
                  </div>
                  <div className="lg:w-[40.5625rem] md:px-5">
                    <h4 className="text-[#232323] text-[1.125rem] lg:text-[1.3rem] font-bold leading-normal mb-[0.5rem] lg:mb-[0.88rem]">
                      {role}
                    </h4>
                    <h3 className="text-[#232323] text-[1.5rem] lg:text-[2rem] font-bold leading-normal mb-1.5 lg:mb-[1.5rem]">
                      Dr. {name}
                    </h3>
                    <p className="text-[#666] text-base lg:text-[1.25rem] font-semibold lg:font-normal leading-normal mb-[2.25rem] lg:mb-[2.5rem]">
                      {duties}
                    </p>
                    <ButtonLink
                      label="Get Started"
                      href="/auth/get-started"
                      className=""
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="justify-end flex items-center gap-[1.12rem] text-white absolute bottom-[0.5rem] right-5">
          <button className="custom-prev bg-[#062D45] hover:bg-[#062D4599] w-[1.625rem] h-[1.625rem] rounded-full flex items-center justify-center cursor-pointer">
            <FaChevronLeft />
          </button>
          <button className="custom-next bg-[#062D45] hover:bg-[#062D4599] w-[1.625rem] h-[1.625rem] rounded-full flex items-center justify-center cursor-pointer">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurDoctors;
