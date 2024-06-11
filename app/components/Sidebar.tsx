"use client";

import { useTheme } from "../contexts/ThemeContext";

const Sidebar = () => {
  const { isSideBarOpen, setModal } = useTheme();
  if (!isSideBarOpen) return null;
  return (
    <div className="h-full w-[250px] bg-gray-100 ">
      <div className="mt-20 flex flex-col">
        <button
          className="p-2 pl-4 hover:bg-gray-200 text-left"
          onClick={() => setModal("signIn")}>
          sign in
        </button>
        <button
          className="p-2 pl-4 text-left hover:bg-gray-200"
          onClick={() => setModal("settings")}>
          settings
        </button>
        <button
          className="p-2 pl-4 text-left hover:bg-gray-200"
          onClick={() => setModal("library")}>
          library
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
