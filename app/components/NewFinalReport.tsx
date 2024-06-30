"use client";
import { useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import NewSubTopicReport from "./NewSubTopicReport";
import ShareEmail from "./ShareEmail";
import useReports from "../hooks/useReports";
import Slider from "./ui/Slider";
import DownloadModal from "./DownloadModal";
import DownloadPdfButton from "./DownloadPdfButton";
import ReportActions from "./ReportActions";
import CheckBox from "./ui/CheckBox";

export default function NewFinalReport() {
  const {
    reportData,
    prompt,
  } = usePrompt();
  const [isDownload, setIsDownload] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { savedReport, data, getHtmlArray, handleReportSelection, selectedReports } = useReports()


  return (
    <div className="h-screen w-full  flex flex-col  relative items-center justify-center">
      <ReportActions setIsDownload={setIsDownload} setIsShare={setIsShare} />
      <div className="flex flex-col ">
        <div className="pl-28 ">

          <Slider setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} items={data} />
        </div>
        {data.length > 0 ? (
          <NewSubTopicReport
            parentIndex={data[currentIndex][0]}
            currentTopic={data[currentIndex][1]}
            title={data[currentIndex][0]}
          />
        ) : null}
      </div>
      {isDownload ? (
        <DownloadModal setIsDownload={setIsDownload}>

          <h1 className="whitespace-nowrap border-b-[1px] border-gray-300 w-full pb-2 text-center font-semibold text-xl">
            Select Reports
          </h1>
          <div className="flex flex-col gap-1 p-5">
            {Object.keys(reportData).map((key, i) => (
              <CheckBox key={key} checked={selectedReports[key] || false} onChange={() => handleReportSelection(key)} title={key} />
            ))}
          </div>
          <div className="w-full flex justify-center">

            <DownloadPdfButton prompt={prompt} htmlArray={getHtmlArray(selectedReports)} />
          </div>
        </DownloadModal>
      ) : null}
      {isShare && savedReport ? (
        <ShareEmail
          id={savedReport.id}
          type={savedReport.reportType}
          setIsShare={setIsShare}
          htmlArray={getHtmlArray(selectedReports)}
          prompt={prompt}
        />
      ) : null}
    </div>
  );
}
