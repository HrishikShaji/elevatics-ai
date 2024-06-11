"use client";

import { useEffect, useState } from "react";
import {
	SelectedSubTopicsType,
	SubTopicType,
	TopicsDataResponse,
	usePrompt,
} from "@/app/contexts/PromptContext";
import { useTheme } from "../contexts/ThemeContext";
import { SingleTopic } from "./SingleTopic";
import { useRouter } from "next/navigation";
import Spinner from "./svgs/Spinner";

const TopicSection = () => {
	const { theme } = useTheme();
	const { prompt, setFinalTopics } = usePrompt();
	const router = useRouter();
	const [selectedSubtopics, setSelectedSubtopics] =
		useState<SelectedSubTopicsType>({});
	const [currentSubTopic, setCurrentSubTopic] = useState<SubTopicType>({
		title: "",
		desc: "",
		report: "",
	});
	const [openTopic, setOpenTopic] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [data, setData] = useState<TopicsDataResponse>();

	useEffect(() => {
		async function fetchTopics(prompt: string) {
			const token = process.env.NEXT_PUBLIC_HFSPACE_TOKEN || "";
			const headers = {
				Authorization: token,
				"Content-Type": "application/json",
			};
			const response = await fetch(
				"https://pvanand-generate-subtopics.hf.space/generate_topics",
				{
					method: "POST",
					headers: headers,
					body: JSON.stringify({
						user_input: prompt,
						num_topics: 10,
						previous_queries: [],
					}),
				},
			);

			if (!response.ok) {
				throw new Error("Error fetching topics");
			}

			return response.json();
		}
		setIsLoading(true);
		setIsSuccess(false);

		fetchTopics(prompt)
			.then((response) => {
				setData(response.recommendations);
				setIsSuccess(true);
			})
			.catch((error) => {
				console.log(error);
				setIsSuccess(false);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	function handleNext() {
		setFinalTopics(selectedSubtopics);
		router.push("/marketing/advanced-report/final-report");
	}

	const handleSelectSubtopic = async (
		topic: string,
		subtopic: SubTopicType,
	) => {
		setSelectedSubtopics((prev) => ({
			...prev,
			[topic]: prev[topic] ? [...prev[topic], subtopic] : [subtopic],
		}));

		setCurrentSubTopic(subtopic);
	};

	const handleUnselectSubtopic = (topic: string, subtopic: SubTopicType) => {
		setSelectedSubtopics((prev) => ({
			...prev,
			[topic]: prev[topic].filter((item) => item.title !== subtopic.title),
		}));
		setCurrentSubTopic({ title: "", desc: "", report: "" });
	};

	return (
		<div
			style={{
				backgroundColor: theme.primary.backgroundColor,
				color: theme.primary.textColor,
			}}
			className="flex h-screen flex-col gap-5 w-full px-20 justify-center items-end"
		>
			<div className="w-full justify-between flex items-center">
				<div>
					<h1 className="text-xl sm:text-3xl font-semibold w-full">{prompt}</h1>
					<h1 className="text-[#39393A] w-full">
						Select the components to be included in the final report:
					</h1>
				</div>
				<button
					onClick={handleNext}
					style={{
						backgroundColor: theme.button.backgroundColor,
						color: theme.button.textColor,
					}}
					className="rounded-md p-2 mt-10 flex-grow-0"
				>
					Continue
				</button>
			</div>
			{isLoading ? (
				<div className="w-full flex justify-center">
					<div className="w-10 mt-10">
						<Spinner />
					</div>
				</div>
			) : null}
			{isSuccess ? (
				<div className="w-full flex gap-5">
					<div className="w-[50%]  h-[80vh] overflow-y-hidden">
						<div className="flex flex-col  w-full ">
							{(data as TopicsDataResponse).topics.map((topic, i) => (
								<SingleTopic
									key={i}
									title={topic[0]}
									desc={topic[1]}
									onSelectSubtopic={handleSelectSubtopic}
									onUnselectSubtopic={handleUnselectSubtopic}
									selectedSubtopics={selectedSubtopics[topic[0]] || []}
									setCurrentSubTopic={setCurrentSubTopic}
									isOpen={openTopic === topic[0]}
									setOpenTopic={setOpenTopic}
								/>
							))}
						</div>
					</div>
					<div className="w-[50%] h-[80vh] bg-gray-800 p-5 rounded-3xl text-white ">
						<div className="w-full h-full custom-scrollbar overflow-y-scroll">
							{Object.entries(selectedSubtopics).map(([key, value], i) => (
								<div key={i} className=" w-full">
									<div key={i} className="border-b-2 border-gray-700 w-full">
										{value.length !== 0 ? key : null}
									</div>
									{value.map((item, j) => (
										<h1 key={j} className="ml-5">
											{item.title}
										</h1>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default TopicSection;
