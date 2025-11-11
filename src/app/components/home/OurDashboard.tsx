import Image from "next/image";

const OurDashboard = () => {
  return (
    <section>
      <div className="bg-[#094063] px-5 py-[3rem] lg:px-[2.19rem] lg:pt-[5.31rem] lg:pb-[7.06rem] space-y-[2.5rem] lg:gap-[6rem] text-center">
        <div className="text-white max-w-[56.75rem] mx-auto">
          <h2 className="text-[1.5rem] font-bold leading-normal mb-[1.2rem] lg:text-[3rem] lg:font-extrabold">
            Our Dashboard
          </h2>
          <p className="text-base font-semibold leading-normal lg:text-[1.5rem] lg:font-normal">
            We offer in-depth healthcare to individuals of all kinds suffering
            from Diabetes via diagnosis, treatment prescriptions, follow-up and
            even health education
          </p>
        </div>
        <div>
          <Image
            src="/images/home/dashboard.png"
            alt="Dashboard for users"
            width={1000}
            height={1000}
            className="w-full max-w-[72.6875rem] mx-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default OurDashboard;
