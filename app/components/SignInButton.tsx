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
      className="p-2 text-xl rounded-md bg-white text-gray-500 hover:text-black fixed z-40 top-2 right-24"
    >
      Sign in
    </button>
  );
}
