"use client";

import { useRef, useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import SubTopicReport from "./SubTopicReport";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useReports } from "../contexts/ReportsContext";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import { formatPDF } from "../lib/formatPDF";

export default function FinalReport() {
  const { finalTopics, reportLoading, reportData, reportContainerRef } =
    usePrompt();
  const data = Object.entries(finalTopics);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

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

  function handleDownload() {
    console.log(reportData);
  }

  function handleLoading() {
    console.log(reportLoading);
  }

  const options = {
    method: "open",
    resolution: Resolution.HIGH,
    page: {
      margin: Margin.SMALL,
      format: "letter",
      orientation: "landscape",
    },
    canvas: {
      mimeType: "image/png",
      qualityRatio: 1,
    },
  };

  const getTargetElement = () => document.getElementById("report");

  return (
    <div className="h-screen w-full  flex flex-col justify-end relative items-center">
      <div className="flex gap-2 absolute top-3 right-20">
        <button
          className="text-sm bg-black text-white rounded-md py-2 w-[100px]"
          onClick={handleLoading}
        >
          See Loading
        </button>
        <button
          className="text-sm bg-black text-white rounded-md py-2 w-[100px]"
          onClick={handleDownload}
        >
          See Data
        </button>
        <button
          className="text-sm bg-black text-white rounded-md py-2 w-[100px]"
          onClick={() => formatPDF(reportContainerRef)}
        >
          Download
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
