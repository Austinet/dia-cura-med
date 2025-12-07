"use client";

import {
  ActionDispatch,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useReducer,
  useState,
} from "react";
import PatientsKycStepThree from "./kyc-step-3";
import PatientsKycStepOne from "./kyc-step1";
import PatientsKycStepTwo from "./kyc-step2";

export type PatientOnBoardingData = {
  personalInfo: {
    dateOfBirth: string;
    gender: "Male" | "Female" | "";
    address: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phoneNumber: string;
    };
  };
  diabetesInfo: {
    dateOfDiagnosis: string;
    diabetesType: string;
    trackInsulin: boolean | undefined;
    insulinTherapy: "Pen / Syringes" | "Pump" | "No Insulin" | "";
    hasAllergies: boolean | undefined;
    allergies: string[] | [];
    hasChronicIllnesses: boolean | undefined;
    chronicIllnesses: string[] | [];
  };
};

const defaultPatientOnBoardingData: PatientOnBoardingData = {
  personalInfo: {
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phoneNumber: "",
    },
  },
  diabetesInfo: {
    dateOfDiagnosis: "",
    diabetesType: "",
    trackInsulin: undefined,
    insulinTherapy: "",
    hasAllergies: undefined,
    allergies: [],
    hasChronicIllnesses: undefined,
    chronicIllnesses: [],
  },
};

type ContextProps = {
  patientOnBoardingData: PatientOnBoardingData;
  state: PatientOnBoardingData;
  dispatch: ActionDispatch<[action: PersonalInfo | DiabetesInfo]>;
  setPatientOnBoardingData: Dispatch<SetStateAction<PatientOnBoardingData>>;
  next: () => void;
  prev: () => void;
};

type PersonalInfo = {
  type: "ADD_PERSONAL_INFO";
  payload: {
    dateOfBirth: string;
    gender: "Male" | "Female" | "";
    address: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phoneNumber: string;
    };
  };
};

type DiabetesInfo = {
  type: "ADD_DIABETES_INFO";
  payload: {
    dateOfDiagnosis: string;
    diabetesType: string;
    trackInsulin: boolean | undefined;
    insulinTherapy: "Pen / Syringes" | "Pump" | "No Insulin" | "";
    hasAllergies: boolean | undefined;
    allergies: string[] | [];
    hasChronicIllnesses: boolean | undefined;
    chronicIllnesses: string[] | [];
  };
};

type ActionProps = PersonalInfo | DiabetesInfo;

const reducer = (state: PatientOnBoardingData, action: ActionProps) => {
  switch (action.type) {
    case "ADD_PERSONAL_INFO":
      return { ...state, personalInfo: action.payload };

    case "ADD_DIABETES_INFO":
      return { ...state, diabetesInfo: action.payload };

    default:
      return state;
  }
};

const OnboardingContext = createContext<ContextProps>({} as ContextProps);
const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [patientOnBoardingData, setPatientOnBoardingData] =
    useState<PatientOnBoardingData>(defaultPatientOnBoardingData);
  const [state, dispatch] = useReducer(reducer, defaultPatientOnBoardingData);
  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  return (
    <div>
      <OnboardingContext.Provider
        value={{
          next,
          prev,
          state,
          dispatch,
          patientOnBoardingData,
          setPatientOnBoardingData,
        }}
      >
        {step === 1 ? (
          <PatientsKycStepOne />
        ) : step === 2 ? (
          <PatientsKycStepTwo />
        ) : (
          <PatientsKycStepThree />
        )}
      </OnboardingContext.Provider>
    </div>
  );
};

export const UseOnboardingContext = () => useContext(OnboardingContext);

export default Onboarding;
