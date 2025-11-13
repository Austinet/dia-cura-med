"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa6";
import FormButton from "../components/ui/FormButton";

//Default values for user inputs and error checking
const defaultUser = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  termsAndCondition: false,
};

const defaultUserErrors = {
  firstName: false,
  lastName: false,
  email: false,
  phoneNumber: false,
  password: false,
  confirmPassword: false,
  termsAndCondition: false,
};

const Register = () => {
  // const [success, setSuccess] = useState(false);
  const [newUser, setNewUser] = useState(defaultUser);
  const [passwordType, setPasswordType] = useState("password");
  const [newUserErrors, setNewUserErrors] = useState(defaultUserErrors);
  // const { dispatch, usersDB } = useAuthContext();
  const passwordView = useRef<HTMLInputElement>(null!);
  const navigate = useRouter();
  const role = "";

  const NAME_REGEX = /^[a-zA-Z][a-zA-Z]{2,}$/;
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const PHONE_REGEX = /^\d{11}$/;

  // Set form property values
  const setProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.id]: e.target.value.trim(),
    });
  };

  //Toggles the password view from hidden to seen for the user
  const togglePasswordView = () => {
    const type = passwordView.current.type === "password" ? "text" : "password";
    setPasswordType(type);
  };

  //Validates user inputs fields
  const validateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;

    if (field === "firstName") {
      const firstName = !NAME_REGEX.test(newUser.firstName);
      setNewUserErrors({ ...newUserErrors, firstName });
    } else if (field === "lastName") {
      const lastName = !NAME_REGEX.test(newUser.lastName);
      setNewUserErrors({ ...newUserErrors, lastName });
    } else if (field === "phoneNumber") {
      const phoneNumber = !PHONE_REGEX.test(newUser.phoneNumber);
      setNewUserErrors({ ...newUserErrors, phoneNumber });
    } else if (field === "email") {
      const email = newUser.email.trim() ? false : true;
      setNewUserErrors({ ...newUserErrors, email });
    } else if (field === "password") {
      const password = !PASSWORD_REGEX.test(newUser.password);
      setNewUserErrors({ ...newUserErrors, password });
    } else if (field === "confirmPassword") {
      const confirmPassword =
        newUser.confirmPassword === newUser.password ? false : true;
      setNewUserErrors({ ...newUserErrors, confirmPassword });
    }
  };

  function validateForm() {
    return (
      !newUserErrors.firstName &&
      !newUserErrors.lastName &&
      !newUserErrors.phoneNumber &&
      !newUserErrors.email &&
      !newUserErrors.password &&
      !newUserErrors.confirmPassword
    );
  }

  //Validates user inputs and makes sign up requests
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // if (usersDB?.some((users) => users.phoneNumber === newUser.phoneNumber)) {
      //   alert("Phone number already used");
      //   return;
      // }

      // if (usersDB?.some((users) => users.email === newUser.email)) {
      //   alert("Email address already used");
      //   return;
      // }

      // dispatch({ type: "ADD_USER", payload: newUser });
      // setSuccess(true);

      // Reset

      const { firstName, lastName, email, phoneNumber, password } = newUser;
      const user = { firstName, lastName, email, phoneNumber, password, role };
      console.log(user);
      setNewUser(defaultUser);
    }
  };

  // Go to previous page
  const goBack = () => {
    navigate.push("/get-started");
  };

  // const handleRegistration = async () => {
  //   console.log(username, email, password, passwordConfirm, role);
  //   if (isFormValid) {
  //     try {
  //       const response = await axios.post(
  //         "https://diacura-med.onrender.com/api/auth/register",
  //         {
  //           username,
  //           email,
  //           password,
  //           confirm_password: passwordConfirm,
  //           role,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       if (response.status === 200 || response.status === 201) {
  //         console.log("Registration successful!");
  //         // Redirect the user to the login page
  //       } else {
  //         console.error("Registration failed:", response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error during registration:", error);
  //     }
  //   } else {
  //     console.error("Invalid form data");
  //   }
  // };

  return (
    <main className=" w-full items-center justify-center font-Open_Sans">
      <section className="px-5 mb-8 lg:mb-12">
        {/* Back button */}
        <div className="mt-5">
          <button
            onClick={goBack}
            className="flex items-center gap-[0.2rem] sm:gap-[0.5rem] mb-[0.75rem] md:mb-5"
          >
            <FaChevronLeft /> <span className="text-[1.125rem]">Back</span>
          </button>
        </div>

        <div className="max-w-[800px] mx-auto md:rounded-[20px] md:shadow-lg gap-10 md:p-10">
          <div className="py-2">
            <div className="mb-6 lg:mb-8">
              <h1 className="text-[1.7rem] text-[#062D45] font-semibold md:mb-3">
                Register
              </h1>
              <p className="text-lg text-[#3891CA]">Sign up to get started</p>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div className="flex flex-col md:flex-row gap-3 md:gap-5">
                  <div className="md:w-[50%]">
                    <label
                      htmlFor="firstName"
                      className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                    >
                      First Name:
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={newUser.firstName}
                      onChange={setProperty}
                      onInput={validateField}
                      onBlur={validateField}
                      className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                      required
                    />
                    <span
                      className={`text-red-600 ${
                        newUserErrors.firstName ? "block" : "hidden"
                      }`}
                    >
                      Must be more than 2 characters, letters only
                    </span>
                  </div>
                  <div className="md:w-[50%]">
                    <label
                      htmlFor="lastName"
                      className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                    >
                      Last Name:
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={newUser.lastName}
                      onChange={setProperty}
                      onInput={validateField}
                      onBlur={validateField}
                      className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                      required
                    />
                    <span
                      className={`text-red-600 ${
                        newUserErrors.lastName ? "block" : "hidden"
                      }`}
                    >
                      Must be more than 2 characters, letters only
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3 md:gap-5">
                  <div className="md:w-[50%]">
                    <label
                      htmlFor="phoneNumber"
                      className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                    >
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={newUser.phoneNumber}
                      onChange={setProperty}
                      onInput={validateField}
                      onBlur={validateField}
                      className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                      required
                    />
                    <span
                      className={`text-red-600 ${
                        newUserErrors.phoneNumber ? "block" : "hidden"
                      }`}
                    >
                      Phone number must consist of 11 digits
                    </span>
                  </div>
                  <div className="md:w-[50%]">
                    <label
                      htmlFor="email"
                      className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={newUser.email}
                      onChange={setProperty}
                      onInput={validateField}
                      onBlur={validateField}
                      className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                      required
                    />
                    <span
                      className={`text-red-600 ${
                        newUserErrors.email ? "block" : "hidden"
                      }`}
                    >
                      Enter a valid email address
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3 md:gap-5">
                  <div className="md:w-[50%]">
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
                        value={newUser.password}
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
                        newUserErrors.password ? "block" : "hidden"
                      }`}
                    >
                      Must be more than 8 characters, should include upper and
                      lowercase letters, a number and a special character
                      (!@#$%)
                    </span>
                  </div>
                  <div className="md:w-[50%]">
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
                        value={newUser.confirmPassword}
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
                        newUserErrors.confirmPassword ? "block" : "hidden"
                      }`}
                    >
                      Must match the password field
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={newUser.termsAndCondition}
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          termsAndCondition: e.currentTarget.checked,
                        })
                      }
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="text-[0.82rem] md:text-lg"
                    >
                      <span>I agree to all the </span>
                      <Link href="/" className="text-blue-600 font-medium">
                        Terms, Privacy Policy and Conditions
                      </Link>
                    </label>
                  </div>
                  <span
                    className={`text-red-600 ${
                      newUserErrors.termsAndCondition ? "block" : "hidden"
                    }`}
                  >
                    Accept Terms, Privacy Policy and Conditions to continue
                  </span>
                </div>
                <FormButton label="Create Account" className="mt-5 mb-2" />
                <div className="text-center">
                  <p className="text-[1.125rem] text-[#000000d5] font-medium">
                    <span>Already have an account? </span>
                    <Link href={"/login"} className="text-blue-600">
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
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

export default Register;
