"use client";

import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import { GiHamShank, GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

export default function ToggleSidebar() {
  const { setIsSideBarOpen, isSideBarOpen } = useTheme();
  return (
    <div className="fixed top-4 left-4 z-20 flex gap-5">
      <button
        style={{ color: isSideBarOpen ? "black" : "" }}
        className=" text-gray-500 hover:text-black rounded-md"
        onClick={() => setIsSideBarOpen((prev) => !prev)}
      >
        <GiHamburgerMenu size={35} />
      </button>
      <Link href="/">
        <Image height={274} width={762} src="/assets/ElevaticsAILogo.png" className="w-[130px] h-full" alt="logo" />
      </Link>
    </div>
  );
}
