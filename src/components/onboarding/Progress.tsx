const progressBar = [
  {
    step: 1,
  },
  {
    step: 2,
  },
  {
    step: 3,
  },
  {
    step: 4,
  },
  {
    step: 5,
  },
  {
    step: 6,
  },
];

const Progress = ({ current }: { current: number }) => {
  return (
    <div>
      {/* Steps */}
      <h3 className="text-[#020D14] text-[1.1rem] md:text-[1.5rem] font-semibold leading-normal mb-[1rem]">
        Step {current} of 6
      </h3>
      {/* Steps progress bar */}
      <ul className="flex items-center justify-center gap-[2px]">
        {progressBar.map((step) => (
          <li
            key={step.step}
            className={`max-w-[8.1875rem] w-1/6 h-[0.9375rem] ${
              step.step <= current ? "bg-[#107BC0]" : "bg-[#CFE5F2]"
            }`}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Progress;
