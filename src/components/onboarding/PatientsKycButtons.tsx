import Link from "next/link";

const PatientsKycButtons = ({ previous }: { previous: string }) => {
  return (
    <div className="flex justify-end items-center gap-[1rem]">
      <Link href={`/${previous}`}>
        <button
          type="button"
          className="w-[8rem] md:w-[17.0625rem] h-[3rem] md:h-[3.5rem] rounded-[0.25rem] border border-primary-color-light-blue-300 text-primary-color-light-blue-300 font-bold text-[1.25rem] hover:text-white hover:bg-primary-color-light-blue-300 transition-all duration-300 ease-in-out"
        >
          Back
        </button>
      </Link>
      <button
        type="submit"
        className="w-[8rem] md:w-[17.0625rem] h-[3rem] md:h-[3.5rem] rounded-[0.25rem] border bg-[#107BC0] text-white font-bold text-[1.25rem] bg-primary-color-light-blue-300 hover:text-primary-color-light-blue-300 hover:bg-transparent"
      >
        Next
      </button>
    </div>
  );
};

export default PatientsKycButtons;
