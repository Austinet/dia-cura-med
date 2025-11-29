import Link from "next/link";

const PatientsKycButtons = ({ previous }: { previous?: string }) => {
  return (
    <div className="flex justify-end items-center gap-[1rem]">
      {previous && (
        <Link
          href={`/${previous}`}
          className="flex items-center justify-center w-[8rem] md:w-[17.0625rem] h-[3rem] md:h-[3.5rem] rounded-[0.25rem] border-2 border-[#107BC0] text-[#107BC0] font-bold text-[1.25rem] hover:text-white hover:bg-[#107BC0] transition-all duration-300 ease-in-out"
        >
          Back
        </Link>
      )}

      <button
        type="submit"
        className="w-[8rem] md:w-[17.0625rem] h-[3rem] md:h-[3.5rem] rounded-[0.25rem] border-2 border-[#107BC0] text-white font-bold text-[1.25rem] bg-[#107BC0] hover:text-[#107BC0] hover:bg-transparent"
      >
        Next
      </button>
    </div>
  );
};

export default PatientsKycButtons;
