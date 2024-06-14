"use client";

import { useRef, useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import SubTopicReport from "./SubTopicReport";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useReports } from "../contexts/ReportsContext";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import { formatPDF } from "../lib/formatPDF";
import { formatMultiplePDF } from "../lib/formatMultiplePDF";
import { styledHtml } from "../lib/sample";

export default function FinalReport() {
	const { finalTopics, reportLoading, reportData, reportContainerRef } =
		usePrompt();
	const data = Object.entries(finalTopics);
	const [currentIndex, setCurrentIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isDownload, setIsDownload] = useState(false);
	const htmlStrings = [
		"<div>Your HTML content 1</div>",
		"<div>Your HTML content 2</div>",
		"<div>Your HTML content 3</div>",
	];

	const scrollLeft = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({
				left: -300,
				behavior: "smooth",
			});
		}
	};

	const scrollRight = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({
				left: 300,
				behavior: "smooth",
			});
		}
	};

	const handlePageChange = (page: number) => {
		setCurrentIndex(page);
	};

	function handleDownload() {
		console.log(reportData);
	}

	function handleLoading() {
		console.log(reportLoading);
	}

	const options = {
		method: "open",
		resolution: Resolution.HIGH,
		page: {
			margin: Margin.SMALL,
			format: "letter",
			orientation: "landscape",
		},
		canvas: {
			mimeType: "image/png",
			qualityRatio: 1,
		},
	};

	async function pdfGenerate() {
		const topics = Object.values(reportData).map((item) => item);
		const topicsData = Object.values(topics[0]).map((item) => item.report);
		const finalHtmlArray = topicsData.map((html) => styledHtml(html)); // Style each HTML element separately

		console.log(finalHtmlArray);
		const response = await fetch("/api/pdf", {
			method: "POST",
			body: JSON.stringify({ htmlArray: finalHtmlArray }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "generated.pdf";
			document.body.appendChild(a);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(url);
		} else {
			console.error("Failed to generate PDF");
		}
	}

	const getTargetElement = () => document.getElementById("report");

	return (
		<div className="h-screen w-full  flex flex-col justify-end relative items-center">
			<div className="flex gap-2 absolute top-3 right-20">
				<button
					className="text-sm bg-black text-white rounded-md py-2 w-[100px]"
					onClick={pdfGenerate}
				>
					Download One
				</button>
				<button
					className="text-sm bg-black text-white rounded-md py-2 w-[100px]"
					onClick={() => formatMultiplePDF(htmlStrings)}
				>
					Download PDFs
				</button>
				<div className="relative">
					<button
						className="text-sm bg-black text-white rounded-md py-2 w-[100px]"
						onClick={() => setIsDownload((prev) => !prev)}
					>
						Download All
					</button>
					{isDownload ? (
						<div className="absolute  top-14 z-20 p-2 flex flex-col gap-2 bg-blue-500 rounded-md">
							<h1 className="whitespace-nowrap">Select Reports</h1>
							<div className="flex flex-col gap-1">
								{Object.keys(reportData).map((key, i) => (
									<h1 key={key} className="whitespace-nowrap">
										{key}
									</h1>
								))}
							</div>
						</div>
					) : null}
				</div>
				<button
					className="text-sm bg-black text-white rounded-md py-2 w-[100px]"
					onClick={handleLoading}
				>
					See Loading
				</button>
				<button
					className="text-sm bg-black text-white rounded-md py-2 w-[100px]"
					onClick={handleDownload}
				>
					See Data
				</button>
				<button
					className="text-sm bg-black text-white rounded-md py-2 w-[100px]"
					onClick={() => formatPDF(reportContainerRef)}
				>
					Download
				</button>
				<button className="text-sm  bg-black text-white rounded-md py-2 w-[100px]">
					Share
				</button>
			</div>
			<div className="flex flex-col   h-[700px] justify-between items-center  w-full">
				<div className="relative flex items-center px-28 w-full">
					<button
						onClick={scrollLeft}
						className="absolute size-6 flex items-center justify-center left-20 hover:bg-gray-200 rounded-full"
					>
						{"<"}
					</button>
					<div
						className="flex gap-1   overflow-x-hidden border-[1px] rounded-md border-gray-300 h-[50px]"
						ref={containerRef}
					>
						{data.map((item, i) => (
							<div
								key={i}
								onClick={() => handlePageChange(i)}
								className="w-full cursor-pointer h-full flex items-center border-b-4 relative group"
								style={{
									backgroundColor: currentIndex === i ? "#EDF0FF" : "white",
									borderColor: currentIndex === i ? "#2A42CB" : "white",
								}}
							>
								<div
									className="px-10 text-center whitespace-nowrap"
									style={{ color: currentIndex === i ? "#2A42CB" : "#7F7F7F" }}
								>
									{data[i][0]}
								</div>
							</div>
						))}
					</div>
					<button
						onClick={scrollRight}
						className="absolute size-6 flex items-center justify-center right-20 hover:bg-gray-200 rounded-full"
					>
						{">"}
					</button>
				</div>
				{data.length > 0 ? (
					<SubTopicReport
						parentIndex={data[currentIndex][0]}
						currentTopic={data[currentIndex][1]}
						title={data[currentIndex][0]}
					/>
				) : null}
			</div>
		</div>
	);
}
