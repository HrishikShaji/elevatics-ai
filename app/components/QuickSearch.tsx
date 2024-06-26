
"use client";
import { useTheme } from "../contexts/ThemeContext";
import { PiGraduationCap, PiRocketLaunchThin } from "react-icons/pi";
import { useQuickReport } from "../contexts/QuickReportContext";
import { useRouter } from "next/navigation";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";

export default function QuickSearch() {
  const { theme, setModal } = useTheme();
  const { user, queries } = useUser();
  const [input, setInput] = useState("")
  const { setPrompt } = useQuickReport();
  const router = useRouter();


  function handleSubmit() {
    if (user && user.queries > 0) {
      setPrompt(input)
      router.push("/quick-report");
    } else {
      setModal("limit")
    }
  }
  return (
    <div className="mt-10 h-[80px] relative flex items-center justify-center sm:w-[50%] ">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What's on your mind..."
        className="rounded-3xl border-2 text-xl h-full border-gray-100 shadow-lg focus:outline-gray-300 px-10 w-full"
      />{" "}
      <button
        onClick={handleSubmit}
        className="text-black absolute top-28 p-2 cursor-pointer rounded-full bg-gray-300 sm:top-auto sm:right-5 "
      >
        <PiRocketLaunchThin size={30} />
      </button>
    </div>
  );
}
