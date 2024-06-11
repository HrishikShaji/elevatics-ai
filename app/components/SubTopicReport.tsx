import { useEffect, useState } from "react";
import ReportContainer from "./ReportContainer";
import Spinner from "./svgs/Spinner";

type TopicType = {
	title: string;
	desc: string;
};

interface SubTopicReportProps {
	title: string;
	currentTopic: TopicType[];
	parentIndex: number;
}

const SubTopicReport: React.FC<SubTopicReportProps> = ({
	title,
	currentTopic,
	parentIndex,
}) => {
	const [reportsData, setReportsData] = useState<(any | null)[]>(
		new Array(currentTopic.length).fill(null),
	);
	const [loading, setLoading] = useState<boolean[]>(
		new Array(currentTopic.length).fill(false),
	);

	console.log(reportsData);

	async function fetchSubTopics(
		{
			title,
			desc,
		}: {
			title: string;
			desc: string;
		},
		index: number,
	) {
		setLoading((prev) => {
			const newLoading = [...prev];
			newLoading[index] = true;
			return newLoading;
		});

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
		setReportsData((prev) => {
			const newData = [...prev];
			newData[index] = data;
			return newData;
		});

		setLoading((prev) => {
			const newLoading = [...prev];
			newLoading[index] = false;
			return newLoading;
		});
	}

	useEffect(() => {
		const fetchAllReportsSequentially = async () => {
			for (let i = 0; i < currentTopic.length; i++) {
				await fetchSubTopics(
					{ title: currentTopic[i].title, desc: currentTopic[i].desc },
					i,
				);
			}
		};

		fetchAllReportsSequentially();
	}, [currentTopic]);

	return (
		<div className="relative w-full h-[600px] overflow-y-scroll custom-scrollbar">
			{reportsData.map((report, i) => (
				<ReportContainer key={i}>
					{loading[i] ? (
						<div className="w-10"><Spinner /></div>
					) : (
						report && (
							<div
								dangerouslySetInnerHTML={{ __html: report.report }}
								className="flex flex-col gap-5"
							></div>
						)
					)}
				</ReportContainer>
			))}
		</div>
	);
};

export default SubTopicReport;
