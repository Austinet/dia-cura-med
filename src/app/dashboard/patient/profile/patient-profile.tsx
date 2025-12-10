"use client";
import { UserInterface } from "@/models/Users";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaSave } from "react-icons/fa";
import { FaCamera, FaPen } from "react-icons/fa6";

type UserBio = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "patient" | "doctor";
  isVerified: boolean;
  verificationToken: string;
  verificationTokenExpiry: Date;
  onboarding: string;
};

const PatientProfile = () => {
  const [loading, setLoading] = useState(false);
  const [editUserBio, setEditUserBio] = useState(false);
  const [userBio, setUserBio] = useState<UserBio>({} as UserBio);
  let adminData = {
    fname: "",
    email: "",
    lname: "",
    phone: "",
    country: "",
    company: "",
    city: "",
    zipcode: "",
  };

  const [isformFilled, setisFormFilled] = useState(false);
  const [admin, setAdmin] = useState(adminData);
  const [isEditing, setisEditing] = useState(false);
  const bioInputRef = useRef(null);
  const personalInputRef = useRef(null);

  // Set bio data values
  const handleBioInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserBio({ ...userBio, [e.target.name]: e.target.value });
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     setTimeout(() => {
  //       setisFormFilled(false);
  //     }, 3000);
  //   };

  //   const handleInputChange = (e) => {
  //     setAdmin({ ...admin, [e.target.name]: e.target.value });
  //     setisFormFilled(true);
  //   };

  //   const handlePersonalEditClick = () => {
  //     setisEditing(true);
  //     personalInputRef.current.focus();
  //   };

  const handleBlur = () => {
    setisEditing(false);
  };

  const handleEditUserBio = () => {
    setEditUserBio(true);
    // bioInputRef.current.focus();
  };

  const handleSubmitUserBio = (e: React.FormEvent) => {
    e.preventDefault();
    setEditUserBio(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/users/me");
      const data = await res.json();
      setUserBio(data.user);
      setLoading(true);
    };
    fetchUser();
  }, []);

  return (
    <>
      <section>
        <div className="flex gap-4 items-center">
          <div className="relative w-fit">
            <Image
              src="/images/dashboard/face.svg"
              alt="profile picture"
              width={130}
              height={38}
              className="rounded-full w-[75px] h-[75px] md:w-[105px] md:h-[105px]"
              priority
            />
            <button
              type="button"
              className="block absolute bottom-[-8px] right-0 rounded-full bg-[#107BC0] hover:bg-[#9353e5] p-2 md:p-3"
            >
              <FaCamera className="md:text-[1.8rem] text-white" />
            </button>
          </div>
          <div>
            {!loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <h2 className="font-bold text-lg md:text-2xl mb-1">
                  {`${userBio.firstName
                    .charAt(0)
                    .toLocaleUpperCase()}${userBio.firstName
                    .slice(1)
                    .toLocaleLowerCase()}
                    ${userBio.lastName
                      .charAt(0)
                      .toLocaleUpperCase()}${userBio.lastName
                    .slice(1)
                    .toLocaleLowerCase()}
                    `}
                </h2>
                <p className="font-normal text-lg text-[#595959]">
                  {userBio.role.charAt(0).toLocaleUpperCase() +
                    userBio.role.slice(1)}
                </p>
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmitUserBio}>
          <div className="mt-7 md:mt-12 space-y-7">
            <div className="flex justify-between items-center p-2 border-b border-b-[#CFE5F2]">
              <h3 className="font-bold text-lg md:text-2xl">Bio Data</h3>
              {!editUserBio ? (
                <div
                  role="button"
                  className="cursor-pointer flex items-center gap-2 text-[#107BC0] font-bold text-base md:text-[18px] outline-none"
                  onClick={handleEditUserBio}
                >
                  <FaPen />
                  <span>Edit</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="cursor-pointer flex items-center gap-2 bg-[#CFE5F2] lg:py-[18px] p-2 lg:px-8 rounded text-[#107BC0] font-bold text-base md:text-[18px] outline-none"
                >
                  <FaSave />
                  <span>Save Changes</span>
                </button>
              )}
            </div>
            {!loading ? (
              <p>Loading profile...</p>
            ) : (
              <>
                <div className="patient-kyc-input-row mb-5">
                  <div className="patient-kyc-input-col">
                    <label htmlFor="firstName" className="profile-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={userBio.firstName}
                      disabled={!editUserBio}
                      className="patient-kyc-input"
                      onChange={handleBioInputChange}
                      ref={bioInputRef}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="patient-kyc-input-col">
                    <label htmlFor="lastName" className="profile-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={userBio.lastName}
                      disabled={!editUserBio}
                      className="patient-kyc-input"
                      onChange={handleBioInputChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="patient-kyc-input-row">
                  <div className="patient-kyc-input-col">
                    <label htmlFor="email" className="profile-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={userBio.email}
                      disabled={!editUserBio}
                      className="patient-kyc-input"
                      onChange={handleBioInputChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="patient-kyc-input-col">
                    <label htmlFor="phoneNumber" className="profile-label">
                      Phone no.
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={userBio.phoneNumber}
                      disabled={!editUserBio}
                      className="patient-kyc-input"
                      onChange={handleBioInputChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      </section>
      <div>
        {/* <form action="" onSubmit={handleSubmit}>
          <div className="mt-10">
            <div className="flex justify-between items-center p-2 border-b border-[#CFE5F2]">
              <h3 className="font-bold text-2xl">Personal Information</h3>
              {isformFilled ? (
                ""
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={handlePersonalEditClick}
                >
                  Edit
                </div>
              )}
            </div>
            <div className="patient-kyc-input-row mt-7">
              <div className="patient-kyc-input-col">
                <div className="mb-5">
                  <label htmlFor="country" className="profile-label">
                    Country of Residence
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Nigeria"
                    className="patient-kyc-input admin-input"
                    onChange={handleInputChange}
                    ref={personalInputRef}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <label htmlFor="company" className="profile-label">
                    Company/Hospital name
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    placeholder="Diacura medical centre"
                    className="patient-kyc-input admin-input"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="patient-kyc-input-col">
                <div className="mb-5">
                  <label htmlFor="city" className="profile-label">
                    City/State
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Ikeja, Lagos state."
                    className="patient-kyc-input admin-input"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="mb-10 xl:mb-0">
                  <label htmlFor="zipcode" className="profile-label">
                    Zip code
                  </label>
                  <input
                    type="tel"
                    name="zipcode"
                    id="zipcode"
                    placeholder="110001"
                    className="patient-kyc-input admin-input"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>
          </div>
        </form> */}
      </div>
    </>
  );
};

export default PatientProfile;
