"use client";
import { useTheme } from "../contexts/ThemeContext";
import { agents } from "../lib/agentsData";
import { Heading } from "./ui/Typography";
import { BackGround } from "./BackGround";
import { SearchBar } from "./ui/SearchBar";

export const Hero = () => {
	const { getTheme } = useTheme();
	return (
		<>
			<div
				style={{
					color: getTheme().primary.textColor,
				}}
				className="flex flex-col items-center bg-gray-100 justify-center  px-10 py-[150px] md:p-10 overflow-hidden min-h-screen relative w-full"
			>
				<Heading>
					Elevate your thinking,{" "}
					<span className="text-gray-500">Amplify your impact.</span>
				</Heading>
				<h1 className="text-[20px] text-[#8282AD] text-center  font-light mt-3">
					The smartest way to search the internet.
				</h1>
				<SearchBar />
				<div className="grid grid-cols-3 gap-5 w-[90%]  mt-10">
					{agents.map((agent, i) => {
						const IconComponent = agent.icon;
						return (
							<div key={i}>
								<div
									style={{
										backgroundColor: getTheme().primary.backgroundColor,
									}}
									className=" p-8  shadow-lg rounded-xl h-[150px]"
								>
									<div className="flex  flex-col gap-2 items-start">
										<div className=" flex gap-2 items-center">
											<div className="p-3 flex-grow-0 rounded-md bg-gray-100">
												<IconComponent size={30} />
											</div>
											<h1
												style={{
													color: agent.online
														? getTheme().selectedTitle.color
														: getTheme().unSelectedTitle.color,
												}}
												className="text-xl font-semibold"
											>
												{agent.title}
											</h1>
										</div>
										<h1
											className="text-sm"
											style={{
												color: agent.online
													? getTheme().selectedSubTitle.color
													: getTheme().unSelectedSubTitle.color,
											}}
										>
											{agent.description}
										</h1>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};
