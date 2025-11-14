"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import FormButton from "@/app/components/ui/FormButton";

const ForgotPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const handleForgotPassword = async () => {
  //   console.log(userEmail)
  //   // const email = userEmail
  //   try {
  //     const response = await axios.post("/api/auth/forgot-password", {
  //       "email": userEmail,
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       }
  //     }
  //     );
  //     response.status === 200 ? setIsSubmitted(true) : setIsSubmitted(false)
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error during password reset request:', error);
  //   }
  // };

  const resendEmail = () => {
    // handleForgotPassword()
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // handleForgotPassword()
  };

  return (
    <main>
      <section className="px-5 my-8 lg:my-12 font-Open_Sans">
        <div className="max-w-[600px] mx-auto md:rounded-[20px] md:shadow-lg md:p-10">
          <div>
            {!isSubmitted ? (
              <>
                <div className="mb-6 lg:mb-8 text-center space-y-4">
                  <FaLock className="text-lg text-[#062D45] inline" />
                  <h1 className="text-[1.4rem] md:text-[1.7rem] text-[#062D45] font-semibold md:mb-3">
                    Forgot Password
                  </h1>
                  <p className="text-lg text-[#666]">
                    Please enter the email address you used to create your
                    account. A link to reset your password will be sent to your
                    email address.
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-3 md:gap-7 mb-3 md:mb-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2 lg:mb-4"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        id="email"
                        className="border border-[#00000093] w-full h-[3.13rem] md:h-[3.25rem] rounded-lg px-3 outline-none focus:border-2"
                        required
                      />
                    </div>
                    <FormButton label="Send" className="" />
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="mb-6 lg:mb-8 text-center space-y-4">
                  <FaEnvelope className="text-lg text-[#062D45] inline" />
                  <h1 className="text-[1.4rem] md:text-[1.7rem] text-[#062D45] font-semibold md:mb-3">
                    Check your email
                  </h1>
                  <p className="text-lg text-[#666666]">
                    We have sent an email with password reset information to{" "}
                    {userEmail}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-center text-[#666666]">
                    Didn’t receive the email? Check spam folder or junk
                  </p>
                  <button
                    type="submit"
                    className="w-full text-white font-bold bg-[#107BC0] hover:bg-[#9353e5] rounded-md text-lg sm:text-[20px] justify-center px-[2rem] py-[0.8rem] my-5"
                    onClick={resendEmail}
                  >
                    Resend Email
                  </button>
                </div>
              </>
            )}

            <div>
              <Link
                href="/auth/login"
                className="w-full inline-block mb-5 text-[#107bc0] hover:text-white font-bold hover:bg-[#107BC0] rounded-md text-lg sm:text-[20px] text-center px-[2rem] py-[0.8rem] border border-[#107bc0]"
              >
                Back to Login
              </Link>
              <p className="text-sm text-center md:text-[1.125rem] text-[#000000d5] font-medium">
                <span>Don&apos;t have an account? </span>
                <Link href={"/auth/get-started"} className="text-[#107BC0]">
                  Create an account
                </Link>
              </p>
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

export default ForgotPassword;
