import RegisterForm from "@/components/forms/register-form";
import { Suspense } from "react";

const Register = () => {
  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <RegisterForm />
      </Suspense>
    </main>
  );
};

export default Register;
