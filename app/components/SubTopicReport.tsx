import { useEffect } from "react";
import ReportContainer from "./ReportContainer";
import Spinner from "./svgs/Spinner";
import Link from "next/link";
import { RxArrowTopRight } from "react-icons/rx";
import { usePrompt } from "../contexts/PromptContext";

type TopicType = {
	title: string;
	desc: string;
};

interface SubTopicReportProps {
	title: string;
	currentTopic: TopicType[];
	parentIndex: string;
}

export default function SubTopicReport({
	title,
	currentTopic,
	parentIndex,
}: SubTopicReportProps) {
	const {
		reportContainerRef,
		reportData,
		reportLoading,
		setReportData,
		setReportLoading,
	} = usePrompt();
	const fetchSubTopics = async (
		{ title, desc }: { title: string; desc: string },
		index: string,
	) => {
		setReportLoading((prev) => ({
			...prev,
			[parentIndex]: { ...prev[parentIndex], [index]: true },
		}));
		const token = process.env.NEXT_PUBLIC_HFSPACE_TOKEN || "";
		const headers = {
			Authorization: token,
			"Content-Type": "application/json",
		};
		const response = await fetch(
			"https://pvanand-search-generate.hf.space/generate_report",
			{
				method: "POST",
				headers: headers,
				body: JSON.stringify({
					query: title,
					description: desc,
					user_id: "",
					user_name: "",
					internet: true,
					output_format: "Tabular Report",
					data_format: "Structured data",
				}),
			},
		);

		if (!response.ok) {
			throw new Error("Error fetching topics");
		}

		const data = await response.json();
		setReportData((prev) => ({
			...prev,
			[parentIndex]: { ...prev[parentIndex], [index]: data },
		}));
		setReportLoading((prev) => ({
			...prev,
			[parentIndex]: { ...prev[parentIndex], [index]: false },
		}));
	};

	function getHostname(url: string) {
		const parsedUrl = new URL(url);
		const name = parsedUrl.hostname;
		return (
			<span className="flex items-center gap-3 hover:text-blue-500">
				{name} <RxArrowTopRight />
			</span>
		);
	}

	useEffect(() => {
		const fetchAllReportsSequentially = async () => {
			if (!reportData[parentIndex]) {
				for (let i = 0; i < currentTopic.length; i++) {
					await fetchSubTopics(
						{ title: currentTopic[i].title, desc: currentTopic[i].desc },
						currentTopic[i].title,
					);
				}
			}
		};

		fetchAllReportsSequentially();
	}, [currentTopic, parentIndex, reportData]);

	return (
		<div
			className="relative px-28 w-full h-[630px] flex flex-col  overflow-y-scroll custom-scrollbar"
			ref={reportContainerRef}
		>
			<div className="flex flex-col w-full h-full">
				{currentTopic.map((item, i) => {
					return (
						<ReportContainer key={i}>
							{reportLoading[parentIndex]?.[item.title] ? (
								<div className="w-10">
									<Spinner />
								</div>
							) : (
								reportData[parentIndex]?.[item.title] && (
									<div className="py-10 ">
										<div
											dangerouslySetInnerHTML={{
												__html: reportData[parentIndex][item.title].report,
											}}
										></div>
										<div className="flex flex-col gap-2 mt-10">
											{Object.keys(reportData[parentIndex][item.title].references).map(
												(key, i) => (
													<Link href={key} key={i}>
														{getHostname(key)}
													</Link>
												),
											)}
										</div>
									</div>
								)
							)}
						</ReportContainer>
					);
				})}
			</div>
		</div>
	);
}
