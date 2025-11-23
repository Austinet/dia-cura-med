import { Suspense } from "react";
import VerifyEmail from "./verify-email";

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyEmail />
    </Suspense>
  );
};

export default VerifyEmailPage;
