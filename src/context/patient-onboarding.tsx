"use client";

import {
  ActionDispatch,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import { UserInterface } from "@/models/Users";

type PatientOnBoardingData = {
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
  step: number;
  user: UserInterface;
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

export const OnboardingContext = createContext<ContextProps>(
  {} as ContextProps
);

const PatientOnboardingContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserInterface>({} as UserInterface);
  const [step, setStep] = useState(1);
  const [patientOnBoardingData, setPatientOnBoardingData] =
    useState<PatientOnBoardingData>(defaultPatientOnBoardingData);
  const [state, dispatch] = useReducer(reducer, defaultPatientOnBoardingData);
  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/users/me");
      const data = await res.json();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        next,
        prev,
        step,
        state,
        dispatch,
        patientOnBoardingData,
        setPatientOnBoardingData,
        user,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export default PatientOnboardingContext;
