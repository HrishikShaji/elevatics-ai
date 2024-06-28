"use client";

import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";
import QuickSearch from "./QuickSearch";
import { ParticlesContainer } from "./ui/ParticlesContainer";

export default function HomeContainer() {
  const { theme, isSideBarOpen } = useTheme();
  return (
    <div
      style={{
        color: theme.primary.textColor,
      }}
      className="relative flex flex-col items-center  pt-[100px]    px-10   h-full  w-full"
    >
      <div className="left-0 right-0 h-full w-full absolute -z-10">
        <ParticlesContainer />
      </div>
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
    </div>
  );
}
