"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    if (!token || !email) {
      setMessage("Invalid verification link");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `/api/auth/verify-email?token=${token}&email=${email}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Verification failed");

        setMessage("Your email has been verified successfully!");
      } catch (err: any) {
        setMessage(`${err.message}`);
      }
    };

    verify();
  }, [token, email]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Email Verification</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
