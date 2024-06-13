"use client";

import { SelectedSubTopicsType, SubTopicType } from "@/types/types";
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	SetStateAction,
	Dispatch,
} from "react";

type SubTopicsType = {
	[key: string]: string[][];
};
interface PromptData {
	prompt: string;
	subtopics: SubTopicsType;
	setSubtopics: Dispatch<SetStateAction<SubTopicsType>>;
	setPrompt: Dispatch<SetStateAction<string>>;
	selectedSubtopics: SelectedSubTopicsType;
	setSelectedSubtopics: Dispatch<SetStateAction<SelectedSubTopicsType>>;
	finalTopics: SelectedSubTopicsType;
	setFinalTopics: Dispatch<SetStateAction<SelectedSubTopicsType>>;
	hasFetchedSubtopics: string[];
	setHasFetchedSubtopics: Dispatch<SetStateAction<string[]>>;
	topics: string[][];
	setTopics: Dispatch<SetStateAction<string[][]>>
}
const PromptContext = createContext<PromptData | undefined>(undefined);

export const usePrompt = () => {
	const context = useContext(PromptContext);
	if (!context) {
		throw new Error("usePrompt must be used within a PromptProvider");
	}
	return context;
};

type PromptProviderProps = {
	children: ReactNode;
};

export const PromptProvider = ({ children }: PromptProviderProps) => {
	const [prompt, setPrompt] = useState("");
	const [subtopics, setSubtopics] = useState<SubTopicsType>({});
	const [hasFetchedSubtopics, setHasFetchedSubtopics] = useState<string[]>([]);
	const [selectedSubtopics, setSelectedSubtopics] =
		useState<SelectedSubTopicsType>({});
	const [topics, setTopics] = useState<string[][]>([])
	const [finalTopics, setFinalTopics] = useState<SelectedSubTopicsType>({});
	const promptData = {
		prompt,
		setPrompt,
		finalTopics,
		setFinalTopics,
		selectedSubtopics,
		setSelectedSubtopics,
		subtopics,
		setSubtopics,
		hasFetchedSubtopics,
		setHasFetchedSubtopics,
		topics,
		setTopics
	};

	return (
		<PromptContext.Provider value={promptData}>
			{children}
		</PromptContext.Provider>
	);
};
