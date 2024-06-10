"use client";

import { useTheme } from "../contexts/ThemeContext";

const Sidebar = () => {
  const { isSideBarOpen, setModal } = useTheme();
  if (!isSideBarOpen) return null;
  return (
    <div className="h-full w-[200px] bg-gray-400 ">
      <div className="mt-20 flex flex-col">
        <button className="p-2 bg-blue-500" onClick={() => setModal("signIn")}>
          sign in
        </button>
        <button
          className="p-2 bg-blue-500"
          onClick={() => setModal("settings")}
        >
          settings
        </button>
        <button className="p-2 bg-blue-500" onClick={() => setModal("library")}>
          library
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
