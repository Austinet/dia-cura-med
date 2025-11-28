import Image from "next/image";
import Progress from "@/components/onboarding/Progress";

type Props = {
  children: React.ReactNode;
  heading: string;
  current: number;
};

const PatientKYC = ({ children, heading, current }: Props) => {
  return (
    <div className="bg-[#F6FCFF] py-[1.75rem] px-[1.5rem] md:pt-[1.75rem] md:pb-[6.56rem] md:px-[3.75rem]">
      {/* Header */}
      <div className="pb-[1.5rem] md:pb-[2.5rem]">
        {/* Logo container */}
        <Image
          className=""
          src="/images/logo.svg"
          alt="Dia-cura Med logo"
          width={180}
          height={38}
          priority
        />
      </div>
      <div
        className={`max-w-[70.8125rem] mx-auto mb-[2.69rem] ${
          current === 1 ? "" : "md:mb-[3.81rem]"
        } text-center`}
      >
        <h1 className="text-primary-color-light-blue-300 text-[1.2rem] md:text-[1.6rem] font-semibold leading-normal mb-[1.5rem] md:mb-[2rem]">
          {heading}
        </h1>

        {/* Steps progress bar */}
        <Progress current={current} />
      </div>

      {children}
    </div>
  );
};

export default PatientKYC;
