"use client";

import { useTheme } from "../contexts/ThemeContext";

const ToggleSidebar = () => {
	const { setIsSideBarOpen, isSideBarOpen } = useTheme();
	return (
		<button
			className="fixed top-2 left-2 p-2 z-20 rounded-md bg-black text-white"
			onClick={() => setIsSideBarOpen((prev) => !prev)}
		>
			{isSideBarOpen ? "close" : "open"}
		</button>
	);
};

export default ToggleSidebar;
