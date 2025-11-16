import Image from "next/image";

type SelectRoleProps = {
  selectRole: (role: string) => void;
  role: "PATIENT" | "DOCTOR";
  label: string;
  description: string;
};

const SelectRole = ({
  selectRole,
  role,
  label,
  description,
}: SelectRoleProps) => {
  return (
    <button
      onClick={() => selectRole(role)}
      className="hover:border-2 hover:border-[#107BC0] bg-[#BBE1F61A] p-4 rounded-lg shadow flex flex-col items-center gap-4 md:py-6"
    >
      <Image
        src={`/images/auth/for-${label.toLowerCase()}.svg`}
        alt={`Get started for ${label}`}
        width={300}
        height={300}
        className="object-cover object-center w-full max-w-[300px] h-auto max-h-[300px]"
      />
      <div className="">
        <h4 className="text-lg text-[#107BC0] font-bold lg:mb-3">
          For {label}
        </h4>
        <p className="hidden md:block text-lg">
          Get access to your dashboard where you can {description} and many
          more.
        </p>
      </div>
    </button>
  );
};

export default SelectRole;
