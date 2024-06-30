
"use client";

import { useTheme } from "../contexts/ThemeContext";
import Spinner from "./svgs/Spinner";
import useNewTopics from "../hooks/useNewTopics";
import { useResearcher } from "../contexts/ResearcherContext";
import Task from "./Task";
import { useRouter } from "next/navigation";

export default function NewTopicSection() {
  const { theme } = useTheme();
  const { data, prompt, selectedSubtasks } = useResearcher();
  const { isLoading, setOpenTopic, openTopic } = useNewTopics();
  const router = useRouter()
  console.log(selectedSubtasks)

  return (
    <div
      style={{
        backgroundColor: theme.primary.backgroundColor,
        color: theme.primary.textColor,
      }}
      className="flex flex-col sm:flex-row h-full sm:gap-5"
    >
      <button onClick={() => router.push("/new-researcher/topics/report")} className="p-2 rounded-md bg-black text-white">continue</button>
      {isLoading ? (
        <div className="w-full flex justify-center">
          <div className="w-10 mt-10">
            <Spinner />
          </div>
        </div>
      ) : null}
      <div className="pt-[200px] px-[200px] flex flex-col gap-1">
        {data.map((task, i) => (
          <Task
            currentTopic={task}
            isOpen={openTopic === task.task}
            setOpenTopic={setOpenTopic}
            title={task.task}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
