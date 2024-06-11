"use client";

import { useSession } from "next-auth/react";
import { useTheme } from "../contexts/ThemeContext";

const HomeContainer = () => {
	const { status, data } = useSession()
	console.log(status)
	const { theme } = useTheme();
	return (
		<div
			style={{ backgroundColor: theme.primary.backgroundColor }}
			className="h-full w-full flex items-center p-10 justify-center"
		>
			<h1 style={{ color: theme.primary.textColor }}>Home</h1>
		</div>
	);
};

export default HomeContainer;
