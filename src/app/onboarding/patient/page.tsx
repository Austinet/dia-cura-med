"use client";

import { useRouter } from "next/navigation";
import PatientsKycStepThree from "./kyc-step-3";
import PatientsKycStepOne from "./kyc-step1";
import PatientsKycStepTwo from "./kyc-step2";
import { useOnboardingContext } from "@/hooks/usePatientOnboardingContext";
import toast from "react-hot-toast";
import { useState } from "react";

const Onboarding = () => {
  const { step, state } = useOnboardingContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState("");

  //Handle form submission and validate form data
  const handleCompleted = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/patients/onboarding", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "appication/json",
        },
        body: JSON.stringify(state),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerResponse(data.message);
        throw new Error(data.message || "Onboarding failed");
      }

      toast.success("Profile completed successfully");
      router.push("/dashboard/patient");
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <>
      {step === 1 ? (
        <PatientsKycStepOne />
      ) : step === 2 ? (
        <PatientsKycStepTwo />
      ) : (
        <PatientsKycStepThree
          handleCompleted={handleCompleted}
          loading={loading}
          serverResponse={serverResponse}
        />
      )}
    </>
  );
};

export default Onboarding;
