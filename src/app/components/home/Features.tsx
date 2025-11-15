import React from "react";
import FeaturesRow from "./FeaturesRow";
import { featuresList } from "@/app/constants/constants";

const Features = () => {
  return (
    <section>
      <div className="px-5 py-12 lg:px-12 space-y-[5rem] md:py-24 md:space-y-[8.5rem]">
        {featuresList.map((feature) => (
          <FeaturesRow key={feature.id} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default Features;
