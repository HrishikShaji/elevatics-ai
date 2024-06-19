import { Dispatch, SetStateAction, useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Spinner from "./svgs/Spinner";
import { SubTopicType } from "@/types/types";
import fetchSubTopics from "../lib/fetchSubTopics";

type SubTopicsDataResponse = {
	subtopics: string[][];
};

interface SingleTopicProps {
	title: string;
	desc: string;
	topics: string[][];
	onSelectSubtopic: (topic: string, subtopic: SubTopicType) => void;
	onUnselectSubtopic: (topic: string, subtopic: SubTopicType) => void;
	selectedSubtopics: { title: string; desc: string }[];
	isOpen: boolean;
	setOpenTopic: Dispatch<SetStateAction<string | null>>;
}

export default function SingleTopic({
	title,
	desc,
	onSelectSubtopic,
	onUnselectSubtopic,
	selectedSubtopics,
	isOpen,
	setOpenTopic,
	topics,
}: SingleTopicProps) {
	const {
		prompt,
		subtopics,
		setSubtopics,
		hasFetchedSubtopics,
		setHasFetchedSubtopics,
	} = usePrompt();
	const [isLoading, setIsLoading] = useState(false);
	const excludedTopics = topics.filter((topic) => topic[0] !== title);
	const excludedTopicTitles = excludedTopics.map((item) => item[0]);

	async function getSubTopics() {
		setOpenTopic(title);
		if (!subtopics[title]) {
			try {
				setIsLoading(true);
				const response = await fetchSubTopics({
					desc: desc,
					title: title,
					excludedTopicTitles: excludedTopicTitles,
				});
				setSubtopics((prev) => ({
					...prev,
					[title]: (response as SubTopicsDataResponse).subtopics,
				}));
				setHasFetchedSubtopics((prev) => [...prev, title]);
			} catch (error) {
				console.log(error);
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
			{isOpen && subtopics[title] ? (
				<div>
					{subtopics[title].map((subtopic, i) => (
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
}
