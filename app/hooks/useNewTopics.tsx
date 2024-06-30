
import { useEffect, useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import fetchTopics from "../lib/fetchTopics";
import { useSettings } from "../contexts/SettingsContext";
import fetchNewTopics from "../lib/fetchNewTopics";
import { useResearcher } from "../contexts/ResearcherContext";

export default function useNewTopics() {
  const { prompt } = useResearcher()
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string[][]>([]);
  const { topicsLimit } = useSettings()


  useEffect(() => {
    setIsLoading(true);
    fetchNewTopics({ prompt: prompt, topicsNum: topicsLimit.topics, subTopicsNum: topicsLimit.subTopics })
      .then((response) => {
        console.log(response)
        setData(response.topics);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [prompt]);



  return { setOpenTopic, openTopic, isLoading, data }
}
