import { Dispatch, SetStateAction, useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import fetchSubTopics from "../lib/fetchSubTopics";
import { SubTopicsDataResponse, SubTopicType } from "@/types/types";

interface Props {
  title: string;
  desc: string;
  setOpenTopic: Dispatch<SetStateAction<string | null>>;
  selectedSubtopics: { title: string; desc: string }[];
}

export default function useSubTopics({ selectedSubtopics, title, desc, setOpenTopic }: Props) {

  const {
    subtopics,
    setSubtopics,
    setHasFetchedSubtopics,
    topics,
    handleUnselectSubtopic,
    handleSelectSubtopic
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
      handleUnselectSubtopic(title, subtopicObject);
    } else {
      handleSelectSubtopic(title, subtopicObject);
    }
  };

  return { isLoading, handleSubtopicToggle, getSubTopics }
}
