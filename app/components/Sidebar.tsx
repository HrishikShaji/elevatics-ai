"use client";

import { useTheme } from "../contexts/ThemeContext";

const Sidebar = () => {
  const { isSideBarOpen } = useTheme();
  if (!isSideBarOpen) return null;
  return <div className="h-full w-[200px] bg-gray-400"></div>;
};

export default Sidebar;
