"use client";

import SelectRole from "@/components/auth/select-role";
import { useRouter } from "next/navigation";

const GetStarted = () => {
  const navigate = useRouter();
  const selectRole = (role: "patient" | "doctor") => {
    navigate.push(`/register?role=${role}`);
  };
  return (
    <main>
      <section>
        <div className="font-Open-sans px-5 py-8 lg:px-8 lg:py-10">
          <div className="max-w-[800px] mx-auto text-center md:pb-4">
            <h1 className="font-semibold text-lg text-[#107BC0] md:text-[24px] lg:leading-[32.58px]">
              Select the one that best applies to you and Dive into a
              Personalized Experience!
            </h1>
          </div>

          {/* Select role */}
          <div className="max-w-[1000px] mx-auto flex justify-between gap-4 lg:gap-16 my-5">
            <SelectRole
              selectRole={selectRole}
              role="patient"
              label="Patients"
              description="get access to Doctor's, get personalized Treatment plans, Blood Sugar
                monitoring, download medical reports"
            />
            <SelectRole
              selectRole={selectRole}
              role="doctor"
              label="Doctors"
              description="monitor the treatment plans of patients, reschedule consultations, edit
                medical report, attend to emergencies"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default GetStarted;
