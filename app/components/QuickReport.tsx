"use client";

import { useEffect, useState } from "react";
import { useQuickReport } from "../contexts/QuickReportContext";
import Spinner from "./svgs/Spinner";
import ReportContainer from "./ReportContainer";

export default function QuickReport() {
	const { prompt } = useQuickReport();
	const [loading, setLoading] = useState(false);
	const [report, setReport] = useState(null);

	useEffect(() => {
		async function fetchSubTopics() {
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
						query: prompt,
						description: "",
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
			setReport(data.report);
		}

		fetchSubTopics();

		try {
			setLoading(true);
			fetchSubTopics();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [prompt]);
	console.log(report);
	return (
		<div className="h-screen w-full text-black flex flex-col justify-end relative items-center">
			{loading ? (
				<div className="w-10">
					<Spinner />
				</div>
			) : (
				<div className="relative px-28 w-full h-[630px] flex flex-col  overflow-y-scroll custom-scrollbar">
					<div className="flex flex-col w-full h-full">
						<ReportContainer>
							<div className="py-10 ">
								<div
									dangerouslySetInnerHTML={{
										__html: report,
									}}
								></div>
							</div>
						</ReportContainer>
					</div>
				</div>
			)}
		</div>
	);
}
