"use client";
import { useTheme } from "../contexts/ThemeContext";
import { BiNetworkChart } from "react-icons/bi";
import { PiGraduationCap, PiRocketLaunchThin } from "react-icons/pi";
import { PiPiggyBank } from "react-icons/pi";
import { PiCodeBold } from "react-icons/pi";
import { RiRobot2Line } from "react-icons/ri";
import { MdAutoGraph } from "react-icons/md";
import Link from "next/link";
import SearchBar from "./ui/SearchBar";
import { useQuickReport } from "../contexts/QuickReportContext";
import { useRouter } from "next/navigation";
import { useUser } from "../contexts/UserContext";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Hero() {
  const agents = [
    {
      title: "iResearcher",
      url: "/researcher",
      description: "Take your unbiased research to new level",
      online: true,
      icon: BiNetworkChart,
    },
    {
      title: "Career Agent",
      url: "/recruitment",
      description: "Unlock your dream job with our  career agent.",
      online: true,
      icon: PiGraduationCap,
    },
    {
      title: "Investment Agent",
      url: "/test",
      description: "Investment opportunities with data-driven insights.",
      online: false,
      icon: PiPiggyBank,
    },
    {
      title: "Coding Agent",
      url: "/scrum",
      description: "Transform your coding experience",
      online: false,
      icon: PiCodeBold,
    },
    {
      title: "Data Analytics Agent",
      url: "/ritual",
      description: "Transform your data into actionable insights",
      online: false,
      icon: MdAutoGraph,
    },
    {
      title: "Document Agent",
      url: "/market",
      description: "Get the most out of your personal documents",
      online: false,
      icon: RiRobot2Line,
    },
  ];
  const { theme, setModal } = useTheme();
  const { user } = useUser();
  const { prompt, setPrompt } = useQuickReport();
  const router = useRouter();


  function handleSubmit() {
    if (user && user.queries > 0) {
      console.log("this ran")
      router.push("/quick-report");
    } else {
      setModal("limit")
      toast.error("you have exhausted your limit");
    }
  }
  return (
    <div
      style={{
        color: theme.primary.textColor,
        backgroundColor: theme.primary.backgroundColor,
      }}
      className="flex flex-col items-center  justify-center  px-10   h-full relative w-full"
    >
      <h1 className="text-[20px]  sm:text-[40px] font-semibold  w-[80%] md:w-[60%] text-center">
        Elevate your thinking,{" "}
        <span className="text-gray-500">Amplify your impact.</span>
      </h1>
      <h1 className="text-[20px] text-[#8282AD] text-center  font-light mt-3">
        The smartest way to search the internet.
      </h1>
      <div className="mt-10 relative w-[50%]">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
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
      <div className="grid grid-cols-3 gap-5 w-[90%]  mt-10">
        {agents.map((agent, i) => {
          const IconComponent = agent.icon;
          return (
            <Link href={agent.url} key={i}>
              <div className=" px-8 flex items-center  shadow-lg rounded-xl h-[130px]">
                <div className="flex  flex-col gap-2 items-start">
                  <div className=" flex gap-2 items-center">
                    <div className="p-3 flex-grow-0 rounded-md ">
                      <IconComponent size={30} />
                    </div>
                    <h1 style={{}} className="text-[18px] font-semibold">
                      {agent.title}
                    </h1>
                  </div>
                  <h1 className="text-sm" style={{}}>
                    {agent.description}
                  </h1>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
