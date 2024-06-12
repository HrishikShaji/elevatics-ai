import { useEffect } from "react";
import ReportContainer from "./ReportContainer";
import Spinner from "./svgs/Spinner";
import { useReports } from "../contexts/ReportsContext";
import Link from "next/link";
import { hostname } from "os";
import { RxArrowTopRight } from "react-icons/rx";

type TopicType = {
	title: string;
	desc: string;
};

interface SubTopicReportProps {
	title: string;
	currentTopic: TopicType[];
	parentIndex: number;
}

export default function SubTopicReport({
	title,
	currentTopic,
	parentIndex,
}: SubTopicReportProps) {
	const {
		reportsData,
		setReportsData,
		loading,
		setLoading,
		contentRef,
		generatePDF,
	} = useReports();
	console.log(currentTopic);
	const fetchSubTopics = async (
		{ title, desc }: { title: string; desc: string },
		index: number,
	) => {
		setLoading((prev) => ({
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
		setReportsData((prev) => ({
			...prev,
			[parentIndex]: { ...prev[parentIndex], [index]: data },
		}));

		setLoading((prev) => ({
			...prev,
			[parentIndex]: { ...prev[parentIndex], [index]: false },
		}));
	};

	function getHostname(url: string) {
		const parsedUrl = new URL(url);
		console.log(parsedUrl.hostname);
		const name = parsedUrl.hostname;
		return (
			<span className="flex items-center gap-3 hover:text-blue-500">
				{name} <RxArrowTopRight />
			</span>
		);
	}

	useEffect(() => {
		const fetchAllReportsSequentially = async () => {
			if (!reportsData[parentIndex]) {
				for (let i = 0; i < currentTopic.length; i++) {
					await fetchSubTopics(
						{ title: currentTopic[i].title, desc: currentTopic[i].desc },
						i,
					);
				}
			}
		};

		fetchAllReportsSequentially();
	}, [currentTopic, parentIndex, reportsData]);
	console.log(reportsData);

	return (
		<div
			className="relative px-28 w-full h-[660px] flex flex-col  overflow-y-scroll custom-scrollbar"
			ref={contentRef}
		>
			<button
				className="absolute top-2 right-2 bg-black text-white"
				onClick={generatePDF}
			>
				Download
			</button>
			<div ref={contentRef} className="flex flex-col w-full h-full">
				{currentTopic.map((_, i) => (
					<ReportContainer key={i}>
						{loading[parentIndex]?.[i] ? (
							<div className="w-10">
								<Spinner />
							</div>
						) : (
							reportsData[parentIndex]?.[i] && (
								<div className="py-10 ">
									<div
										dangerouslySetInnerHTML={{
											__html: reportsData[parentIndex][i].report,
										}}
										className="flex flex-col gap-5 "
									></div>
									<div className="flex flex-col gap-2 mt-10">
										{Object.keys(reportsData[parentIndex][i].references).map(
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
				))}
			</div>
		</div>
	);
}
