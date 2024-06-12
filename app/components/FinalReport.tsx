"use client";

import { useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import SubTopicReport from "./SubTopicReport";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useReports } from "../contexts/ReportsContext";

export default function FinalReport() {
  const { finalTopics } = usePrompt();
  const data = Object.entries(finalTopics);
  const { reportsData } = useReports();
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handlePageChange = (page: number) => {
    setCurrentIndex(page);
  };

  function handleDownload() {
    console.log(reportsData);
  }

  return (
    <div className="h-screen w-full  flex flex-col justify-end relative items-center">
      <button
        className="absolute top-2 right-2 bg-black text-white rounded-md p-2"
        onClick={handleDownload}
      >
        Download
      </button>
      <div className="flex gap-1 w-[800px] divide-x-2 divide-gray-300 overflow-x-scroll border-2 rounded-md border-gray-300 h-[60px]">
        {data.map((item, i) => (
          <div
            key={i}
            onClick={() => handlePageChange(i)}
            className="w-full cursor-pointer h-full  flex items-center border-b-4  relative group"
            style={{
              backgroundColor: currentIndex === i ? "#EDF0FF" : "white",
              borderColor: currentIndex === i ? "#2A42CB" : "white",
            }}
          >
            <div
              className=" w-[300px] text-center "
              style={{ color: currentIndex === i ? "#2A42CB" : "#7F7F7F" }}
            >
              {data[i][0]}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col   h-[700px] items-center  w-full">
        {data.length > 0 ? (
          <SubTopicReport
            parentIndex={currentIndex}
            currentTopic={data[currentIndex][1]}
            title={data[currentIndex][0]}
          />
        ) : null}
      </div>
    </div>
  );
}
