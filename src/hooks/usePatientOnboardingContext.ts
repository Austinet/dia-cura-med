"use client";

import { OnboardingContext } from "@/context/patient-onboarding";
import { useContext } from "react";

export const useOnboardingContext = () => useContext(OnboardingContext);
