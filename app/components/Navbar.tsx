"use client";

import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const { themeName, toggleTheme, setModal } = useTheme();
  return (
    <div className="w-full h-[70px] fixed top-0 bg-transparent flex-shrink-0 flex justify-between items-center">
      <div></div>
      {/**
       * 
       * {themeName === "dark" ? (
        <button
          className="p-2 rounded-md bg-black text-white"
          onClick={() => toggleTheme("light")}
        >
          Light
        </button>
      ) : (
        <button
          className="p-2 rounded-md bg-black text-white"
          onClick={() => toggleTheme("dark")}
        >
          Dark
        </button>
      )}
       */}
    </div>
  );
}
