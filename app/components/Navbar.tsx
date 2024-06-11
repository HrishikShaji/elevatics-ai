"use client";

import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
	const { themeName, toggleTheme, setModal } = useTheme();
	return (
		<div className="w-full h-[70px] bg-white flex-shrink-0 flex justify-between items-center">
			<div></div>
			<button
				className="p-2 pl-4 hover:bg-gray-200 text-left"
				onClick={() => setModal("signIn")}
			>
				sign in
			</button>
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
};

export default Navbar;
