"use client";
import { useTheme } from "../contexts/ThemeContext";
import { BiNetworkChart } from "react-icons/bi";
import { PiGraduationCap, PiRocketLaunchThin } from "react-icons/pi";
import { PiPiggyBank } from "react-icons/pi";
import { PiCodeBold } from "react-icons/pi";
import { RiRobot2Line } from "react-icons/ri";
import { MdAutoGraph } from "react-icons/md";
import Link from "next/link";
import { IoDocument, IoDocuments } from "react-icons/io5";
import { useQuickReport } from "../contexts/QuickReportContext";
import { useRouter } from "next/navigation";
import { useUser } from "../contexts/UserContext";
import QuickSearch from "./QuickSearch";
import { IoDocumentsOutline } from "react-icons/io5";


export default function Hero() {
  const agents = [
    {
      title: "iResearcher",
      url: "/researcher",
      description: "Take your unbiased research to new level",
      online: true,
      icon: IoDocumentsOutline,
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
  const { theme, isSideBarOpen } = useTheme();


  return (
    <div
      style={{
        color: theme.primary.textColor,
        backgroundColor: theme.primary.backgroundColor,
      }}
      className="flex flex-col items-center  justify-center  px-10   h-full relative w-full"
    >
      <h1 style={{ fontSize: isSideBarOpen ? "30px" : "40px" }} className=" font-semibold  w-[80%] md:w-[60%] text-center">
        Elevate your thinking,{" "}
        <span className="text-gray-500">Amplify your impact.</span>
      </h1>
      <QuickSearch />
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
