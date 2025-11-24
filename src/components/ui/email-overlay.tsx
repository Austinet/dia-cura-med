import { FaEnvelope } from "react-icons/fa6";

const EmailOverlay = ({
  userEmail,
  message,
}: {
  userEmail: string;
  message: string;
}) => {
  return (
    <section className="fixed w-full h-screen top-0 left-0 flex items-center justify-center bg-[#00000099] p-5">
      <div className=" text-center bg-white rounded p-6 max-w-[350px] md:max-w-[450px] md:p-8">
        <FaEnvelope className="text-2xl text-[#062D45] inline" />
        <h1 className="text-[1.3rem] md:text-[1.5rem] text-[#062D45] font-semibold mt-1 mb-3">
          Check your email
        </h1>
        <p className="md:text-lg text-[#666666] mb-2">
          {message} link has been sent to{" "}
          <span className="font-semibold text-[#666666]">{userEmail}</span>.
          Didn’t receive the email? Check spam folder or junk.
        </p>
        <p className="font-semibold text-[#666666]">
          Verify your email to continue.
        </p>
      </div>
    </section>
  );
};

export default EmailOverlay;
