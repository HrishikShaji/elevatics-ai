import { ReactNode } from "react";

export default function Heading({ children }: { children: ReactNode }) {
	return (
		<h1
			style={{ fontFamily: "SF Pro" }}
			className="text-[15px]  sm:text-[30px]  w-[80%] md:w-[60%] text-center"
		>
			{children}
		</h1>
	);
};
