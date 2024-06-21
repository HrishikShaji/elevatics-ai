"use client";
import { useSession } from "next-auth/react";
import { useTheme } from "../contexts/ThemeContext";

export default function SignInButton() {
  const { status } = useSession();
  const { setModal } = useTheme();
  if (status === "authenticated") return null;
  return (
    <button
      onClick={() => setModal("signIn")}
      className="p-2 rounded-md bg-black text-white fixed z-40 top-2 right-4"
    >
      Sign in
    </button>
  );
}
