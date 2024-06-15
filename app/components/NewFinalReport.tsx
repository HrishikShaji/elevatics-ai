"use client";

import { useRef, useState, useEffect } from "react";
import { usePrompt } from "../contexts/PromptContext";
import SubTopicReport from "./SubTopicReport";
import { styledHtml } from "../lib/sample";
import NewSubTopicReport from "./NewSubTopicReport";

export default function NewFinalReport() {
  const {
    finalTopics,
    reportLoading,
    reportData,
    reportContainerRef,
    setReportData,
    setReportLoading,
  } = usePrompt();
  const data = Object.entries(finalTopics);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDownload, setIsDownload] = useState(false);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentIndex(page);
  };

  async function fetchSubTopics(
    { title, desc }: { title: string; desc: string },
    parentIndex: string,
    index: string,
  ) {
    setReportLoading((prev) => ({
      ...prev,
      [parentIndex]: { ...prev[parentIndex], [index]: true },
    }));
    const token = process.env.NEXT_PUBLIC_HFSPACE_TOKEN || "";
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "https://pvanand-search-generate.hf.space/generate_report",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          query: title,
          description: desc,
          user_id: "",
          user_name: "",
          internet: true,
          output_format: "Tabular Report",
          data_format: "Structured data",
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Error fetching topics");
    }

    const data = await response.json();
    setReportData((prev) => ({
      ...prev,
      [parentIndex]: { ...prev[parentIndex], [index]: data },
    }));
    setReportLoading((prev) => ({
      ...prev,
      [parentIndex]: { ...prev[parentIndex], [index]: false },
    }));
  }

  useEffect(() => {
    const fetchAllReportsSequentially = async () => {
      for (const [parentIndex, topics] of Object.entries(finalTopics)) {
        if (!reportData[parentIndex]) {
          for (const subtopic of topics) {
            await fetchSubTopics(subtopic, parentIndex, subtopic.title);
          }
        }
      }
    };

    fetchAllReportsSequentially();
  }, [finalTopics]);

  return (
    <div className="h-screen w-full  flex flex-col justify-end relative items-center">
      <div className="flex gap-2 absolute top-3 right-20">
        <button
          className="text-sm bg-black text-white rounded-md py-2 w-[100px]"
          onClick={() => console.log(reportData)}
        >
          Download One
        </button>
        <div className="relative">
          <button
            className="text-sm bg-black text-white rounded-md py-2 w-[100px]"
            onClick={() => setIsDownload((prev) => !prev)}
          >
            Download All
          </button>
          {isDownload ? (
            <div className="absolute  top-14 z-20 p-2 flex flex-col gap-2 bg-blue-500 rounded-md">
              <h1 className="whitespace-nowrap">Select Reports</h1>
              <div className="flex flex-col gap-1">
                {Object.keys(reportData).map((key, i) => (
                  <h1 key={key} className="whitespace-nowrap">
                    {key}
                  </h1>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <button
          className="text-sm bg-black text-white rounded-md py-2 w-[100px]"
          onClick={() => console.log(reportLoading)}
        >
          See Loading
        </button>
        <button className="text-sm  bg-black text-white rounded-md py-2 w-[100px]">
          Share
        </button>
      </div>
      <div className="flex flex-col   h-[700px] justify-between items-center  w-full">
        <div className="relative flex items-center px-28 w-full">
          <button
            onClick={scrollLeft}
            className="absolute size-6 flex items-center justify-center left-20 hover:bg-gray-200 rounded-full"
          >
            {"<"}
          </button>
          <div
            className="flex gap-1   overflow-x-hidden border-[1px] rounded-md border-gray-300 h-[50px]"
            ref={containerRef}
          >
            {data.map((item, i) => (
              <div
                key={i}
                onClick={() => handlePageChange(i)}
                className="w-full cursor-pointer h-full flex items-center border-b-4 relative group"
                style={{
                  backgroundColor: currentIndex === i ? "#EDF0FF" : "white",
                  borderColor: currentIndex === i ? "#2A42CB" : "white",
                }}
              >
                <div
                  className="px-10 text-center whitespace-nowrap"
                  style={{ color: currentIndex === i ? "#2A42CB" : "#7F7F7F" }}
                >
                  {data[i][0]}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="absolute size-6 flex items-center justify-center right-20 hover:bg-gray-200 rounded-full"
          >
            {">"}
          </button>
        </div>
        {data.length > 0 ? (
          <NewSubTopicReport
            parentIndex={data[currentIndex][0]}
            currentTopic={data[currentIndex][1]}
            title={data[currentIndex][0]}
          />
        ) : null}
      </div>
    </div>
  );
}
