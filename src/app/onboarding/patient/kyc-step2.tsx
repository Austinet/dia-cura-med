"use client";
import { useState } from "react";
import { useOnboardingContext } from "@/hooks/usePatientOnboardingContext";
import PatientKYC from "@/components/onboarding/patients-kyc-wrapper";
import PatientsKycButtons from "@/components/onboarding/PatientsKycButtons";
import List from "@/components/onboarding/list";
import ErrorMessage from "@/components/forms/error";

// Default form error values
const errors = {
  trackInsulin: false,
  hasAllergies: false,
  allergies: false,
  hasChronicIllnesses: false,
  chronicIllnesses: false,
};

const PatientsKycStepOne = () => {
  const { state, dispatch, next, prev } = useOnboardingContext();
  const [diabetesInfo, setDiabetesInfo] = useState(state.diabetesInfo);
  const [allergy, setAllergy] = useState("");
  const [chronicIllness, setChronicIllness] = useState("");
  const [formErrors, setFormErrors] = useState(errors);

  //Form validation regular expressions
  const TEXT_REGEX = /^[a-zA-Z][a-zA-Z]{2,}$/;

  //Set form data properties values
  const setProperty = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDiabetesInfo({ ...diabetesInfo, [e.target.name]: e.target.value });
  };

  //Validates user inputs fields
  const validateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;

    if (field === "allergy") {
      const allergies = !TEXT_REGEX.test(allergy);
      setFormErrors({ ...formErrors, allergies });
    } else if (field === "chronicIllness") {
      const chronicIllnesses = !TEXT_REGEX.test(chronicIllness);
      setFormErrors({ ...formErrors, chronicIllnesses });
    }
  };

  // Adds Allergy or Chronic Illness
  const addItem = (type: "allergy" | "chronicIllness") => {
    if (type === "allergy" && !formErrors.allergies) {
      if (![...diabetesInfo.allergies].includes(allergy)) {
        setDiabetesInfo({
          ...diabetesInfo,
          allergies: [...diabetesInfo.allergies, allergy],
        });
      }
      setAllergy("");
    } else if (type === "chronicIllness" && !formErrors.chronicIllnesses) {
      if (![...diabetesInfo.chronicIllnesses].includes(chronicIllness)) {
        setDiabetesInfo({
          ...diabetesInfo,
          chronicIllnesses: [...diabetesInfo.chronicIllnesses, chronicIllness],
        });
      }
      setChronicIllness("");
    }
  };

  // Deletes Allergy or Chronic Illness
  const deleteItem = (type: "allergy" | "chronicIllness", item: string) => {
    if (type === "allergy") {
      setDiabetesInfo({
        ...diabetesInfo,
        allergies: [...diabetesInfo.allergies].filter(
          (allergy) => allergy !== item
        ),
      });
    } else if (type === "chronicIllness") {
      setDiabetesInfo({
        ...diabetesInfo,
        chronicIllnesses: [...diabetesInfo.chronicIllnesses].filter(
          (chronicIllness) => chronicIllness !== item
        ),
      });
    }
  };

  function validateForm() {
    const trackInsulin = diabetesInfo.trackInsulin === undefined;
    const hasAllergies = diabetesInfo.hasAllergies === undefined;
    const hasChronicIllnesses = diabetesInfo.hasChronicIllnesses === undefined;

    setFormErrors({
      ...formErrors,
      trackInsulin,
      hasAllergies,
      hasChronicIllnesses,
    });

    if (trackInsulin || hasAllergies || hasChronicIllnesses) {
      return false;
    }

    return (
      !formErrors.trackInsulin &&
      !formErrors.hasAllergies &&
      !formErrors.allergies &&
      !formErrors.hasChronicIllnesses &&
      !formErrors.chronicIllnesses
    );
  }

  //Handle form submission and validate form data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //Submit valid personal information if valid
    if (validateForm()) {
      dispatch({
        type: "ADD_DIABETES_INFO",
        payload: diabetesInfo,
      });
      next();
    } else {
      return;
    }
  };

  return (
    <section>
      <PatientKYC current={2}>
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
                  <label
                    htmlFor="dateOfDiagnosis"
                    className="patient-kyc-label"
                  >
                    Date of Diagnosis
                  </label>
                  <input
                    type="date"
                    min={"1875-01-01"}
                    max={new Date().toISOString().split("T")[0]}
                    className={`patient-kyc-input`}
                    id="dateOfDiagnosis"
                    name="dateOfDiagnosis"
                    value={diabetesInfo.dateOfDiagnosis}
                    onChange={setProperty}
                    required
                  />
                </div>
                <div className="patient-kyc-input-col">
                  <label htmlFor="diabetesType" className="patient-kyc-label">
                    Diabetes Type
                  </label>
                  <select
                    name="diabetesType"
                    id="diabetesType"
                    className="patient-kyc-input"
                    onChange={setProperty}
                    value={diabetesInfo.diabetesType}
                    required
                  >
                    <option value="">Select diabetes type</option>
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
                </div>
              </div>
              <div className="patient-kyc-input-row">
                <div className="patient-kyc-input-col">
                  <label htmlFor="trackInsulin" className="patient-kyc-label">
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
                        checked={diabetesInfo.trackInsulin === true}
                        onChange={() =>
                          setDiabetesInfo({
                            ...diabetesInfo,
                            trackInsulin: true,
                          })
                        }
                      />
                      <label htmlFor="yes" className="diabetes-type-label">
                        Yes
                      </label>
                    </div>
                    <div
                      className={`w-[6.5rem] h-[3rem] py-[1rem] px-[1rem] rounded-[0.625rem] bg-white flex items-center justify-between  ${
                        formErrors.trackInsulin ? "border border-red-600 " : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id="no"
                        name="trackInsulin"
                        className="w-[1.5rem] h-[1.5rem] outline-none"
                        checked={diabetesInfo.hasAllergies === false}
                        onChange={() =>
                          setDiabetesInfo({
                            ...diabetesInfo,
                            trackInsulin: false,
                          })
                        }
                      />
                      <label htmlFor="no" className="diabetes-type-label">
                        No
                      </label>
                    </div>
                  </div>
                  {formErrors.trackInsulin && (
                    <span className="text-red-600">
                      Select yes or no to track your insulin
                    </span>
                  )}
                </div>
                <div className="patient-kyc-input-col">
                  <label htmlFor="insulinTherapy" className="patient-kyc-label">
                    What is your insulin therapy?
                  </label>
                  <select
                    name="insulinTherapy"
                    id="insulinTherapy"
                    className="patient-kyc-input"
                    onChange={setProperty}
                    value={diabetesInfo.insulinTherapy}
                    required
                  >
                    <option value="">Select insulin therapy</option>
                    <option value="Pen / Syringes">Pen / Syringes</option>
                    <option value="Pump">Pump</option>
                    <option value="No Insulin">No Insulin</option>
                  </select>
                </div>
              </div>
              <div className="patient-kyc-input-row">
                <div className="patient-kyc-input-col">
                  <label htmlFor="hasAllergies" className="patient-kyc-label">
                    Do you have allergies?
                  </label>
                  <div className="flex gap-[2rem] mt-4">
                    <div
                      className={`w-[6.5rem] h-[3rem] py-[1rem] px-[1rem] rounded-[0.625rem] bg-white flex items-center justify-between ${
                        formErrors.hasAllergies ? "border border-red-600 " : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id="yes"
                        name="hasAllergies"
                        className="w-[1.5rem] h-[1.5rem] outline-none"
                        checked={diabetesInfo.hasAllergies === true}
                        onChange={() =>
                          setDiabetesInfo({
                            ...diabetesInfo,
                            hasAllergies: true,
                          })
                        }
                      />
                      <label htmlFor="yes" className="diabetes-type-label">
                        Yes
                      </label>
                    </div>
                    <div
                      className={`w-[6.5rem] h-[3rem] py-[1rem] px-[1rem] rounded-[0.625rem] bg-white flex items-center justify-between  ${
                        formErrors.hasAllergies ? "border border-red-600 " : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id="no"
                        name="hasAllergies"
                        className="w-[1.5rem] h-[1.5rem] outline-none"
                        checked={diabetesInfo.hasAllergies === false}
                        onChange={() =>
                          setDiabetesInfo({
                            ...diabetesInfo,
                            hasAllergies: false,
                          })
                        }
                      />
                      <label htmlFor="no" className="diabetes-type-label">
                        No
                      </label>
                    </div>
                  </div>
                  <ErrorMessage
                    trigger={formErrors.hasAllergies}
                    message="Select yes or no to know if you have allergies"
                  />
                </div>
                <div className="patient-kyc-input-col">
                  <label htmlFor="allergies" className="patient-kyc-label">
                    If yes, kindly specify
                  </label>

                  <div className="w-full flex gap-4 items-center">
                    <input
                      className="w-full pr-[12px] pt-[8px] pb-[12px] outline-none border-b-4 border-b-[#107BC0]"
                      type="text"
                      id="allergy"
                      name="allergy"
                      placeholder="Enter allergies and add"
                      disabled={!diabetesInfo.hasAllergies}
                      onChange={(e) => setAllergy(e.target.value)}
                      value={allergy}
                      onInput={validateField}
                      onBlur={validateField}
                      required={
                        diabetesInfo.hasAllergies &&
                        diabetesInfo.allergies?.length === 0
                      }
                      style={{ backgroundColor: "rgba(207, 229, 242, 0.02)" }}
                    />
                    <button
                      type="button"
                      disabled={allergy.length < 4}
                      onClick={() => addItem("allergy")}
                      className=" inline-block text-white font-bold bg-[#107BC0] hover:bg-[#9353e5] rounded-md p-[0.6rem]"
                    >
                      Add{" "}
                    </button>
                  </div>
                  {diabetesInfo.allergies.length > 0 && (
                    <List
                      items={diabetesInfo.allergies}
                      type="allergy"
                      deleteItem={deleteItem}
                    />
                  )}
                  {formErrors.allergies && (
                    <span className="text-red-600">
                      Please enter a valid allergy, letters only.
                    </span>
                  )}
                </div>
              </div>
              <div className="patient-kyc-input-row">
                <div className="patient-kyc-input-col">
                  <label
                    htmlFor="hasChronicIllnesses"
                    className="patient-kyc-label"
                  >
                    Do you have chronic illnesses?
                  </label>
                  <div className="flex gap-[2rem] mt-4">
                    <div
                      className={`w-[6.5rem] h-[3rem] py-[1rem] px-[1rem] rounded-[0.625rem] bg-white flex items-center justify-between ${
                        formErrors.hasChronicIllnesses
                          ? "border border-red-600 "
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id="yes"
                        name="hasChronicIllnesses"
                        className="w-[1.5rem] h-[1.5rem] outline-none"
                        checked={diabetesInfo.hasChronicIllnesses === true}
                        onChange={() =>
                          setDiabetesInfo({
                            ...diabetesInfo,
                            hasChronicIllnesses: true,
                          })
                        }
                      />
                      <label htmlFor="yes" className="diabetes-type-label">
                        Yes
                      </label>
                    </div>
                    <div
                      className={`w-[6.5rem] h-[3rem] py-[1rem] px-[1rem] rounded-[0.625rem] bg-white flex items-center justify-between  ${
                        formErrors.hasChronicIllnesses
                          ? "border border-red-600 "
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id="no"
                        name="hasChronicIllnesses"
                        className="w-[1.5rem] h-[1.5rem] outline-none"
                        checked={diabetesInfo.hasChronicIllnesses === false}
                        onChange={() =>
                          setDiabetesInfo({
                            ...diabetesInfo,
                            hasChronicIllnesses: false,
                          })
                        }
                      />
                      <label htmlFor="no" className="diabetes-type-label">
                        No
                      </label>
                    </div>
                  </div>
                  {formErrors.hasChronicIllnesses && (
                    <span className="text-red-600">
                      Select yes or no to know if you have chronic Illnesses
                    </span>
                  )}
                </div>
                <div className="patient-kyc-input-col">
                  <label
                    htmlFor="chronicIllnesses"
                    className="patient-kyc-label"
                  >
                    If yes, kindly specify
                  </label>

                  <div className="w-full flex gap-4 items-center">
                    <input
                      className="w-full pr-[12px] border-b-4 border-b-[#107BC0] pt-[8px] pb-[12px] outline-none"
                      type="text"
                      name="chronicIllness"
                      id="chronicIllness"
                      placeholder="Enter chronic illness and add"
                      disabled={!diabetesInfo.hasChronicIllnesses}
                      onChange={(e) => setChronicIllness(e.target.value)}
                      value={chronicIllness}
                      onInput={validateField}
                      onBlur={validateField}
                      required={
                        diabetesInfo.hasChronicIllnesses &&
                        diabetesInfo.chronicIllnesses.length === 0
                      }
                      style={{ backgroundColor: "rgba(207, 229, 242, 0.02)" }}
                    />
                    <button
                      type="button"
                      disabled={chronicIllness.length < 4}
                      className=" inline-block text-white font-bold bg-[#107BC0] hover:bg-[#9353e5] rounded-md p-[0.6rem]"
                      onClick={() => addItem("chronicIllness")}
                    >
                      Add
                    </button>
                  </div>
                  {diabetesInfo.chronicIllnesses.length > 0 && (
                    <List
                      items={diabetesInfo.chronicIllnesses}
                      type="chronicIllness"
                      deleteItem={deleteItem}
                    />
                  )}
                  {formErrors.chronicIllnesses && (
                    <span className="text-red-600">
                      Please enter a valid chronic illness, letters only.
                    </span>
                  )}
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
