"use client";

import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";
import QuickSearch from "./QuickSearch";

export default function HomeContainer() {
  const { theme, isSideBarOpen } = useTheme();
  return (
    <div
      style={{
        color: theme.primary.textColor,
        backgroundColor: theme.primary.backgroundColor,
      }}
      className="relative flex flex-col items-center  justify-center  px-10   h-full  w-full"
    >
      <Link
        className="p-2 text-xl rounded-md bg-white text-gray-500 hover:text-black fixed z-40 top-2 right-4"
        href="/demo"
      >
        Demo
      </Link>
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
      <QuickSearch />
    </div>
  );
}
