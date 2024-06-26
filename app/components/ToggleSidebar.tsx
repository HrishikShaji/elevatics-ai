"use client";

import { useTheme } from "../contexts/ThemeContext";
import { GiHamShank, GiHamburgerMenu } from "react-icons/gi";

export default function ToggleSidebar() {
  const { setIsSideBarOpen, isSideBarOpen } = useTheme();
  return (
    <button
      style={{ color: isSideBarOpen ? "black" : "" }}
      className="fixed top-4 left-4  z-20 text-gray-500 hover:text-black rounded-md"
      onClick={() => setIsSideBarOpen((prev) => !prev)}
    >
      <GiHamburgerMenu size={35} />
    </button>
  );
}
