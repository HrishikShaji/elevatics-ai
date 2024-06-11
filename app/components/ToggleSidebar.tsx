"use client";

import { useTheme } from "../contexts/ThemeContext";
import { GiHamShank, GiHamburgerMenu } from "react-icons/gi";

const ToggleSidebar = () => {
  const { setIsSideBarOpen, isSideBarOpen } = useTheme();
  return (
    <button
      className="fixed top-2 left-2 p-2 z-20 rounded-md"
      onClick={() => setIsSideBarOpen((prev) => !prev)}>
      <GiHamburgerMenu />
    </button>
  );
};

export default ToggleSidebar;
