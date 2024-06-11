import { Dispatch, SetStateAction, useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Spinner from "./svgs/Spinner";
import { TopicsDataResponse, SubTopicType } from "../contexts/PromptContext";

interface SingleTopicProps {
	title: string;
	desc: string;
	onSelectSubtopic: (topic: string, subtopic: SubTopicType) => void;
	onUnselectSubtopic: (topic: string, subtopic: SubTopicType) => void;
	selectedSubtopics: { title: string; desc: string }[];
	setCurrentSubTopic: Dispatch<SetStateAction<SubTopicType>>;
	isOpen: boolean; // New prop
	setOpenTopic: Dispatch<SetStateAction<string | null>>; // New prop
}

export const SingleTopic: React.FC<SingleTopicProps> = ({
	title,
	desc,
	onSelectSubtopic,
	onUnselectSubtopic,
	selectedSubtopics,
	setCurrentSubTopic,
	isOpen,
	setOpenTopic,
}) => {
	const { prompt } = usePrompt();
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [data, setData] = useState<TopicsDataResponse>();

	async function fetchSubTopics(prompt: string, prevQueries: string[]) {
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
					num_topics: 5,
					previous_queries: prevQueries,
				}),
			},
		);

		if (!response.ok) {
			throw new Error("Error fetching topics");
		}

		return response.json();
	}

	async function getSubTopics() {
		setOpenTopic(title);
		if (!data) {
			try {
				setIsLoading(true);
				setIsSuccess(false);
				const response = await fetchSubTopics(title, [prompt]);
				setData(response);
				setIsSuccess(true);
			} catch (error) {
				console.log(error);
				setIsSuccess(false);
			} finally {
				setIsLoading(false);
			}
		}
	}

	const handleSubtopicToggle = (subtopic: string[]) => {
		const subtopicObject: SubTopicType = {
			title: subtopic[0],
			desc: subtopic[1],
			report: "",
		};
		if (selectedSubtopics.find((item) => item.title === subtopic[0])) {
			onUnselectSubtopic(title, subtopicObject);
		} else {
			onSelectSubtopic(title, subtopicObject);
		}
	};

	return (
		<div className="w-full bg-white py-1 border-b-2 border-gray-200  flex flex-col">
			<div className="flex justify-between items-center w-full">
				<h1>{title}</h1>
				{isOpen ? (
					<button onClick={() => setOpenTopic(null)} className="">
						<CiCircleMinus size={30} />
					</button>
				) : (
					<button onClick={getSubTopics} className="">
						<CiCirclePlus size={30} />
					</button>
				)}
			</div>
			{isLoading ? (
				<div className="w-10">
					<Spinner />
				</div>
			) : null}
			{isOpen && isSuccess ? (
				<div>
					{(data as TopicsDataResponse).topics.map((subtopic, i) => (
						<div className="py-1 px-3 flex gap-3 w-full" key={i}>
							<input
								type="checkbox"
								checked={
									!!selectedSubtopics.find((item) => item.title === subtopic[0])
								}
								onChange={() => handleSubtopicToggle(subtopic)}
							/>
							{subtopic[0]}
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};