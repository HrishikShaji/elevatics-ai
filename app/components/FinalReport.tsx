"use client";

import { useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import SubTopicReport from "./SubTopicReport";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const FinalReport = () => {
  const { prompt, finalTopics } = usePrompt();

  const data = Object.entries(finalTopics);
  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 5;
  const totalPages = Math.ceil(data.length / topicsPerPage);
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="flex gap-2 h-[90%]">
        {data.length > 0 ? (
          <SubTopicReport
            parentIndex={currentIndex}
            currentTopic={data[currentIndex][1]}
            title={data[currentIndex][0]}
          />
        ) : null}
      </div>
      <div className="flex px-5 gap-2 mt-4 w-[90vw] justify-between">
        <button
          onClick={prevSlide}
          className="flex-shrink-0 p-2 bg-gray-300 rounded-full">
          <IoIosArrowBack />
        </button>
        {/* 
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 ${page === currentPage ? "bg-blue-500" : "bg-gray-300"} rounded`}
            >
                {page}
            </button>
        ))}
        */}
        <button
          onClick={nextSlide}
          className="p-2 flex-shrink-0 bg-gray-300 rounded-full">
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default FinalReport;
