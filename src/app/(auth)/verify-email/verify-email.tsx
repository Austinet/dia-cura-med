"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setMessage("Invalid verification token");
        return;
      }

      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Verification failed");

        setMessage("Your email has been verified successfully!");
        router.push("/login");
      } catch (error: unknown) {
        if (error instanceof Error) {
          setMessage(`${error.message}`);
        }
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-50 p-5">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Email Verification</h1>
        <p className="max-w-[300px]">{message}</p>
      </div>
    </div>
  );
}
