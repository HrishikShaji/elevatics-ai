"use client";

import { SelectedSubTopicsType, SubTopicType } from "@/types/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
  useRef,
  Ref,
  RefObject,
} from "react";

type Reference = {
  [key: string]: string;
};

type Report = {
  report: string;
  references: Reference;
  search_qury: string;
};

type ReportData = {
  [key: string]: {
    [index: number]: Report;
  };
};

type ReportLoading = {
  [key: string]: {
    [index: number]: boolean;
  };
};

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
  setTopics: Dispatch<SetStateAction<string[][]>>;
  reportData: ReportData;
  setReportData: Dispatch<SetStateAction<ReportData>>;
  reportLoading: ReportLoading;
  setReportLoading: Dispatch<SetStateAction<ReportLoading>>;
  reportContainerRef: RefObject<HTMLDivElement>;
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
  const [topics, setTopics] = useState<string[][]>([]);
  const [finalTopics, setFinalTopics] = useState<SelectedSubTopicsType>({});
  const [reportData, setReportData] = useState<ReportData>({});
  const [reportLoading, setReportLoading] = useState<ReportLoading>({});
  const reportContainerRef = useRef<HTMLDivElement>(null);
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
    setTopics,
    reportLoading,
    setReportLoading,
    reportData,
    setReportData,
    reportContainerRef,
  };

  return (
    <PromptContext.Provider value={promptData}>
      {children}
    </PromptContext.Provider>
  );
};
