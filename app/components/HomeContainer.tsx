"use client";

import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";
import SearchBar from "./ui/SearchBar";
import CheckBox from "./ui/CheckBox";

export default function HomeContainer() {
  const { theme } = useTheme();

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
      <CheckBox />
      <h1 className="text-[20px]  sm:text-[40px] font-semibold  w-[80%] md:w-[60%] text-center">
        Elevate your thinking,{" "}
        <span className="text-gray-500">Amplify your impact.</span>
      </h1>
      <h1 className="text-[20px] text-[#8282AD] text-center  font-light mt-3">
        The smartest way to search the internet.
      </h1>
      <SearchBar />
    </div>
  );
}
