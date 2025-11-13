"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import FormButton from "../components/ui/FormButton";

//Default values for user inputs and error checking
const defaultDetails = {
  email: "",
  password: "",
  keepLoggedIn: false,
};

const defaultUserErrors = {
  email: false,
  password: false,
};

const Login = () => {
  const [userLogin, setUserLogin] = useState(defaultDetails);
  const [userLoginErrors, setUserLoginErrors] = useState(defaultUserErrors);
  const [passwordType, setPasswordType] = useState("password");
  const passwordView = useRef<HTMLInputElement>(null!);

  // Set form property values
  const setProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value.trim(),
    });
  };

  //Toggles the password view from hidden to seen for the user
  const togglePasswordView = () => {
    const type = passwordView.current.type === "password" ? "text" : "password";
    setPasswordType(type);
  };

  //Validates user and makes login requests
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // const authenticate = usersDB?.find(
    //   (user) => user.email === userLogin.email
    // );

    // if (authenticate) {
    //   if (authenticate.password === userLogin.password) {
    //     dispatch({ type: "USER_LOGGED_IN", payload: userLogin });
    //     navigate("/dashboard");
    //   } else {
    //     setUserLoginErrors({ ...userLoginErrors, password: true });
    //   }
    // } else {
    //   setUserLoginErrors({ ...userLoginErrors, email: true });
    // }
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
    <main>
      <section className="px-5 my-8 lg:my-12 font-Open_Sans">
        <div className="max-w-[600px] mx-auto md:rounded-[20px] md:shadow-lg gap-10 md:p-10">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-[1.4rem] md:text-[1.7rem] text-[#062D45] font-semibold md:mb-3">
              Login
            </h1>
            <p className="text-lg text-[#3891CA]">
              Login to access your dashboard
            </p>
          </div>
          <div>
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
                    value={userLogin.email}
                    onChange={setProperty}
                    id="email"
                    className="border border-[#00000093] w-full h-[3.13rem] md:h-[3.25rem] rounded-lg px-3 outline-none focus:border-2"
                    required
                  />
                  <span
                    className={`text-red-600 ${
                      userLoginErrors.email ? "block" : "hidden"
                    }`}
                  >
                    Email not found, please sign up
                  </span>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2 lg:mb-4"
                  >
                    Password:
                  </label>
                  <div className="relative">
                    <input
                      type={passwordType}
                      name="password"
                      value={userLogin.password}
                      onChange={setProperty}
                      ref={passwordView}
                      className="border border-[#00000093] w-full h-[3.13rem] md:h-[3.25rem] rounded-lg px-3 outline-none focus:border-2"
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
                      userLoginErrors.password ? "block" : "hidden"
                    }`}
                  >
                    Incorrect password
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-1">
                <div className="flex items-center gap-1 md:gap-2">
                  <input
                    type="checkbox"
                    checked={userLogin.keepLoggedIn}
                    onChange={(e) =>
                      setUserLogin({
                        ...userLogin,
                        keepLoggedIn: e.currentTarget.checked,
                      })
                    }
                    name="keep-logged-in"
                    id="keep-logged-in"
                  />
                  <label
                    htmlFor="keep-logged-in"
                    className="text-sm md:text-lg md:font-medium"
                  >
                    Keep me logged in
                  </label>
                </div>
                <div>
                  <Link
                    href="/forgot-password"
                    className="text-[#107BC0] text-sm md:text-lg md:font-medium"
                  >
                    Forgot password
                  </Link>
                </div>
              </div>
              <FormButton label="Login" className="mt-5 mb-3 md:mt-7 md:mb-5" />
              <div className="text-center">
                <p className="text-sm md:text-[1.125rem] text-[#000000d5] font-medium">
                  <span>Don&apos;t have an account? </span>
                  <Link href={"/get-started"} className="text-[#107BC0]">
                    Create an account
                  </Link>
                </p>
              </div>
            </form>
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

export default Login;
