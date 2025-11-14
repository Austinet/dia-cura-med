import Image from "next/image";
import ButtonLink from "../ui/ButtonLink";

type FeaturesRowProps = {
  id: number;
  title: string;
  description: string;
  link: {
    label: string;
    url: string;
  };
  img: {
    src: string;
    alt: string;
  };
  className?: string;
};

const FeaturesRow = ({
  title,
  description,
  link,
  img,
  className,
}: FeaturesRowProps) => {
  return (
    <section
      className={`flex gap-5 flex-col md:gap-10 md:justify-between md:items-center ${className}`}
    >
      <figure>
        <Image
          src={img.src}
          alt={img.alt}
          width={500}
          height={500}
          className="w-full h-auto md:min-w-[400px] lg:w-[500px]"
        />
      </figure>
      <div className="space-y-5 md:max-w-[590px]">
        <h2 className="text-[#232323] text-[24px] font-bold font-Open-sans lg:text-[38px] leading-none">
          {title}
        </h2>
        <p className="font-normal font-Open-sans text-[#232323] lg:text-[22px] lg:leading-10">
          {description}
        </p>
        <ButtonLink
          href={link.url}
          label={link.label}
          className="mt-3 md:mt-5"
        />
      </div>
    </section>
  );
};

export default FeaturesRow;
