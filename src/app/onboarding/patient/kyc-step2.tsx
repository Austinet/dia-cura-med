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
  next: () => void;
  prev: () => void;
};

const PatientsKycStepOne = ({ prev, next }: Props) => {
  const [personalInformation, setPersonalInformation] =
    useState(defaultPersonalInfo);
  const [formErrors, setFormErrors] = useState(errors);
  const [diabetesDiagnosisDetails, setDiabetesDiagnosisDetails] = useState(
    defaultDiagnosisDetails
  );
  const [formError, setFormError] = useState(defaultDiagnosisErrors);
  const [unit, setUnit] = useState("");
  const [allergies, setAllergies] = useState("");
  const [anyAllergies, setAnyAllergies] = useState("");
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

    next();

    //Submit valid personal information
    // if (isFormValidated) {
    //   dispatch({
    //     type: "ADD_PERSONAL_INFORMATION",
    //     payload: {...personalInformation},
    //   });
    //   setPersonalInformation(defaultPersonalInfo);
    //   router.push("/patients-kyc-step-two");
    // } else {
    //   return;
    // }
  };

  return (
    <section>
      <PatientKYC current={2} heading={heading}>
        {/* Personal information */}
        <div className="max-w-[65rem] min-h-[37.4375rem] mx-auto py-[2rem] md:px-[2rem] lg:px-[3.88rem] rounded-[1.25rem] bg-light-blue shadow-xxl">
          <h2 className="text-primary-color-light-blue-300 text-[1.2rem] md:text-[1.5rem] font-semibold leading-normal mb-[2rem]">
            Diabetes Information
          </h2>

          {/* Form container */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[1.5rem] md:gap-[1.94rem] mb-[2.5rem] md:mb-[3.5rem]">
              <div className="patient-kyc-input-row">
                <div className="patient-kyc-input-col">
                  <label htmlFor="date_of_birth" className="patient-kyc-label">
                    Date of Diagnosis
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
                    Diabetes Type
                  </label>
                  <select
                    name="diabetes-type"
                    id="diabetes-type"
                    className="patient-kyc-input"
                    required
                  >
                    <option value="">Select your diabetes type</option>
                    <option value="Type 1">Type 1</option>
                    <option value="Type 2">Type 2</option>
                    <option value="Impaired glucose tolerance">
                      Impaired glucose tolerance
                    </option>
                    <option value="Gestational Diabetes">
                      Gestational Diabetes
                    </option>
                    <option value="Prediabetes">Prediabetes</option>
                  </select>
                  <span
                    className={`text-red-600 ${
                      formErrors.gender ? "block" : "hidden"
                    }`}
                  >
                    Diabetes Type
                  </span>
                </div>
              </div>
              <div className="patient-kyc-input-row">
                <div className="patient-kyc-input-col">
                  <label htmlFor="gender" className="patient-kyc-label">
                    Do you track your insulin?
                  </label>
                  <div className="flex gap-[2rem] mt-4">
                    <div
                      className={`w-[6.5rem] h-[3rem] py-[1rem] px-[1rem] rounded-[0.625rem] bg-white flex items-center justify-between ${
                        formErrors.trackInsulin ? "border border-red-600 " : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id="yes"
                        name="trackInsulin"
                        className="w-[1.5rem] h-[1.5rem] outline-none"
                        onClick={() =>
                          setDiabetesDiagnosisDetails({
                            ...diabetesDiagnosisDetails,
                            track_insulin: "yes",
                          })
                        }
                      />
                      <label htmlFor="yes" className="diabetes-type-label">
                        Yes
                      </label>
                    </div>
                    <div
                      className={`w-[6.5rem] h-[3rem] py-[1rem] px-[1rem] rounded-[0.625rem] bg-white flex items-center justify-between  ${
                        formError.trackInsulin ? "border border-red-600 " : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id="no"
                        name="trackInsulin"
                        className="w-[1.5rem] h-[1.5rem] outline-none"
                        onClick={() =>
                          setDiabetesDiagnosisDetails({
                            ...diabetesDiagnosisDetails,
                            track_insulin: "no",
                          })
                        }
                      />
                      <label htmlFor="no" className="diabetes-type-label">
                        No
                      </label>
                    </div>
                  </div>
                  <span
                    className={`text-red-600 md:text-lg ${
                      formError.trackInsulin ? "block" : "hidden"
                    }`}
                  >
                    Select yes or no to track your insulin
                  </span>
                </div>
                <div className="patient-kyc-input-col">
                  <label
                    htmlFor="insulin-therapy"
                    className="patient-kyc-label"
                  >
                    What is your insulin therapy?
                  </label>
                  <select
                    name="insulin-therapy"
                    id="insulin-therapy"
                    className="patient-kyc-input"
                    required
                  >
                    <option value="">Select your insulin therapy</option>
                    <option value="Pen / Syringes">Pen / Syringes</option>
                    <option value="Pump">Pump</option>
                    <option value="No Insulin">No Insulin</option>
                  </select>
                  <span
                    className={`text-red-600 ${
                      formErrors.trackInsulin ? "block" : "hidden"
                    }`}
                  >
                    Please select your insulin therapy.
                  </span>
                </div>
              </div>
              <div className="patient-kyc-input-row">
                <div className="patient-kyc-input-col">
                  <label htmlFor="gender" className="patient-kyc-label">
                    Do you have allergies?
                  </label>
                  <div className="flex gap-[2rem] mt-4">
                    <div
                      className={`w-[6.5rem] h-[3rem] py-[1rem] px-[1rem] rounded-[0.625rem] bg-white flex items-center justify-between ${
                        formErrors.trackInsulin ? "border border-red-600 " : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id="yes"
                        name="trackInsulin"
                        className="w-[1.5rem] h-[1.5rem] outline-none"
                        onClick={() =>
                          setDiabetesDiagnosisDetails({
                            ...diabetesDiagnosisDetails,
                            track_insulin: "yes",
                          })
                        }
                      />
                      <label htmlFor="yes" className="diabetes-type-label">
                        Yes
                      </label>
                    </div>
                    <div
                      className={`w-[6.5rem] h-[3rem] py-[1rem] px-[1rem] rounded-[0.625rem] bg-white flex items-center justify-between  ${
                        formError.trackInsulin ? "border border-red-600 " : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id="no"
                        name="trackInsulin"
                        className="w-[1.5rem] h-[1.5rem] outline-none"
                        onClick={() =>
                          setDiabetesDiagnosisDetails({
                            ...diabetesDiagnosisDetails,
                            track_insulin: "no",
                          })
                        }
                      />
                      <label htmlFor="no" className="diabetes-type-label">
                        No
                      </label>
                    </div>
                  </div>
                  <span
                    className={`text-red-600 md:text-lg ${
                      formError.trackInsulin ? "block" : "hidden"
                    }`}
                  >
                    Select yes or no to track your insulin
                  </span>
                </div>
                <div className="patient-kyc-input-col">
                  <label
                    htmlFor="insulin-therapy"
                    className="patient-kyc-label"
                  >
                    If yes, kindly specify
                  </label>

                  <div
                    className="w-full border-b-4"
                    style={{ borderColor: "#107BC0" }}
                  >
                    <input
                      className="w-full px-[12px] pt-[8px] pb-[16px] border-none outline-none"
                      type="text"
                      placeholder="Please Specify separated by comma. Eg one, two, three"
                      disabled={anyAllergies === "yes" ? false : true}
                      onChange={(e) => setAllergies(e.target.value)}
                      value={allergies}
                      required={anyAllergies === "yes"}
                      style={{ backgroundColor: "rgba(207, 229, 242, 0.02)" }}
                    />
                  </div>

                  <span
                    className={`text-red-600 ${
                      formErrors.trackInsulin ? "block" : "hidden"
                    }`}
                  >
                    Please select your insulin therapy.
                  </span>
                </div>
              </div>
              <div className="patient-kyc-input-row">
                <div className="patient-kyc-input-col">
                  <label htmlFor="gender" className="patient-kyc-label">
                    Do you have chronic illnesses?
                  </label>
                  <div className="flex gap-[2rem] mt-4">
                    <div
                      className={`w-[6.5rem] h-[3rem] py-[1rem] px-[1rem] rounded-[0.625rem] bg-white flex items-center justify-between ${
                        formErrors.trackInsulin ? "border border-red-600 " : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id="yes"
                        name="trackInsulin"
                        className="w-[1.5rem] h-[1.5rem] outline-none"
                        onClick={() =>
                          setDiabetesDiagnosisDetails({
                            ...diabetesDiagnosisDetails,
                            track_insulin: "yes",
                          })
                        }
                      />
                      <label htmlFor="yes" className="diabetes-type-label">
                        Yes
                      </label>
                    </div>
                    <div
                      className={`w-[6.5rem] h-[3rem] py-[1rem] px-[1rem] rounded-[0.625rem] bg-white flex items-center justify-between  ${
                        formError.trackInsulin ? "border border-red-600 " : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id="no"
                        name="trackInsulin"
                        className="w-[1.5rem] h-[1.5rem] outline-none"
                        onClick={() =>
                          setDiabetesDiagnosisDetails({
                            ...diabetesDiagnosisDetails,
                            track_insulin: "no",
                          })
                        }
                      />
                      <label htmlFor="no" className="diabetes-type-label">
                        No
                      </label>
                    </div>
                  </div>
                  <span
                    className={`text-red-600 md:text-lg ${
                      formError.trackInsulin ? "block" : "hidden"
                    }`}
                  >
                    Select yes or no to track your insulin
                  </span>
                </div>
                <div className="patient-kyc-input-col">
                  <label
                    htmlFor="insulin-therapy"
                    className="patient-kyc-label"
                  >
                    If yes, kindly specify
                  </label>

                  <div
                    className="w-full border-b-4"
                    style={{ borderColor: "#107BC0" }}
                  >
                    <input
                      className="w-full px-[12px] pt-[8px] pb-[16px] border-none outline-none"
                      type="text"
                      placeholder="Please Specify separated by comma. Eg one, two, three"
                      disabled={anyAllergies === "yes" ? false : true}
                      onChange={(e) => setAllergies(e.target.value)}
                      value={allergies}
                      required={anyAllergies === "yes"}
                      style={{ backgroundColor: "rgba(207, 229, 242, 0.02)" }}
                    />
                  </div>

                  <span
                    className={`text-red-600 ${
                      formErrors.trackInsulin ? "block" : "hidden"
                    }`}
                  >
                    Please select your insulin therapy.
                  </span>
                </div>
              </div>
            </div>

            {/* buttons container */}
            <PatientsKycButtons prev={prev} />
          </form>
        </div>
      </PatientKYC>
    </section>
  );
};

export default PatientsKycStepOne;
