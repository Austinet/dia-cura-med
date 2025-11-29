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
  firstName: false,
  lastName: false,
  phoneNumber: false,
  dateOfBirth: false,
  age: false,
  gender: false,
};

const PatientsKycStepOne = () => {
  const [personalInformation, setPersonalInformation] =
    useState(defaultPersonalInfo);
  const [formErrors, setFormErrors] = useState(errors);
  // const { dispatch } = UsePatientKycContext();
  const router = useRouter();

  //Form validation regular expressions
  const NAME_REGEX = /^[a-zA-Z][a-zA-Z]{2,}$/;
  const PHONE_REGEX = /^\d{11}$/;

  //Set form data properties values
  const setProperty = (e) => {
    setPersonalInformation({
      ...personalInformation,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const heading = `I am Dr. Diacura-Med Tracker, please complete your profile`;

  //Handle form submission and validate form data
  const handleSubmit = (e) => {
    e.preventDefault();

    let validateForm = {};
    let isFormValidated = true;

    if (!NAME_REGEX.test(personalInformation.first_name.trim())) {
      validateForm = { ...validateForm, firstName: true };
      isFormValidated = false;
    } else {
      validateForm = { ...validateForm, firstName: false };
    }

    if (!NAME_REGEX.test(personalInformation.last_name.trim())) {
      validateForm = { ...validateForm, lastName: true };
      isFormValidated = false;
    } else {
      validateForm = { ...validateForm, lastName: false };
    }

    if (!personalInformation.date_of_birth) {
      validateForm = { ...validateForm, dateOfBirth: true };
      isFormValidated = false;
    } else {
      validateForm = { ...validateForm, dateOfBirth: false };
    }

    if (!PHONE_REGEX.test(personalInformation.phone_number.trim())) {
      validateForm = { ...validateForm, phoneNumber: true };
      isFormValidated = false;
    } else {
      validateForm = { ...validateForm, phoneNumber: false };
    }

    if (!personalInformation.gender) {
      validateForm = { ...validateForm, gender: true };
      isFormValidated = false;
    } else {
      validateForm = { ...validateForm, gender: false };
    }
    //Display errors if any
    // setFormErrors(validateForm);

    //Submit valid personal information
    if (isFormValidated) {
      // dispatch({
      //   type: "ADD_PERSONAL_INFORMATION",
      //   payload: {...personalInformation},
      // });
      setPersonalInformation(defaultPersonalInfo);
      router.push("/patients-kyc-step-two");
    } else {
      return;
    }
  };

  return (
    <section>
      <PatientKYC current={1} heading={heading}>
        {/* Personal information */}
        <div className="max-w-[65rem] min-h-[37.4375rem] mx-auto py-[2rem] md:px-[2rem] lg:px-[3.88rem] rounded-[1.25rem] bg-light-blue shadow-xxl">
          <h2 className="text-primary-color-light-blue-300 text-[1.2rem] md:text-[1.5rem] font-semibold leading-normal mb-[2rem]">
            Personal Information and Emergency Contact
          </h2>

          {/* Form container */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[1.5rem] md:gap-[1.94rem] mb-[2.5rem] md:mb-[3.5rem]">
              <div className="patient-kyc-input-row">
                <div className="patient-kyc-input-col">
                  <label htmlFor="ate_of_birth" className="patient-kyc-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    min={"1875-01-01"}
                    max={new Date().toISOString().split("T")[0]}
                    className={`patient-kyc-input ${
                      formErrors.dateOfBirth
                        ? "border-red-600"
                        : "border-[#94A3B8]"
                    }`}
                    id="date_of_birth"
                    name="date_of_birth"
                    value={personalInformation.date_of_birth}
                    onChange={setProperty}
                  />
                  <span
                    className={`text-red-600 ${
                      formErrors.dateOfBirth ? "block" : "hidden"
                    }`}
                  >
                    Enter a valid date of birth
                  </span>
                </div>
                <div className="patient-kyc-input-col">
                  <label htmlFor="gender" className="patient-kyc-label">
                    Gender
                  </label>
                  <div
                    className={`w-full flex items-center bg-white border rounded-[0.5rem] ${
                      formErrors.gender ? "border-red-600" : "border-[#94A3B8]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setPersonalInformation({
                          ...personalInformation,
                          gender: "Male",
                        })
                      }
                      className={`inline-block w-1/2 py-[0.8rem] md:py-[1rem] text-[0.875rem] font-medium leading-[1.25rem] outline-none rounded-l-[0.5rem] ${
                        personalInformation.gender === "Male"
                          ? "bg-[#107BC0] text-[#fff]"
                          : "bg-[#FFF] text-[#666]"
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPersonalInformation({
                          ...personalInformation,
                          gender: "Female",
                        })
                      }
                      className={`inline-block w-1/2 py-[0.8rem] md:py-[1rem] text-[0.875rem] font-medium leading-[1.25rem] outline-none rounded-r-[0.5rem] ${
                        personalInformation.gender === "Female"
                          ? "bg-[#107BC0] text-[#fff]"
                          : "bg-[#FFF] text-[#666]"
                      }`}
                    >
                      Female
                    </button>
                  </div>
                  <span
                    className={`text-red-600 ${
                      formErrors.gender ? "block" : "hidden"
                    }`}
                  >
                    Please select your gender
                  </span>
                </div>
              </div>
              <div className="patient-kyc-input-row">
                <div className="patient-kyc-input-col">
                  <label htmlFor="age" className="patient-kyc-label">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    className={`patient-kyc-input ${
                      formErrors.age ? "border-red-600" : "border-[#94A3B8]"
                    }`}
                    id="age"
                    name="age"
                    value={personalInformation.age}
                    onChange={setProperty}
                  />
                  <span
                    className={`text-red-600 ${
                      formErrors.age ? "block" : "hidden"
                    }`}
                  >
                    Enter a valid age, age must consist of digits only.
                  </span>
                </div>
                <div className="patient-kyc-input-col">
                  <label htmlFor="age" className="patient-kyc-label">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your emergency contact name"
                    className={`patient-kyc-input ${
                      formErrors.age ? "border-red-600" : "border-[#94A3B8]"
                    }`}
                    id="age"
                    name="age"
                    value={personalInformation.age}
                    onChange={setProperty}
                  />
                  <span
                    className={`text-red-600 ${
                      formErrors.age ? "block" : "hidden"
                    }`}
                  >
                    Enter a valid age, age must consist of digits only.
                  </span>
                </div>
              </div>
              <div className="patient-kyc-input-row">
                <div className="patient-kyc-input-col">
                  <label htmlFor="age" className="patient-kyc-label">
                    Contact Relationship
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your emergency contact relationship"
                    className={`patient-kyc-input ${
                      formErrors.age ? "border-red-600" : "border-[#94A3B8]"
                    }`}
                    id="age"
                    name="age"
                    value={personalInformation.age}
                    onChange={setProperty}
                  />
                  <span
                    className={`text-red-600 ${
                      formErrors.age ? "block" : "hidden"
                    }`}
                  >
                    Enter a valid age, age must consist of digits only.
                  </span>
                </div>
                <div className="patient-kyc-input-col">
                  <label htmlFor="age" className="patient-kyc-label">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your emergency contact phone number"
                    className={`patient-kyc-input ${
                      formErrors.age ? "border-red-600" : "border-[#94A3B8]"
                    }`}
                    id="age"
                    name="age"
                    value={personalInformation.age}
                    onChange={setProperty}
                  />
                  <span
                    className={`text-red-600 ${
                      formErrors.age ? "block" : "hidden"
                    }`}
                  >
                    Enter a valid age, age must consist of digits only.
                  </span>
                </div>
              </div>
            </div>

            {/* buttons container */}
            <PatientsKycButtons previous={""} />
          </form>
        </div>
      </PatientKYC>
    </section>
  );
};

export default PatientsKycStepOne;
