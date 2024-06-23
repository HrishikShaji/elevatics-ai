import { Dispatch, SetStateAction, useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Spinner from "./svgs/Spinner";
import { SubTopicType } from "@/types/types";
import fetchSubTopics from "../lib/fetchSubTopics";
import useSubTopics from "../hooks/useSubTopics";


interface SingleTopicProps {
  title: string;
  desc: string;
  topics: string[][];
  selectedSubtopics: { title: string; desc: string }[];
  isOpen: boolean;
  setOpenTopic: Dispatch<SetStateAction<string | null>>;
}

export default function SingleTopic({
  title,
  desc,
  selectedSubtopics,
  isOpen,
  setOpenTopic,
  topics,
}: SingleTopicProps) {

  const { subtopics } = usePrompt()
  const { getSubTopics, isLoading, handleSubtopicToggle } = useSubTopics({ title: title, desc: desc, selectedSubtopics: selectedSubtopics, setOpenTopic: setOpenTopic })

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
