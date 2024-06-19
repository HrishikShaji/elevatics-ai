"use client";
import { AiOutlineDownload } from "react-icons/ai";
import { IoMdShare } from "react-icons/io";
import { useRef, useState, useEffect, FormEvent } from "react";
import { usePrompt } from "../contexts/PromptContext";
import NewSubTopicReport from "./NewSubTopicReport";
import { IoIosCloseCircle } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa6";
import { RiFileExcel2Fill } from "react-icons/ri";
import { TbFileTypeDocx } from "react-icons/tb";
import ShareEmail from "./ShareEmail";
import Spinner from "./svgs/Spinner";
import fetchReport from "../lib/fetchReport";
import sendEmail from "../lib/sendEmail";
import downloadPdf from "../lib/downloadPdf";
import { extractReports, scrollLeft, scrollRight } from "../lib/utils";

export default function NewFinalReport() {
	const {
		finalTopics,
		reportLoading,
		reportData,
		reportContainerRef,
		setReportData,
		prompt,
		setReportLoading,
	} = usePrompt();
	const data = Object.entries(finalTopics);
	const [currentIndex, setCurrentIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isDownload, setIsDownload] = useState(false);
	const [isShare, setIsShare] = useState(false);
	const [email, setEmail] = useState("");
	const [sending, setSending] = useState(false);
	const [downloading, setDownloading] = useState(false);
	const [excelDownloading, setExcelDownloading] = useState(false);
	const [selectedReports, setSelectedReports] = useState<
		Record<string, boolean>
	>({});

	const handleReportSelection = (report: string) => {
		setSelectedReports((prev) => ({
			...prev,
			[report]: !prev[report],
		}));
	};

	const handlePageChange = (page: number) => {
		setCurrentIndex(page);
	};

	async function handleDownload() {
		try {
			setDownloading(true);
			const selectedTopics = Object.entries(selectedReports).filter(
				([key, value]) => value === true,
			);
			const topics = selectedTopics.map(([key]) => key);
			const reportsToDownload = Object.keys(reportData)
				.filter((key) => topics.includes(key))
				.reduce(
					(obj, key) => {
						obj[key] = reportData[key];
						return obj;
					},
					{} as Record<string, any>,
				);

			const htmlArray = extractReports(reportsToDownload);
			await downloadPdf({ htmlArray: htmlArray, prompt: prompt });
		} catch (error) {
			console.log(error);
		} finally {
			setDownloading(false);
		}
	}

	async function handleEmail(e: FormEvent) {
		e.preventDefault();
		const selectedTopics = Object.entries(selectedReports).filter(
			([key, value]) => value === true,
		);
		const topics = selectedTopics.map(([key]) => key);
		const reportsToDownload = Object.keys(reportData)
			.filter((key) => topics.includes(key))
			.reduce(
				(obj, key) => {
					obj[key] = reportData[key];
					return obj;
				},
				{} as Record<string, any>,
			);

		const htmlArray = extractReports(reportsToDownload);
		try {
			setSending(true);
			await sendEmail({ htmlArray: htmlArray, email: email, prompt: prompt });
		} catch (error) {
			console.log(error);
		} finally {
			setSending(false);
		}
	}

	async function fetchSubTopics(
		{ title, desc }: { title: string; desc: string },
		parentIndex: string,
		index: string,
	) {
		setReportLoading((prev) => ({
			...prev,
			[parentIndex]: { ...prev[parentIndex], [index]: true },
		}));

		const data = await fetchReport({ title: title, desc: desc });
		setReportData((prev) => ({
			...prev,
			[parentIndex]: { ...prev[parentIndex], [index]: data },
		}));
		setReportLoading((prev) => ({
			...prev,
			[parentIndex]: { ...prev[parentIndex], [index]: false },
		}));
	}

	useEffect(() => {
		const fetchAllReportsSequentially = async () => {
			for (const [parentIndex, topics] of Object.entries(finalTopics)) {
				if (!reportData[parentIndex]) {
					for (const subtopic of topics) {
						await fetchSubTopics(subtopic, parentIndex, subtopic.title);
					}
				}
			}
		};

		fetchAllReportsSequentially();
	}, [finalTopics]);

	return (
		<div className="h-screen w-full  flex flex-col justify-end relative items-center">
			<div className="flex gap-2 absolute top-3 right-20">
				<div className="relative">
					<button
						className="text-sm bg-[#EDF0FF] flex text-[#2A42CB] gap-2 rounded-md p-2 items-center justify-center w-[120px]"
						onClick={() => setIsDownload((prev) => !prev)}
					>
						<AiOutlineDownload size={25} /> Download
					</button>
					{isDownload ? (
						<div className="fixed z-50 top-0 left-0 h-screen w-full bg-black/70 flex items-center justify-center">
							<div className="relative  p-2 flex flex-col gap-2 bg-white rounded-3xl">
								<button
									onClick={() => setIsDownload(false)}
									className="absolute top-2 right-2"
								>
									<IoIosCloseCircle size={25} />
								</button>
								<div className="flex flex-col gap-5 p-5 items-center justify-center">
									<h1 className="whitespace-nowrap border-b-[1px] border-gray-300 w-full pb-2 text-center font-semibold text-xl">
										Select Reports
									</h1>
									<div className="flex flex-col gap-1 p-5">
										{Object.keys(reportData).map((key, i) => (
											<label key={key} className=" whitespace-nowrap">
												<input
													className="mr-3"
													type="checkbox"
													checked={selectedReports[key] || false}
													onChange={() => handleReportSelection(key)}
												/>
												{key}
											</label>
										))}
									</div>
									<div className="flex justify-center gap-5">
										<button
											className="bg-black text-white p-3 rounded-full"
											onClick={handleDownload}
										>
											{downloading ? (
												<div className="w-10">
													<Spinner />
												</div>
											) : (
												<FaFilePdf />
											)}
										</button>
										<button className="bg-black text-white p-3 rounded-full">
											{excelDownloading ? (
												<div className="w-10">
													<Spinner />
												</div>
											) : (
												<RiFileExcel2Fill />
											)}
										</button>
										<button
											className="bg-black text-white p-3 rounded-full"
											onClick={handleDownload}
										>
											<TbFileTypeDocx />
										</button>
									</div>
								</div>
							</div>
						</div>
					) : null}
				</div>
				<button
					onClick={() => setIsShare(true)}
					className="text-sm gap-2  text-gray-500 border-2 border-gray-500 rounded-md p-2 flex items-center justify-center w-[120px]"
				>
					<IoMdShare /> Share
				</button>
				{isShare ? (
					<ShareEmail
						setIsShare={setIsShare}
						loading={sending}
						email={email}
						setEmail={setEmail}
						handleEmail={handleEmail}
					/>
				) : null}
			</div>
			<div className="flex flex-col   h-[700px] justify-between items-center  w-full">
				<div className="relative flex items-center px-28 w-full">
					<button
						onClick={() => scrollLeft(containerRef)}
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
						onClick={() => scrollRight(containerRef)}
						className="absolute size-6 flex items-center justify-center right-20 hover:bg-gray-200 rounded-full"
					>
						{">"}
					</button>
				</div>
				{data.length > 0 ? (
					<NewSubTopicReport
						parentIndex={data[currentIndex][0]}
						currentTopic={data[currentIndex][1]}
						title={data[currentIndex][0]}
					/>
				) : null}
			</div>
		</div>
	);
}
