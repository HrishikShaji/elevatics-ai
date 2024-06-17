"use client";

import { FormEvent, useEffect, useState } from "react";
import { useQuickReport } from "../contexts/QuickReportContext";
import Spinner from "./svgs/Spinner";
import ReportContainer from "./ReportContainer";
import ShareEmail from "./ShareEmail";
import { styledHtml } from "../lib/sample";

export default function QuickReport() {
	const { prompt } = useQuickReport();
	const [loading, setLoading] = useState(false);
	const [report, setReport] = useState<string>("");
	const [email, setEmail] = useState("");
	const [isShare, setIsShare] = useState(false);
	const [downloading, setDownloading] = useState(false);
	const [sending, setSending] = useState(false);

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
					cache: "no-store",
					body: JSON.stringify({
						topic: "",
						description: prompt,
						user_id: "",
						user_name: "",
						internet: true,
						output_format: "Tabular Report",
						data_format: "No presets",
					}),
				},
			);

			if (!response.ok) {
				throw new Error("Error fetching topics");
			}

			const data = await response.json();
			setReport(data.report);
		}

		try {
			setLoading(true);
			fetchSubTopics();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [prompt]);

	async function handleDownload() {
		if (report) {
			const styledReport = styledHtml(report);
			const htmlArray = [styledReport];
			try {
				setDownloading(true);
				const response = await fetch("/api/pdf", {
					method: "POST",
					body: JSON.stringify({ htmlArray }),
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
			} catch (error) {
				console.log(error);
			} finally {
				setDownloading(false);
			}
		}
	}

	async function handleEmail(e: FormEvent) {
		e.preventDefault();
		if (report) {
			try {
				setSending(true);
				const styledReport = styledHtml(report);
				const htmlArray = [styledReport];
				const response = await fetch("/api/email", {
					method: "POST",
					body: JSON.stringify({ htmlArray, email }),
					headers: { "Content-Type": "application/json" },
				});

				if (response.ok) {
					console.log("successs");
				} else {
					console.error("Failed to send");
				}
			} catch (error) {
				console.log(error);
			} finally {
				setSending(false);
			}
		}
	}

	return (
		<div className="h-screen w-full text-black flex flex-col justify-end  items-center">
			{isShare ? (
				<ShareEmail
					loading={sending}
					setIsShare={setIsShare}
					handleEmail={handleEmail}
					email={email}
					setEmail={setEmail}
				/>
			) : null}
			{loading ? (
				<div className="w-10">
					<Spinner />
				</div>
			) : (
				<>
					<button
						className="absolute top-20 right-32 p-2 rounded-md bg-black text-white"
						onClick={handleDownload}
					>
						{downloading ? <Spinner /> : "Download"}
					</button>
					<button
						className="absolute top-10 right-32 p-2 rounded-md bg-black text-white"
						onClick={() => setIsShare(true)}
					>
						Share
					</button>
					<div className="relative px-28 w-full h-[660px] flex flex-col  overflow-y-scroll custom-scrollbar">
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
				</>
			)}
		</div>
	);
}
