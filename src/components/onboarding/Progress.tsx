const Progress = ({ current }: { current: number }) => {
  return (
    <div className="max-w-[750px] mx-auto">
      {/* Steps */}
      <h3 className="text-[#020D14] text-[1.1rem] md:text-[1.5rem] font-semibold leading-normal mb-[1rem]">
        Step {current} of 3
      </h3>
      {/* Steps progress bar */}
      <ul className="flex items-center justify-center gap-[2px]">
        {[1, 2, 3].map((step) => (
          <li
            key={step}
            className={` w-1/3  h-[0.9375rem] ${
              step <= current ? "bg-[#107BC0]" : "bg-[#CFE5F2]"
            }`}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Progress;
