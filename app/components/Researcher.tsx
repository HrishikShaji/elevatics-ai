"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import { useTheme } from "../contexts/ThemeContext";
import { PiRocketLaunchThin } from "react-icons/pi";
import Spinner from "./svgs/Spinner";
import useRecommendations from "../hooks/useRecommendations";
import { useUser } from "../contexts/UserContext";
import { useQuickReport } from "../contexts/QuickReportContext";

export default function Researcher() {
  const { setPrompt } = usePrompt();
  const { setPrompt: setQuickPrompt } = useQuickReport()
  const router = useRouter();
  const { user } = useUser()
  const { theme, setModal } = useTheme();
  const [isPro, setIsPro] = useState(false);


  const { isLoading, isSuccess, data, handleChange, handleRecommendation, input } = useRecommendations()

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isPro) {
      setPrompt(input);
      router.push(`/researcher/topics`);
    } else {
      if (user && user.queries > 0) {
        setQuickPrompt(input)
        router.push(`/quick-report`);
      } else {
        setModal("limit")
      }
    }
  }


  function handleProToggle() {
    if (user?.plan === "PREMIUM") {

      setIsPro((prev) => !prev);
    } else {
      setModal("plan")
    }
  }

  return (
    <div className="flex  w-full h-full">
      <div className="flex flex-col px-10 items-center h-full pt-[300px] sm:pt-[200px] w-full">
        <h1
          style={{ color: theme.primary.textColor }}
          className="text-3xl font-semibold"
        >
          iResearcher
        </h1>
        <h1 className="text-[#8282AD] mt-5 text-center">
          Take your unbiased research to new level{" "}
        </h1>
        <div className="w-full sm:w-[50%] flex flex-col gap-3">
          <form
            onSubmit={handleSubmit}
            className="mt-5 flex items-center relative w-full"
          >
            <input
              value={input}
              onChange={handleChange}
              placeholder="What's on your mind..."
              className="rounded-xl border-2 shadow-md border-gray-100 bg-white focus:outline-gray-300 p-4 w-full"
            />{" "}
            <div
              onClick={handleProToggle}
              className="absolute cursor-pointer right-12 flex p-1 rounded-3xl w-10 bg-gray-200"
            >
              <div
                style={{
                  transform: isPro ? `translateX(16px)` : `translateX(0px)`,
                  transition: `transform 0.25s`,
                  backgroundColor: isPro ? "#4ade80" : "#9ca3af",
                }}
                className="size-4  rounded-full cursor-pointer"
              ></div>
            </div>
            <button className="text-black absolute right-2 ">
              <PiRocketLaunchThin size={30} />
            </button>
          </form>
          {isLoading ? (
            <div className="w-10">
              <Spinner />
            </div>
          ) : null}
          {isSuccess ? (
            <div className="flex flex-col gap-1 w-full">
              <span className="text-[#535353] ">Here are some suggestions</span>
              <div className="p-0 w-full flex flex-col gap-1">
                {data.map((recommendation: string, i: number) => (
                  <div
                    onClick={() => handleRecommendation(recommendation)}
                    key={i}
                    style={{
                      borderColor: theme.primary.textColor,
                    }}
                    className="flex cursor-pointer p-1 items-center text-gray-500 gap-5 bg-transparent "
                  >
                    <h1 className="bg-gray-100 py-1 px-3 hover:font-semibold rounded-xl">
                      {recommendation}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
