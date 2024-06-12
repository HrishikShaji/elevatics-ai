"use client";

import { useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import SubTopicReport from "./SubTopicReport";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const FinalReport = () => {
	const { finalTopics } = usePrompt();
	const data = Object.entries(finalTopics);
	const [currentIndex, setCurrentIndex] = useState(0);
	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
	};

	const handlePageChange = (page: number) => {
		setCurrentIndex(page);
	};

	return (
		<div className="h-screen w-full  flex flex-col justify-end relative items-center">
			<div className="flex flex-col   h-[700px] items-center  w-full">
				<div className="flex gap-10 h-[40px]  w-[95%] items-center justify-between">
					<button
						onClick={prevSlide}
						className="flex-shrink-0 size-8 flex items-center justify-center bg-gray-300 rounded-full"
					>
						<IoIosArrowBack />
					</button>
					<div className="flex gap-1 w-full h-[8px]">
						{data.map((item, i) => (
							<div
								key={i}
								onClick={() => handlePageChange(i)}
								className="w-full cursor-pointer h-full relative group"
								style={{
									backgroundColor: currentIndex >= i ? "#22c55e" : "#d4d4d4",
									borderBottomRightRadius:
										i === data.length - 1 ? "24px" : "0px",
									borderTopRightRadius: i === data.length - 1 ? "24px" : "0px",
								}}
							>
								<div className="absolute group-hover:block hidden -top-14 p-2 rounded-xl bg-green-500 text-white">
									{data[i][0]}
								</div>
							</div>
						))}
					</div>
					<button
						onClick={nextSlide}
						className="flex-shrink-0 size-8 flex items-center justify-center bg-gray-300 rounded-full"
					>
						<IoIosArrowForward />
					</button>
				</div>
				{data.length > 0 ? (
					<SubTopicReport
						parentIndex={currentIndex}
						currentTopic={data[currentIndex][1]}
						title={data[currentIndex][0]}
					/>
				) : null}
			</div>
		</div>
	);
};

export default FinalReport;
