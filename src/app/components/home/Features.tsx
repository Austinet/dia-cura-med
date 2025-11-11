import React from "react";
import FeaturesRow from "./FeaturesRow";

const featuresList = [
  {
    id: 1,
    title: "Counseling Services",
    description:
      "Detailed counseling on prescribed medications, including dosage instructions, potential side effects, and the importance of adherence to the prescribed treatment plan.",
    link: {
      label: "Learn More",
      url: "/",
    },
    img: {
      src: "/images/home/counseling.png",
      alt: "A doctor counseling a patient",
    },
    className: "md:flex-row-reverse",
  },
  {
    id: 2,
    title: "Health Education",
    description:
      "Empower yourself with our app's Health Education. Access articles for insights on diabetes management, nutrition, and lifestyle. Your wellness journey starts with knowledge at your fingertips.",
    link: {
      label: "Learn More",
      url: "/",
    },
    img: {
      src: "/images/home/education.png",
      alt: "A patient listening to a nurse",
    },
    className: "md:flex-row",
  },
  {
    id: 3,
    title: "Diet plans",
    description:
      "Tailor your diabetes journey with personalized diet plans on our app. Access curated, diabetes-friendly recipes, and nutritional tips to help you make informed choices for a healthier lifestyle.",
    link: {
      label: "Learn More",
      url: "/",
    },
    img: {
      src: "/images/home/diet.png",
      alt: "A couple preparing a meal according to instructions",
    },
    className: "md:flex-row-reverse",
  },
];

const Features = () => {
  return (
    <section>
      <div className="px-5 py-12 lg:px-8 space-y-[5rem] md:py-24 md:space-y-[8.5rem]">
        {featuresList.map((feature) => (
          <FeaturesRow key={feature.id} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default Features;
