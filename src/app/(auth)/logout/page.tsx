"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";

export default function LogoutButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Logged out successfully");
        // Redirect to login page
        router.push("/login");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`${
        className
          ? className
          : "px-4 text-[1.125rem] text-white flex items-center gap-3 disabled:opacity-50  border border-white rounded-[0.625rem] py-[1rem]"
      }`}
    >
      {loading ? "Logging out..." : "Logout"}{" "}
      <MdLogout className="text-[1.7rem]" />
    </button>
  );
}
