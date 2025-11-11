import {
  FaLock,
  FaThumbsUp,
  FaUserDoctor,
  FaUserInjured,
} from "react-icons/fa6";

const aboutUsDetails = [
  {
    id: 1,
    icon: <FaUserDoctor />,
    rating: "1k+",
    title: "Experienced Doctors",
    description: "Highly Qualified",
  },
  {
    id: 2,
    icon: <FaThumbsUp />,
    rating: "79.65%",
    title: "Positive Reviews",
    description: "From our patients",
  },
  {
    id: 3,
    icon: <FaLock />,
    rating: "100%",
    title: "Security",
    description: "for all user infomation",
  },
  {
    id: 4,
    icon: <FaUserInjured />,
    rating: "5.3k+",
    title: "Treated",
    description: "Number Of Patients",
  },
];

const AboutUs = () => {
  return (
    <section className="bg-[#094063] mt-10">
      <div className="px-5 py-10 space-y-8 w-fit mx-auto lg:space-y-12 lg:py-20">
        <div>
          <h2 className="text-[20px] font-Open-sans font-extrabold text-white text-center lg:text-[36px]">
            Why should you trust us? <br /> Get to know about us.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-8 lg:pb-12">
          {aboutUsDetails.map((aboutUsDetail) => {
            const { id, icon, title, description, rating } = aboutUsDetail;
            return (
              <div
                key={id}
                className="bg-white text-[#062D45] text-center shadow-lg rounded-lg py-5 px-[0.65rem] max-w-[254px] lg:py-8 lg:px-4 lg:rounded-2xl"
              >
                <div className="bg-[#CFE5F2] inline-block p-3 text-[20px] rounded-full mb-1">
                  {icon}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[20px] font-Open-sans font-extrabold lg:text-[32px]">
                    {rating}
                  </h4>
                  <h3 className="text-[14px] font-bold font-Open-sans lg:text-[20px]">
                    {title}
                  </h3>
                  <p className="text-[14px] font-normal font-Open-sans lg:text-base">
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
