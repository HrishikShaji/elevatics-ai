
"use client";
import { useTheme } from "../contexts/ThemeContext";
import { PiGraduationCap, PiRocketLaunchThin } from "react-icons/pi";
import { useQuickReport } from "../contexts/QuickReportContext";
import { useRouter } from "next/navigation";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";

export default function QuickSearch() {
  const { theme, setModal } = useTheme();
  const { user } = useUser();
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
    <div className="mt-10 relative w-[50%]">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What's on your mind..."
        className="rounded-xl border-2 border-gray-100 focus:outline-gray-300 p-3 w-full"
      />{" "}
      <button
        onClick={handleSubmit}
        className="text-black absolute right-2 top-2"
      >
        <PiRocketLaunchThin size={30} />
      </button>
    </div>
  );
}
