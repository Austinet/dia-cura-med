"use client";

import { createContext, useState } from "react";
import PatientsKycStepThree from "./kyc-step-3";
import PatientsKycStepOne from "./kyc-step1";
import PatientsKycStepTwo from "./kyc-step2";

const OnboardingProvider = createContext({});
const Onboarding = () => {
  const [step, setStep] = useState(1);
  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  return (
    <div>
      <OnboardingProvider value={{ next, prev }}>
        {step === 1 ? (
          <PatientsKycStepOne next={next} />
        ) : step === 2 ? (
          <PatientsKycStepTwo next={next} prev={prev} />
        ) : (
          <PatientsKycStepThree prev={prev} />
        )}
      </OnboardingProvider>
    </div>
  );
};

export default Onboarding;
