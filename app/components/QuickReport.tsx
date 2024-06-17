"use client";

import { FormEvent, useEffect, useState } from "react";
import { useQuickReport } from "../contexts/QuickReportContext";
import Spinner from "./svgs/Spinner";
import ReportContainer from "./ReportContainer";
import ShareEmail from "./ShareEmail";
import { IoIosCloseCircle } from "react-icons/io";

export default function QuickReport() {
	const { prompt } = useQuickReport();
	const [loading, setLoading] = useState(false);
	const [report, setReport] = useState(null);
	const [email, setEmail] = useState("");
	const [isShare, setIsShare] = useState(false);

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

	function styledHtml(html: string) {
		return `<html>
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
<style>
body{
font-family:"Poppins",sans-serif;
}

  h1 {
    font-size: 32px;
    color: black;
    font-weight: 500;
    padding: 0px 0px 15px 0px;
  }

  h2 {
    font-size: 24px;
    color: black;
    padding: 10px 0px 10px 0px;
  }

  h3 {
    color: black;
    font-size: 24px;
    font-weight: 500;
    padding: 10px 0px 10px 0px;
  }

  h4 {
    color: black;
    font-size: 20px;
    padding: 5px 0px 5px 0px;
  }
  p {
    color: black;
    padding: 5px 0px 5px 0px;
  }
  strong {
    font-weight: 500;
  }

  li {
    color: black;
    display: flex;
    gap: 10px;
    padding: 0px 0px 0px 15px;
  }

  li strong {
    min-width: 300px;
    margin-right: 10px;
  }


li:first-child{
min-width:300px;
margin-right:10px;
}
  table {
    border-collapse: collapse;
  }

  td,
  th {
    text-align: left;
    padding: 10px;
  }

  hr {
    display: none;
    color: white;
    background-color: white;
  }

  th:first-of-type {
    border-top-left-radius: 10px;
  }
  th:last-of-type {
    border-top-right-radius: 10px;
  }
  tr:last-of-type td:first-of-type {
    border-bottom-left-radius: 10px;
  }
  tr:last-of-type td:last-of-type {
    border-bottom-right-radius: 10px;
  }

  tr {
    border-bottom: 1px solid #d4d4d4;
  }

  thead tr {
    //background-color: #2563eb;
  }

  tbody tr:nth-child(odd) {
    //  background-color: #f5f5f4;
  }

  tbody tr:nth-child(even) {
    //background-color: #e7e5e4;
    //color: black;
  }

  ul {
    display: flex;
    flex-direction: column;
  }

.links {
display:flex;
flex-direction:column;
}

  li:befor {
    content: "";
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border: 4px solid white;
    border-radius: 50%;
    background: #d4d4d4;
    display: inline-block;
    padding: 0px 10px 0px 10px;
  }
  h2:befor {
    content: "";
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border-radius: 50%;
    background: #22c55e;
    display: inline-block;
  }
</style>
</head>
<body style="page-break-before:always;">${html}</body></html>`;
	}
	async function handleDownload() {
		const styledReport = styledHtml(report);
		const htmlArray = [styledReport];
		console.log(htmlArray);
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
	}

	async function handleEmail(e: FormEvent) {
		e.preventDefault()
		const styledReport = styledHtml(report);
		const htmlArray = [styledReport];
		console.log(htmlArray);
		const response = await fetch("/api/email", {
			method: "POST",
			body: JSON.stringify({ htmlArray, email }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			console.log("successs");
		} else {
			console.error("Failed to generate PDF");
		}
	}

	return (
		<div className="h-screen w-full text-black flex flex-col justify-end  items-center">
			{isShare ? (
				<div className="fixed z-50 top-0 left-0 h-screen w-full bg-black/70 flex items-center justify-center">
					<div className="relative  p-2 flex flex-col gap-2 bg-white rounded-3xl">
						<button
							onClick={() => setIsShare(false)}
							className="absolute top-2 right-2"
						>
							<IoIosCloseCircle size={25} />
						</button>
						<div className="flex flex-col gap-5 p-5 items-center justify-center">
							<ShareEmail
								handleEmail={handleEmail}
								email={email}
								setEmail={setEmail}
							/>
						</div>
					</div>
				</div>
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
						Download
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
