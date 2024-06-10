"use client";

import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const { themeName, toggleTheme } = useTheme();
  return (
    <div className="w-full h-[70px] bg-gray-500 flex justify-between items-center">
      <div></div>
      {themeName === "dark" ? (
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
    </div>
  );
};

export default Navbar;
