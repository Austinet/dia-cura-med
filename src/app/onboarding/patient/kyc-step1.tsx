"use client";
import { useState } from "react";
import { useOnboardingContext } from "@/hooks/usePatientOnboardingContext";
import PatientKYC from "@/components/onboarding/patients-kyc-wrapper";
import PatientsKycButtons from "@/components/onboarding/PatientsKycButtons";

// Default form error values
const errors = {
  dateOfBirth: false,
  gender: false,
  address: false,
  emergencyContact: {
    name: false,
    phoneNumber: false,
    relationship: false,
  },
};

const PatientsKycStepOne = () => {
  const { state, dispatch, next } = useOnboardingContext();
  const [personalInfo, setPersonalInfo] = useState(state.personalInfo);
  const [formErrors, setFormErrors] = useState(errors);

  //Form validation regular expressions
  const NAME_REGEX = /^[a-zA-Z][a-zA-Z]{2,}$/;
  const PHONE_REGEX = /^\d{11}$/;
  const ADDRESS_REGEX = /^(?=.*[A-Za-z])[\w\s.,!?'"@#%&()\-:;/]{10,500}$/;

  //Set form data properties values
  const setProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (["name", "relationship", "phoneNumber"].includes(e.target.name)) {
      setPersonalInfo({
        ...personalInfo,
        emergencyContact: {
          ...personalInfo.emergencyContact,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
    }
  };

  //Validates user inputs fields
  const validateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;

    if (field === "address") {
      const address = !ADDRESS_REGEX.test(personalInfo.address);
      const gender = personalInfo.gender.trim().length === 0;
      setFormErrors({ ...formErrors, address, gender });
    } else if (field === "name") {
      const name = !NAME_REGEX.test(personalInfo.emergencyContact.name);
      setFormErrors({
        ...formErrors,
        emergencyContact: { ...formErrors.emergencyContact, name },
      });
    } else if (field === "phoneNumber") {
      const phoneNumber = !PHONE_REGEX.test(
        personalInfo.emergencyContact.phoneNumber
      );
      setFormErrors({
        ...formErrors,
        emergencyContact: { ...formErrors.emergencyContact, phoneNumber },
      });
    } else if (field === "relationship") {
      const relationship = !NAME_REGEX.test(
        personalInfo.emergencyContact.relationship
      );
      setFormErrors({
        ...formErrors,
        emergencyContact: { ...formErrors.emergencyContact, relationship },
      });
    }
  };

  function validateForm() {
    const gender = personalInfo.gender.trim().length === 0;
    setFormErrors({ ...formErrors, gender });
    return (
      !formErrors.dateOfBirth &&
      !formErrors.address &&
      !formErrors.gender &&
      !formErrors.emergencyContact.name &&
      !formErrors.emergencyContact.relationship &&
      !formErrors.emergencyContact.phoneNumber
    );
  }

  //Handle form submission and validate form data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //Submit valid personal information if valid
    if (validateForm()) {
      dispatch({
        type: "ADD_PERSONAL_INFO",
        payload: personalInfo,
      });
      next();
    } else {
      return;
    }
  };

  return (
    <section>
      <PatientKYC current={1}>
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
                  <label htmlFor="dateOfBirth" className="patient-kyc-label">
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
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={personalInfo.dateOfBirth}
                    onChange={setProperty}
                    required
                  />
                  {formErrors.dateOfBirth && (
                    <span className="text-red-600">
                      Enter a valid date of birth
                    </span>
                  )}
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
                        setPersonalInfo({ ...personalInfo, gender: "Male" })
                      }
                      className={`inline-block w-1/2 py-[0.8rem] md:py-[1rem] text-[0.875rem] font-medium leading-[1.25rem] outline-none rounded-l-[0.5rem] ${
                        personalInfo.gender === "Male"
                          ? "bg-[#107BC0] text-[#fff]"
                          : "bg-[#FFF] text-[#666]"
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPersonalInfo({ ...personalInfo, gender: "Female" })
                      }
                      className={`inline-block w-1/2 py-[0.8rem] md:py-[1rem] text-[0.875rem] font-medium leading-[1.25rem] outline-none rounded-r-[0.5rem] ${
                        personalInfo.gender === "Female"
                          ? "bg-[#107BC0] text-[#fff]"
                          : "bg-[#FFF] text-[#666]"
                      }`}
                    >
                      Female
                    </button>
                  </div>
                  {formErrors.gender && (
                    <span className="text-red-600">
                      Please select your gender
                    </span>
                  )}
                </div>
              </div>
              <div className="patient-kyc-input-row">
                <div className="patient-kyc-input-col">
                  <label htmlFor="address" className="patient-kyc-label">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className={`patient-kyc-input ${
                      formErrors.address ? "border-red-600" : "border-[#94A3B8]"
                    }`}
                    id="address"
                    name="address"
                    value={personalInfo.address}
                    onChange={setProperty}
                    onInput={validateField}
                    onBlur={validateField}
                    required
                  />
                  {formErrors.address && (
                    <span className="text-red-600">Enter a valid address.</span>
                  )}
                </div>
                <div className="patient-kyc-input-col">
                  <label htmlFor="name" className="patient-kyc-label">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your emergency contact name"
                    className={`patient-kyc-input ${
                      formErrors.emergencyContact.name
                        ? "border-red-600"
                        : "border-[#94A3B8]"
                    }`}
                    id="name"
                    name="name"
                    value={personalInfo.emergencyContact.name}
                    onChange={setProperty}
                    onInput={validateField}
                    onBlur={validateField}
                    required
                  />
                  {formErrors.emergencyContact.name && (
                    <span className="text-red-600">
                      Enter a valid emergency contact name, must consist of
                      letters only.
                    </span>
                  )}
                </div>
              </div>
              <div className="patient-kyc-input-row">
                <div className="patient-kyc-input-col">
                  <label htmlFor="relationship" className="patient-kyc-label">
                    Contact Relationship
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your emergency contact relationship"
                    className={`patient-kyc-input ${
                      formErrors.emergencyContact.relationship
                        ? "border-red-600"
                        : "border-[#94A3B8]"
                    }`}
                    id="relationship"
                    name="relationship"
                    value={personalInfo.emergencyContact.relationship}
                    onChange={setProperty}
                    onInput={validateField}
                    onBlur={validateField}
                    required
                  />
                  {formErrors.emergencyContact.relationship && (
                    <span className="text-red-600">
                      Enter a valid emergency contact relationship, must consist
                      of letters only.
                    </span>
                  )}
                </div>
                <div className="patient-kyc-input-col">
                  <label htmlFor="phoneNumber" className="patient-kyc-label">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your emergency contact phone number"
                    className={`patient-kyc-input ${
                      formErrors.emergencyContact.phoneNumber
                        ? "border-red-600"
                        : "border-[#94A3B8]"
                    }`}
                    id="phoneNumber"
                    name="phoneNumber"
                    value={personalInfo.emergencyContact.phoneNumber}
                    onChange={setProperty}
                    onInput={validateField}
                    onBlur={validateField}
                    required
                  />
                  {formErrors.emergencyContact.phoneNumber && (
                    <span className="text-red-600">
                      Enter a valid emergency contact phone number, must consist
                      of eleven digits.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* buttons container */}
            <PatientsKycButtons />
          </form>
        </div>
      </PatientKYC>
    </section>
  );
};

export default PatientsKycStepOne;
