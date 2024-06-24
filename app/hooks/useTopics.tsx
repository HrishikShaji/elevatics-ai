import { useEffect, useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import fetchTopics from "../lib/fetchTopics";
import { useSettings } from "../contexts/SettingsContext";

export default function useTopics() {

  const {
    topics,
    setTopics,
    prompt,
  } = usePrompt();
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string[][]>([]);
  const { topicsLimit } = useSettings()


  useEffect(() => {
    if (topics.length === 0) {
      setIsLoading(true);
      fetchTopics({ prompt: prompt, topicsNum: topicsLimit.topics })
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



  return { setOpenTopic, openTopic, isLoading, data }
}
