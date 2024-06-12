"use client";

import { SelectedSubTopicsType } from "@/types/types";
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
	const [finalTopics, setFinalTopics] = useState<SelectedSubTopicsType>({});
	const promptData = {
		prompt,
		setPrompt,
		finalTopics,
		setFinalTopics,
	};

	return (
		<PromptContext.Provider value={promptData}>
			{children}
		</PromptContext.Provider>
	);
};
