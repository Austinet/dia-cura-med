"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import FormButton from "../ui/form-button";
import toast from "react-hot-toast";
import { defaultUser, defaultUserErrors } from "@/constants/constants";
import PasswordInput from "../ui/PasswordInput";
import EmailOverlay from "../ui/email-overlay";

const RegisterForm = () => {
  const [newUser, setNewUser] = useState(defaultUser);
  const [newUserErrors, setNewUserErrors] = useState(defaultUserErrors);
  const [loading, setLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const NAME_REGEX = /^[a-zA-Z][a-zA-Z]{2,}$/;
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const PHONE_REGEX = /^\d{11}$/;

  //Check for role
  useEffect(() => {
    const role = searchParams.get("role");
    if (!role || !["patient", "doctor"].includes(role)) {
      router.replace("/get-started");
      return;
    }

    setNewUser({ ...newUser, role });
  }, [searchParams, router]);

  // Set form property values
  const setProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.id]: e.target.value.trim(),
    });
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    const { firstName, lastName, email, phoneNumber, password, role } = newUser;
    const user = { firstName, lastName, email, phoneNumber, password, role };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "appication/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerResponse(data.message);
        throw new Error(data.message || "Registration failed");
      }
      setSuccess(true);
      toast.success("Registered successfully");

      // Reset
      setNewUser(defaultUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  // Go to previous page
  const goBack = () => {
    router.push("/get-started");
  };

  return (
    <section className="px-5 mb-8 lg:mb-12 font-Open_Sans ">
      {/* Back button */}
      <div className="mt-5">
        <button
          onClick={goBack}
          className="flex items-center gap-[0.2rem] sm:gap-[0.5rem] mb-[0.75rem] md:mb-5"
        >
          <FaChevronLeft /> <span className="text-[1.125rem]">Back</span>
        </button>
      </div>

      <div className="max-w-[800px] mx-auto py-2 md:rounded-[20px] md:shadow-lg gap-10 md:p-10">
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
                  placeholder="Enter your first name"
                  className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                  required
                />
                {newUserErrors.firstName && (
                  <span className="text-red-600">
                    Must be more than 2 characters, letters only
                  </span>
                )}
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
                  placeholder="Enter your last name"
                  className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                  required
                />
                {newUserErrors.lastName && (
                  <span className="text-red-600">
                    Must be more than 2 characters, letters only
                  </span>
                )}
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
                  placeholder="08120000000"
                  className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                  required
                />
                {newUserErrors.phoneNumber && (
                  <span className="text-red-600">
                    Phone number must consist of 11 digits
                  </span>
                )}
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
                  placeholder="example@gmail.com"
                  className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                  required
                />
                {newUserErrors.email && (
                  <span className="text-red-600">
                    Enter a valid email address
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:gap-5">
              <div className="md:w-[50%]">
                <PasswordInput
                  id="password"
                  label="Password"
                  value={newUser.password}
                  setProperty={setProperty}
                  validateField={validateField}
                  passwordErrors={newUserErrors.password}
                />
              </div>
              <div className="md:w-[50%]">
                <PasswordInput
                  id="confirmPassword"
                  label="Confirm Password"
                  value={newUser.confirmPassword}
                  setProperty={setProperty}
                  validateField={validateField}
                  passwordErrors={newUserErrors.confirmPassword}
                />
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
                <label htmlFor="terms" className="text-[0.82rem] md:text-lg">
                  <span>I agree to all the </span>
                  <Link href="/" className="text-[#107bc0] font-medium">
                    Terms, Privacy Policy and Conditions
                  </Link>
                </label>
              </div>
            </div>
            <FormButton
              label="Create Account"
              disabled={loading}
              className="mt-5 mb-2"
            />
            <div className="text-center">
              <p className="text-[1.125rem] text-[#000000d5] font-medium">
                <span>Already have an account? </span>
                <Link href={"/login"} className="text-[#107bc0]">
                  Log in
                </Link>
              </p>
              <p className="text-red-600">{serverResponse}</p>
            </div>
          </form>
        </div>
      </div>

      {/* Success */}
      {success && (
        <EmailOverlay
          message="An email verification"
          userEmail={newUser.email}
        />
      )}
    </section>
  );
};

export default RegisterForm;
