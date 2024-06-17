import Link from "next/link";
import { RxArrowTopRight } from "react-icons/rx";
import { usePrompt } from "../contexts/PromptContext";
import ReportContainer from "./ReportContainer";
import Spinner from "./svgs/Spinner";

type TopicType = {
	title: string;
	desc: string;
};

interface SubTopicReportProps {
	title: string;
	currentTopic: TopicType[];
	parentIndex: string;
}

export default function NewSubTopicReport({
	title,
	currentTopic,
	parentIndex,
}: SubTopicReportProps) {
	const { reportContainerRef, reportData, reportLoading } = usePrompt();
	const hasFetchStarted = Object.keys(reportLoading).find(
		(key) => key === parentIndex,
	);
	function getHostname(url: string) {
		const parsedUrl = new URL(url);
		const name = parsedUrl.hostname;
		return (
			<span className="flex items-center gap-3 hover:text-blue-500">
				{name} <RxArrowTopRight />
			</span>
		);
	}

	return (
		<div
			className="relative px-28 w-full h-[630px] flex flex-col  overflow-y-scroll custom-scrollbar"
			ref={reportContainerRef}
		>
			<div className="flex flex-col w-full h-full">
				{currentTopic.map((item, i) => (
					<ReportContainer key={i}>
						{!hasFetchStarted ? (
							<div className="w-10">
								<Spinner />
							</div>
						) : null}
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
										{Object.keys(
											reportData[parentIndex][item.title].references,
										).map((key, i) => (
											<Link href={key} key={i}>
												{key}
											</Link>
										))}
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
