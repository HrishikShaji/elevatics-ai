"use client";

import { usePrompt } from "@/app/contexts/PromptContext";
import { useTheme } from "../contexts/ThemeContext";
import { useRouter } from "next/navigation";
import Spinner from "./svgs/Spinner";
import SingleTopic from "./SingleTopic";
import useTopics from "../hooks/useTopics";

export default function TopicSection() {
  const { theme } = useTheme();
  const {
    setFinalTopics,
    selectedSubtopics,
    topics, prompt
  } = usePrompt();

  const { isLoading, data, setOpenTopic, openTopic, handleSelectSubtopic, handleUnselectSubtopic } = useTopics()
  const router = useRouter();

  function handleNext() {
    setFinalTopics(selectedSubtopics);
    router.push("/researcher/report");
  }


  return (
    <div
      style={{
        backgroundColor: theme.primary.backgroundColor,
        color: theme.primary.textColor,
      }}
      className="flex h-full  gap-5"
    >
      {isLoading ? (
        <div className="w-full flex justify-center">
          <div className="w-10 mt-10">
            <Spinner />
          </div>
        </div>
      ) : null}
      {topics.length !== 0 ? (
        <>
          <div className="w-[50%]  h-full overflow-y-hidden p-10 pt-24">
            <div className="w-full justify-between flex relative items-center">
              <div>
                <h1 className="text-xl sm:text-3xl font-semibold w-full">
                  {prompt}
                </h1>
                <h1 className="text-[#39393A] w-full">
                  Select the components to be included in the final report:
                </h1>
              </div>
            </div>
            <div className="flex flex-col  w-full mt-5">
              {topics.map((topic, i) => (
                <SingleTopic
                  key={i}
                  topics={data}
                  title={topic[0]}
                  desc={topic[1]}
                  onSelectSubtopic={handleSelectSubtopic}
                  onUnselectSubtopic={handleUnselectSubtopic}
                  selectedSubtopics={selectedSubtopics[topic[0]] || []}
                  isOpen={openTopic === topic[0]}
                  setOpenTopic={setOpenTopic}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              style={{
                backgroundColor: theme.button.backgroundColor,
                color: theme.button.textColor,
              }}
              className="rounded-md p-2  flex-grow-0 absolute bottom-10 left-10"
            >
              Continue
            </button>
          </div>
          <div className="w-[50%] h-full bg-black p-10  text-white pt-24">
            <div className="w-full h-[80vh] custom-scrollbar pr-5 overflow-y-auto">
              {Object.entries(selectedSubtopics).map(([key, value], i) => (
                <div key={i} className=" w-full">
                  <div
                    key={i}
                    className="border-b-2 py-2  text-xl border-gray-700 w-full"
                  >
                    {value.length !== 0 ? key : null}
                  </div>
                  {value.map((item, j) => (
                    <div key={j} className="ml-5 py-1">
                      <h1>{item.title}</h1>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
