"use client";
import { useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa6";

const resetForm = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

const resetFormErrors = {
  firstName: false,
  lastName: false,
  email: false,
  message: false,
};

const ContactUs = () => {
  const [contactForm, setContactForm] = useState(resetForm);
  const [formErrors, setFormErrors] = useState(resetFormErrors);
  const NAME_REGEX = /^[a-zA-Z][a-zA-Z]{2,}$/;
  const MESSAGE_REGEX = /^(?=.*[A-Za-z])[\w\s.,!?'"@#%&()\-:;/]{10,500}$/;

  // Set form property values
  const setProperty = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactForm({
      ...contactForm,
      [e.target.id]: e.target.value.trim(),
    });
  };

  //Validates user inputs fields
  const validateField = (field: string) => {
    if (field === "firstName") {
      const firstName = !NAME_REGEX.test(contactForm.firstName);
      setFormErrors({ ...formErrors, firstName });
    } else if (field === "lastName") {
      const lastName = !NAME_REGEX.test(contactForm.lastName);
      setFormErrors({ ...formErrors, lastName });
    } else if (field === "email") {
      const email = contactForm.email.trim() ? false : true;
      setFormErrors({ ...formErrors, email });
    } else if (field === "message") {
      const message = !MESSAGE_REGEX.test(contactForm.message);
      setFormErrors({ ...formErrors, message });
    }
  };

  function validateForm() {
    return (
      !formErrors.firstName &&
      !formErrors.lastName &&
      !formErrors.email &&
      !formErrors.message
    );
  }

  //Validates user inputs and makes sign up requests
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      //   dispatch({ type: "CONTACT", payload: contactForm });
      //   setSuccess(true);

      // Reset
      setContactForm(resetForm);
    }
  };
  return (
    <main>
      <section>
        <div className="font-Open-sans px-5 py-8 space-y-6 md:flex justify-between lg:items-center gap-5 lg:px-12 lg:py-18">
          <div className="max-w-[500px]">
            <h1 className="text-2xl font-bold text-[#062D45] md:text-3xl mb-4 md:mb-8">
              Contact us
            </h1>
            <h2 className="font-semibold text-[1.3rem] text-[#3891CA] mb-2 md:text-2xl md:mb-6">
              Get in touch
            </h2>
            <p className="text-lg">
              Use our contact form for all information request or contact us
              directly using the contact information below. All information is
              treated with complete confidentiality and In accordance with our
              our data protection statement.
            </p>
            <div className="mt-10 text-lg lg:mt-30">
              <p>Feel free to reach out to us via email or on phone:</p>
              <div className="lg:flex justify-between items-center mt-4 space-y-1 text-[#3891CA]">
                <p className="flex items-center gap-2">
                  <FaEnvelope /> <span>diacuramed@gmail.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaPhone /> <span>+2348140000000</span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:max-w-[500px]">
            <form onSubmit={handleSubmit} className="space-y-5 w-full">
              <div>
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
                  value={contactForm.firstName}
                  onChange={setProperty}
                  onBlur={() => validateField("firstName")}
                  onInput={() => validateField("firstName")}
                  className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                  required
                />
                <span
                  className={`text-red-600 ${
                    formErrors.firstName ? "block" : "hidden"
                  }`}
                >
                  Must be more than 2 characters, letters only
                </span>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={contactForm.lastName}
                  onChange={setProperty}
                  onBlur={() => validateField("lastName")}
                  onInput={() => validateField("lastName")}
                  className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                  required
                />
                <span
                  className={`text-red-600 ${
                    formErrors.lastName ? "block" : "hidden"
                  }`}
                >
                  Must be more than 2 characters, letters only
                </span>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={contactForm.email}
                  onChange={setProperty}
                  onBlur={() => validateField("email")}
                  onInput={() => validateField("email")}
                  className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                  required
                />
                <span
                  className={`text-red-600 ${
                    formErrors.email ? "block" : "hidden"
                  }`}
                >
                  Enter a valid email address
                </span>
              </div>
              <div className="">
                <label
                  htmlFor="message"
                  className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                >
                  Message:
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={contactForm.lastName}
                  onChange={setProperty}
                  onBlur={() => validateField("message")}
                  onInput={() => validateField("message")}
                  className="border border-[#00000093] w-full h-[100px] resize-none rounded-lg px-3 outline-none focus:border-2"
                  required
                ></textarea>
                <span
                  className={`text-red-600 ${
                    formErrors.message ? "block" : "hidden"
                  }`}
                >
                  Must be more than 10 characters.
                </span>
              </div>
              <button
                type="submit"
                className="w-full mt-2 text-white font-bold bg-[#107BC0] hover:bg-[#9353e5] rounded-md text-lg sm:text-[20px] justify-center px-[2rem] py-[0.8rem]"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
