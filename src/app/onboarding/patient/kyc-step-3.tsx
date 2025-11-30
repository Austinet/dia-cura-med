"use client";
import { useState } from "react";
// import { UsePatientKycContext } from "../../context/PatientKycContext";
import PatientKYC from "@/components/onboarding/patients-kyc-wrapper";
import { useRouter } from "next/navigation";
import PatientsKycButtons from "@/components/onboarding/PatientsKycButtons";

//Default form and form error values
const defaultPersonalInfo = {
  first_name: "",
  last_name: "",
  phone_number: "",
  date_of_birth: "",
  age: "",
  gender: "",
};

const errors = {
  trackInsulin: false,
  lastName: false,
  phoneNumber: false,
  dateOfBirth: false,
  age: false,
  gender: false,
};

//Default form and form error values
const defaultDiagnosisDetails = {
  diagnosis_date: "",
  track_insulin: "",
  insulin_therapy: "",
};

const defaultDiagnosisErrors = {
  diagnosisDate: false,
  trackInsulin: false,
  insulinTherapy: false,
  unit: false,
  anyAllergies: false,
};
type Props = {
  prev: () => void;
};
const PatientsKycStepOne = ({ prev }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [consent, setConsent] = useState("");
  const [formError, setFormError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const router = useRouter();
  //  const { state } = UsePatientKycContext();
  //Form validation regular expressions
  const NAME_REGEX = /^[a-zA-Z][a-zA-Z]{2,}$/;

  const heading = `I am Dr. Diacura-Med Tracker, please complete your profile`;
  // Validate patients KYC information
  // const validatePatientKyc = async (data) => {
  //   try {
  //     const response = await axios.post(
  //       "/api/user/patient-kyc",
  //       {
  //         ...data,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${authToken}`
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       setShowModal(true);
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     //Set response error if any
  //     setServerError(true)
  //     setServerErrorMessage(error.message)
  //   }
  // };

  //Handle form submission and validate form data
  const onSubmitBtn = (e) => {
    e.preventDefault();

    // if (consent.toLowerCase().includes(state.last_name.toLowerCase())) {
    //   setFormError(false);
    //   validatePatientKyc(state);
    //   setConsent("");
    // } else {
    //   setFormError(true);
    // }

    // A Quickfix for navigating to dashboard, since I don't have time to understand your code
    // setTimeout(() => {
    //   console.log("This will run after a 2-second delay");
    //   // Call the next function here
    //   toDashboard();
    // }, 2000);
  };

  return (
    <section>
      <PatientKYC current={3} heading={heading}>
        {/* Personal information */}
        <div className="max-w-[65rem] mx-auto py-[2rem] md:px-[2rem] lg:px-[3.88rem] rounded-[1.25rem] bg-light-blue shadow-xxl">
          <h2 className="text-[#107BC0] text-[1.2rem] md:text-[1.5rem] font-semibold leading-normal mb-[2rem]">
            Consent and Agreement
          </h2>

          {/* Server response errors */}
          <p
            className={`${
              serverError ? "block" : "hidden"
            } text-xl font-semibold text-red-600 text-center`}
          >
            {serverErrorMessage}
          </p>

          {/* Form container */}
          <form onSubmit={onSubmitBtn}>
            <div className=" ">
              <p className="font-Open-sans font-normal lg:text-[20px] lg:mt-[20px]">
                I,{" "}
                <span className="text-[#107BC0]">
                  [
                  <input
                    value={consent}
                    onChange={(e) => setConsent(e.target.value)}
                    className="text-[#107BC0] outline-none"
                    type="text"
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
              <span
                className={`text-red-600 md:text-lg ${
                  formError ? "block" : "hidden"
                }`}
              >
                Please enter your full name above
              </span>
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
            <div className="flex justify-end gap-6">
              <button
                onClick={prev}
                className="flex items-center justify-center w-[8rem] md:w-[17.0625rem] h-[3rem] md:h-[3.5rem] rounded-[0.25rem] border-2 border-[#107BC0] text-[#107BC0] font-bold text-[1.25rem] hover:text-white hover:bg-[#107BC0] transition-all duration-300 ease-in-out"
              >
                Back
              </button>
              <button className="w-[8rem] md:w-[17.0625rem] h-[3rem] md:h-[3.5rem] rounded-[0.25rem] border-2 border-[#107BC0] text-white font-bold text-[1.25rem] bg-[#107BC0] hover:text-[#107BC0] hover:bg-transparent">
                Finish
              </button>
            </div>
          </form>
        </div>
      </PatientKYC>
    </section>
  );
};

export default PatientsKycStepOne;
