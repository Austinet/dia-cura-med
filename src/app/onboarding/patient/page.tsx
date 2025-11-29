import PatientsKycStepThree from "./kyc-step-3";
import PatientsKycStepOne from "./kyc-step1";
import PatientsKycStepTwo from "./kyc-step2";

const Onboarding = () => {
  return (
    <div>
      <PatientsKycStepOne />
      <PatientsKycStepTwo />
      <PatientsKycStepThree />
    </div>
  );
};

export default Onboarding;
