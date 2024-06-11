"use client";

import { useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import SubTopicReport from "./SubTopicReport";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const FinalReport = () => {
	const { prompt, finalTopics } = usePrompt();

	const data = Object.entries(finalTopics);
	const [currentPage, setCurrentPage] = useState(1);
	const topicsPerPage = 5;
	const totalPages = Math.ceil(data.length / topicsPerPage);
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
		<div className="h-full w-full gap-5 flex flex-col justify-center relative items-center">
			<div className="flex  gap-10 mt-4 w-[90%] items-center justify-between">
				<button
					onClick={prevSlide}
					className="flex-shrink-0 size-8 flex items-center justify-center bg-gray-300 rounded-full"
				>
					<IoIosArrowBack />
				</button>
				<div className=" flex gap-1 w-full h-[8px]">
					{data.map((item, i) => (
						<div
							onClick={() => handlePageChange(i)}
							className="w-full cursor-pointer h-full relative group"
							style={{
								backgroundColor: currentIndex >= i ? "green" : "gray",
								borderBottomRightRadius: i === data.length - 1 ? "24px" : "0px",
								borderTopRightRadius: i === data.length - 1 ? "24px" : "0px",
							}}
						>
							<div className="absolute  group-hover:block hidden -top-14 p-2 rounded-md bg-gray-300">
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
			<div className="flex gap-2 h-[90%] w-[90%]">
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
