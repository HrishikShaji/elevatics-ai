import { useEffect, useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import { SubTopicType } from "@/types/types";
import fetchTopics from "../lib/fetchTopics";

export default function useTopics() {

  const {
    topics,
    setTopics,
    prompt,
    setSelectedSubtopics,
  } = usePrompt();
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string[][]>([]);

  useEffect(() => {
    if (topics.length === 0) {
      setIsLoading(true);
      fetchTopics(prompt)
        .then((response) => {
          setData(response.topics);
          setTopics(response.topics);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [prompt]);


  const handleSelectSubtopic = async (
    topic: string,
    subtopic: SubTopicType,
  ) => {
    setSelectedSubtopics((prev) => ({
      ...prev,
      [topic]: prev[topic] ? [...prev[topic], subtopic] : [subtopic],
    }));
  };

  const handleUnselectSubtopic = (topic: string, subtopic: SubTopicType) => {
    setSelectedSubtopics((prev) => ({
      ...prev,
      [topic]: prev[topic].filter((item) => item.title !== subtopic.title),
    }));
  };

  return { setOpenTopic, openTopic, handleUnselectSubtopic, handleSelectSubtopic, isLoading, data }
}
