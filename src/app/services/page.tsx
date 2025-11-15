import Image from "next/image";
import Lorem from "../components/home/Lorem";
import { featuresList } from "../constants/constants";
import ButtonLink from "../components/ui/ButtonLink";

const page = () => {
  return (
    <main className="px-5 pt-4 lg:px-12 lg:pt-8 max-w-[1000px] mx-auto">
      <section>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#062D45] md:text-3xl mb-4 md:mb-8">
            Services
          </h1>
        </div>
      </section>
      {featuresList.map((service) => {
        const { id, img, title, description } = service;
        return (
          <section key={id} className="space-y-5 mb-[4rem] md:space-y-7">
            <figure>
              <Image
                src={img.src}
                alt={img.alt}
                width={1000}
                height={600}
                className="w-full h-auto max-h-[550px] object-cover object-left-top "
              />
            </figure>
            <div className="space-y-3 md:space-y-5">
              <h2 className="text-[#232323] text-[24px] font-bold font-Open-sans lg:text-[38px] leading-none">
                {title}
              </h2>
              <p className="font-normal font-Open-sans text-[#232323] lg:text-[22px] lg:leading-10">
                {description}
              </p>
            </div>
            <Lorem />
            <ButtonLink
              label="Get Started"
              href="/auth/get-started"
              className=""
            />
          </section>
        );
      })}
    </main>
  );
};

export default page;
