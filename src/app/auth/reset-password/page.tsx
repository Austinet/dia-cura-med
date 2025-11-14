"use client";

import { useRef, useState } from "react";
// import { useParams } from "react-router";
import { FaCheck, FaLock } from "react-icons/fa6";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import FormButton from "@/app/components/ui/FormButton";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [newPasswordError, setNewPasswordError] = useState({
    password: false,
    confirmPassword: false,
  });
  const [passwordType, setPasswordType] = useState("password");
  const passwordView = useRef<HTMLInputElement>(null!);
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  //Toggles the password view from hidden to seen for the user
  const togglePasswordView = () => {
    const type = passwordView.current.type === "password" ? "text" : "password";
    setPasswordType(type);
  };

  // Set form property values
  const setProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword({
      ...newPassword,
      [e.target.id]: e.target.value.trim(),
    });
  };

  //Validates user inputs fields
  const validateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;

    if (field === "password") {
      const password = !PASSWORD_REGEX.test(newPassword.password);
      setNewPasswordError({ ...newPasswordError, password });
    } else if (field === "confirmPassword") {
      const confirmPassword =
        newPassword.confirmPassword === newPassword.password ? false : true;
      setNewPasswordError({ ...newPasswordError, confirmPassword });
    }
  };

  function validateForm() {
    return !newPasswordError.password && !newPasswordError.confirmPassword;
  }
  // const { token } = useParams()
  //   const token =
  //     "54945b3d4efed98be8a8da5654d49e06df420647677f71f46952c2a85be0f6ee";
  //   const id = "656f281ed758ee0ef1836daa";

  const [displaySuccess, setDisplaySuccess] = useState(false);

  //   const ResetPassword = async () => {
  //     console.log(token, id, password, confirmPassword)
  //     const newPassword = password
  //     const confirmNewPassword = confirmPassword
  //     try{
  //       const response = await axios.patch("/api/auth/reset-password", {
  //         "token": token,
  //         "id": id,
  //         "password": newPassword,
  //         "confirm_password": confirmNewPassword
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json; charset=utf-8",
  //         }
  //       })
  //       console.log(response.data)
  //       response.status === 200 ? setDisplaySuccess(true) : setDisplaySuccess(false)
  //     }catch(error){
  //       console.log("Error on reset", error)
  //     }
  //   }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // ResetPassword();
      setDisplaySuccess(true);
    }
  };

  return (
    <main>
      <section className="px-5 my-8 lg:my-12 font-Open_Sans">
        <div className="max-w-[600px] mx-auto md:rounded-[20px] md:shadow-lg md:p-10">
          <div>
            {!displaySuccess ? (
              <>
                <div className="mb-6 lg:mb-8 text-center space-y-4">
                  <FaLock className="text-lg text-[#062D45] inline" />
                  <h1 className="text-[1.4rem] md:text-[1.7rem] text-[#062D45] font-semibold md:mb-3">
                    Reset Password
                  </h1>
                  <p className="text-lg text-[#666]">
                    Enter a new password for your account
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-3 md:gap-7 mb-3 md:mb-5">
                    <div className="flex flex-col gap-3 md:gap-5">
                      <div className="">
                        <label
                          htmlFor="password"
                          className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                        >
                          Password:
                        </label>
                        <div className="relative">
                          <input
                            type={passwordType}
                            id="password"
                            value={newPassword.password}
                            onChange={setProperty}
                            onInput={validateField}
                            onBlur={validateField}
                            ref={passwordView}
                            className="border border-[#00000093] w-full h-[3.13rem] rounded-lg pl-3 pr-12 outline-none focus:border-2"
                            required
                          />
                          <button
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
                        <span
                          className={`text-red-600 ${
                            newPasswordError.password ? "block" : "hidden"
                          }`}
                        >
                          Must be more than 8 characters, should include upper
                          and lowercase letters, a number and a special
                          character (!@#$%)
                        </span>
                      </div>
                      <div className="">
                        <label
                          htmlFor="confirmPassword"
                          className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                        >
                          Confirm Password:
                        </label>
                        <div className="relative">
                          <input
                            type={passwordType}
                            id="confirmPassword"
                            value={newPassword.confirmPassword}
                            onChange={setProperty}
                            onInput={validateField}
                            onBlur={validateField}
                            ref={passwordView}
                            className="border border-[#00000093] w-full h-[3.13rem] rounded-lg pl-3 12 outline-none focus:border-2"
                            required
                          />
                          <button
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
                        <span
                          className={`text-red-600 ${
                            newPasswordError.confirmPassword
                              ? "block"
                              : "hidden"
                          }`}
                        >
                          Must match the password field
                        </span>
                      </div>
                    </div>
                    <FormButton label="Save" className="mt-4" />
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="mb-6 lg:mb-8 text-center space-y-4">
                  <FaCheck className="text-[3rem] text-green-600 inline" />
                  <h2 className="text-[1.4rem] md:text-[1.7rem] text-[#062D45] font-semibold md:mb-3">
                    Password reset successfully
                  </h2>
                  <p className="text-lg text-[#666666]">
                    Log in into your account with your new password.
                  </p>
                  <Link
                    href="/auth/login"
                    className="w-full inline-block text-white text-center font-bold bg-[#107BC0] hover:bg-[#9353e5] rounded-md text-lg sm:text-[20px] justify-center px-[2rem] py-[0.8rem] my-5"
                  >
                    Login
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Successful registration overlay */}
        {/* <Toast
                message="Registered Successfully"
                closeForm={() => navigate.push("/login")}
                success={success}
                /> */}
      </section>
    </main>
  );
};

export default ResetPassword;
