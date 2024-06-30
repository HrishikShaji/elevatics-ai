
"use client";

import { usePrompt } from "@/app/contexts/PromptContext";
import { useTheme } from "../contexts/ThemeContext";
import { useRouter } from "next/navigation";
import Spinner from "./svgs/Spinner";
import SingleTopic from "./SingleTopic";
import useTopics from "../hooks/useTopics";
import { useSettings } from "../contexts/SettingsContext";
import useNewTopics from "../hooks/useNewTopics";

export default function NewTopicSection() {
  const { theme } = useTheme();
  const {
    topics, prompt
  } = usePrompt();
  const { isLoading, data, setOpenTopic, openTopic } = useNewTopics()
  const router = useRouter();
  console.log(data)


  return (
    <div
      style={{
        backgroundColor: theme.primary.backgroundColor,
        color: theme.primary.textColor,
      }}
      className="flex flex-col sm:flex-row h-full  sm:gap-5"
    >
      {isLoading ? (
        <div className="w-full flex justify-center">
          <div className="w-10 mt-10">
            <Spinner />
          </div>
        </div>
      ) : null}
      {topics.length !== 0 ? (
        <></>
      ) : null}
    </div>
  );
}
