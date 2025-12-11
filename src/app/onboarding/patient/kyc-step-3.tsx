"use client";
import { useState } from "react";
import PatientKYC from "@/components/onboarding/patients-kyc-wrapper";
import { useOnboardingContext } from "@/hooks/usePatientOnboardingContext";
import ErrorMessage from "@/components/forms/error";

type Props = {
  handleCompleted: () => void;
  loading: boolean;
  serverResponse: string;
};

const PatientsKycStepOne = ({
  handleCompleted,
  loading,
  serverResponse,
}: Props) => {
  const { user, prev } = useOnboardingContext();
  const [fullName, setFullName] = useState("");
  const [formError, setFormError] = useState(false);

  //Validates user inputs fields
  const validateField = () => {
    const userFullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    if (fullName.toLocaleLowerCase() !== userFullName) {
      setFormError(true);
    } else {
      setFormError(false);
    }
  };

  //Handle form submission and validate form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formError) {
      return handleCompleted();
    }
  };

  return (
    <section>
      <PatientKYC current={3}>
        {/* Personal information */}
        <div className="max-w-[65rem] mx-auto py-[2rem] md:px-[2rem] lg:px-[3.88rem] rounded-[1.25rem] bg-light-blue shadow-xxl">
          <h2 className="text-[#107BC0] text-[1.2rem] md:text-[1.5rem] font-semibold leading-normal mb-[2rem]">
            Consent and Agreement
          </h2>
          {/* Server response errors */}
          {serverResponse && (
            <p className="text-xl font-semibold text-red-600 text-center">
              {serverResponse}
            </p>
          )}

          {/* Form container */}
          <form onSubmit={handleSubmit}>
            <div className=" ">
              <p className="font-Open-sans font-normal lg:text-[20px] lg:mt-[20px]">
                I,{" "}
                <span className="text-[#107BC0]">
                  [
                  <input
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="text-[#107BC0] outline-none"
                    type="text"
                    onInput={validateField}
                    onBlur={validateField}
                    placeholder="Your Full name"
                    required
                  />
                  ]
                </span>
                , hereby consent to Diacura-Med’s terms and conditions. I
                understand that the information provided is confidential and
                will be used for the purpose of managing my diabetes related
                services.{" "}
              </p>
              <ErrorMessage
                message="Enter your full name above, beginning with your first name"
                trigger={formError}
              />
              <div className="flex gap-2 lg:mt-[40px] mt-[1.5rem] font-Open-sans">
                <input type="checkbox" className="w-[20px] h-[20px]" />
                <p className="font-Opens-sans">
                  I agree to receive important notifications and updates via
                  email.
                </p>
              </div>
              <div className="flex gap-2 lg:mt-[20px]">
                <input type="checkbox" className="w-[20px] h-[20px]" />
                <p className="font-Open-sans">
                  I agree to receive promotional materials related to diabetes
                  management products and services.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-6 mt-6">
              <button
                onClick={prev}
                type="button"
                className="flex items-center justify-center w-[8rem] md:w-[17.0625rem] h-[3rem] md:h-[3.5rem] rounded-[0.25rem] border-2 border-[#107BC0] text-[#107BC0] font-bold text-[1.25rem] hover:text-white hover:bg-[#107BC0] transition-all duration-300 ease-in-out"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-[8rem] md:w-[17.0625rem] h-[3rem] md:h-[3.5rem] rounded-[0.25rem] border-2 border-[#107BC0] text-white font-bold text-[1.25rem] bg-[#107BC0] hover:text-[#107BC0] hover:bg-transparent"
              >
                {loading ? "Saving..." : "Finish"}
              </button>
            </div>
          </form>
        </div>
      </PatientKYC>
    </section>
  );
};

export default PatientsKycStepOne;
