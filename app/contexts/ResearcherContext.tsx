"use client"

import { ResearcherTopicsResponse } from "@/types/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type Subtask = {
  name: string;
  prompt: string;
}

interface SelectedSubtasks {
  [task: string]: Subtask[];
}

type ResearcherProviderProps = {
  children: ReactNode;
};
interface ResearcherData {
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
  data: ResearcherTopicsResponse[];
  setData: Dispatch<SetStateAction<ResearcherTopicsResponse[]>>;
  selectedSubtasks: SelectedSubtasks;
  setSelectedSubtasks: Dispatch<SetStateAction<SelectedSubtasks>>;
}

const ResearcherContext = createContext<ResearcherData | undefined>(undefined);
export const useResearcher = () => {
  const context = useContext(ResearcherContext);
  if (!context) {
    throw new Error("useResearcher must be used within a ResearcherProvider");
  }
  return context;
};
export const ResearchProvider = ({ children }: ResearcherProviderProps) => {
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState<ResearcherTopicsResponse[]>([]);
  const [selectedSubtasks, setSelectedSubtasks] = useState<SelectedSubtasks>({});

  const researcherData = {
    prompt,
    setPrompt,
    data,
    setData,
    selectedSubtasks,
    setSelectedSubtasks,
  };

  return (
    <ResearcherContext.Provider value={researcherData}>
      {children}
    </ResearcherContext.Provider>
  );
};
