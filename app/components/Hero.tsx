"use client";
import { useTheme } from "../contexts/ThemeContext";
import { PiGraduationCap, PiRocketLaunchThin } from "react-icons/pi";
import { PiPiggyBank } from "react-icons/pi";
import { PiCodeBold } from "react-icons/pi";
import { RiRobot2Line } from "react-icons/ri";
import { MdAutoGraph } from "react-icons/md";
import Link from "next/link";
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
      title: "Investment Agent",
      url: "/investment",
      description: "Investment opportunities with data-driven insights.",
      online: false,
      icon: PiPiggyBank,
    },
    {
      title: "Career Agent",
      url: "/new-researcher",
      description: "Unlock your dream job with our  career agent.",
      online: true,
      icon: PiGraduationCap,
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
      className="flex flex-col items-center    justify-end  p-10   h-full relative w-full"
    >
      <div className="absolute flex flex-col items-center justify-center top-[200px] sm:top-[100px] w-full">

        <div className="flex flex-col items-start justify-start">
          <h1
            className={`whitespace-nowrap font-semibold  text-center bg-clip-text text-transparent bg-gradient-to-r md:py-2 from-black to-gray-400
    ${isSideBarOpen
                ? 'text-3xl md:text-3xl lg:text-4xl'
                : 'text-3xl md:text-4xl lg:text-5xl'}
  `}
          >
            Elevate your thinking,{" "}
          </h1>
          <h1
            className={`font-semibold whitespace-nowrap  text-center bg-clip-text text-transparent bg-gradient-to-l md:py-2 from-black to-gray-400
    ${isSideBarOpen
                ? 'text-3xl md:text-3xl lg:text-4xl'
                : 'text-3xl md:text-4xl lg:text-5xl'}
  `}
          >
            Amplify your impact.
          </h1>
        </div>
        <h1 className="text-xl text-[#8282AD] text-center  font-light mt-3">
          The smartest way to search the internet.
        </h1>
        <div className="sm:w-[50%] w-[90%]  mt-10">

          <QuickSearch />
        </div>
      </div>
      <div className="grid grid-cols-1 pt-[500px] sm:grid-cols-3 gap-5 w-full sm:w-[90%]  ">
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
