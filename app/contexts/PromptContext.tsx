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

interface PromptData {
	prompt: string;
	setPrompt: Dispatch<SetStateAction<string>>;
	selectedSubtopics: SelectedSubTopicsType;
	setSelectedSubtopics: Dispatch<SetStateAction<SelectedSubTopicsType>>;
	finalTopics: SelectedSubTopicsType;
	setFinalTopics: Dispatch<SetStateAction<SelectedSubTopicsType>>;
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
	const [selectedSubtopics, setSelectedSubtopics] =
		useState<SelectedSubTopicsType>({});
	const [finalTopics, setFinalTopics] = useState<SelectedSubTopicsType>({});
	const promptData = {
		prompt,
		setPrompt,
		finalTopics,
		setFinalTopics,
		selectedSubtopics,
		setSelectedSubtopics
	};

	return (
		<PromptContext.Provider value={promptData}>
			{children}
		</PromptContext.Provider>
	);
};
