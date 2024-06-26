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
        className="hover:bg-gray-100 rounded-md p-2 absolute top-2 right-2"
        href="/demo"
      >
        Demo
      </Link>
      <h1 style={{ fontSize: isSideBarOpen ? "30px" : "40px" }} className=" font-semibold  w-[80%] md:w-[60%] text-center">
        Elevate your thinking,{" "}
        <span className="text-gray-500">Amplify your impact.</span>
      </h1>
      <h1 className="text-xl text-[#8282AD] text-center  font-light mt-3">
        The smartest way to search the internet.
      </h1>
      <QuickSearch />
    </div>
  );
}
