

"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface ResearcherData {
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
}
const ResearcherContext = createContext<ResearcherData | undefined>(undefined);

export const useResearcher = () => {
  const context = useContext(ResearcherContext);
  if (!context) {
    throw new Error("useResearcher must be used within a ResearcherProvider");
  }
  return context;
};

type ResearcherProviderProps = {
  children: ReactNode;
};

export const ResearchProvider = ({ children }: ResearcherProviderProps) => {
  const [prompt, setPrompt] = useState("");
  const researcherData = {
    prompt,
    setPrompt,
  };

  return (
    <ResearcherContext.Provider value={researcherData}>
      {children}
    </ResearcherContext.Provider>
  );
};
