"use client";

import PatientsKycStepThree from "./kyc-step-3";
import PatientsKycStepOne from "./kyc-step1";
import PatientsKycStepTwo from "./kyc-step2";
import { useOnboardingContext } from "@/hooks/usePatientOnboardingContext";

const Onboarding = () => {
  const { step } = useOnboardingContext();

  return (
    <>
      {step === 1 ? (
        <PatientsKycStepOne />
      ) : step === 2 ? (
        <PatientsKycStepTwo />
      ) : (
        <PatientsKycStepThree />
      )}
    </>
  );
};

export default Onboarding;
