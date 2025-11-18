"use client";

import { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type PasswordInputProps = {
  label: string;
  id: string;
  value: string;
  setProperty: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordErrors: boolean;
};

const PasswordInput = ({
  label,
  id,
  value,
  setProperty,
  validateField,
  passwordErrors,
}: PasswordInputProps) => {
  const passwordView = useRef<HTMLInputElement>(null!);
  const [passwordType, setPasswordType] = useState("password");

  //Toggles the password view from hidden to seen for the user
  const togglePasswordView = () => {
    const type = passwordView.current.type === "password" ? "text" : "password";
    setPasswordType(type);
  };

  return (
    <>
      <label
        htmlFor={id}
        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
      >
        {label}:
      </label>
      <div className="relative">
        <input
          type={passwordType}
          id={id}
          name={id}
          value={value}
          onChange={setProperty}
          onInput={validateField}
          onBlur={validateField}
          ref={passwordView}
          className="border border-[#00000093] w-full h-[3.13rem] rounded-lg pl-3 pr-12 outline-none focus:border-2"
          required
        />
        <button
          type="button"
          className="absolute right-3 top-[0.62rem] outline-none"
          onClick={togglePasswordView}
        >
          {passwordType === "password" ? (
            <AiFillEye className="text-3xl" />
          ) : (
            <AiFillEyeInvisible className="text-3xl" />
          )}
        </button>
      </div>
      {passwordErrors && (
        <span className="text-red-600">
          {id === "password"
            ? "Must be more than 8 characters, should include upper and lowercase letters, a number and a special character (!@#$%)"
            : "Must match the password field"}
        </span>
      )}
    </>
  );
};

export default PasswordInput;
