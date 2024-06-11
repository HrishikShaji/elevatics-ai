import { useState } from "react";
import SingleReport from "./SingleReport";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

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
	const [currentIndex, setCurrentIndex] = useState(0);
	const [fetchedReports, setFetchedReports] = useState<boolean[]>(
		new Array(currentTopic.length).fill(false),
	);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % currentTopic.length);
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + currentTopic.length) % currentTopic.length,
		);
	};

	const markAsFetched = (index: number) => {
		setFetchedReports((prev) => {
			const newFetchedReports = [...prev];
			newFetchedReports[index] = true;
			return newFetchedReports;
		});
	};

	return (
		<div className="relative w-full   h-full">
			<h1 className="text-xl font-semibold text-black">{title}</h1>
			<SingleReport
				title={currentTopic[currentIndex].title}
				desc={currentTopic[currentIndex].desc}
				hasFetched={fetchedReports[currentIndex]}
				markAsFetched={() => markAsFetched(currentIndex)}
				parentIndex={parentIndex}
			/>
		</div>
	);
};

export default SubTopicReport;
