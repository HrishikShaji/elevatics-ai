"use client";
import { useState } from "react";
import ShareEmail from "./ShareEmail";
import ReportContainer from "./ReportContainer";
import Slider from "./ui/Slider";
import ReportActions from "./ReportActions";
import { ReportData } from "@/types/types";
import DownloadModal from "./DownloadModal";
import DownloadPdfButton from "./DownloadPdfButton";
import useSavedFullReport from "../hooks/useSavedFullReport";

export default function SavedFinalReport() {
  const [isDownload, setIsDownload] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { reportId, type, selectedReports, report, prompt, handleReportSelection, loading, getHtmlArray } = useSavedFullReport()


  return (
    <div className="h-screen w-full flex flex-col justify-end relative items-center">
      <div className="flex flex-col h-[700px] justify-between items-center w-full">
        <Slider items={Object.entries(report)} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        <div
          className="relative px-28 w-full h-[630px] flex flex-col overflow-y-scroll custom-scrollbar"
        >
          <div className="flex flex-col w-full h-full">
            {Object.entries(report as ReportData).map((item, i) => (
              currentIndex === i &&
              <div key={i}>
                <ReportContainer>
                  {Object.entries(item[1]).map((subItem, j) => (
                    <div className="py-10" key={j}>

                      <div dangerouslySetInnerHTML={{ __html: subItem[1].report }}>
                      </div>
                    </div>
                  ))}
                </ReportContainer>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isDownload ? (
        <DownloadModal setIsDownload={setIsDownload}>
          <h1 className="whitespace-nowrap border-b-[1px] border-gray-300 w-full pb-2 text-center font-semibold text-xl">
            Select Reports
          </h1>
          <div className="flex flex-col gap-1 p-5">
            {Object.keys(report).map((key, i) => (
              <label key={key} className="whitespace-nowrap">
                <input
                  className="mr-3"
                  type="checkbox"
                  checked={selectedReports[key] || false}
                  onChange={() => handleReportSelection(key)}
                />
                {key}
              </label>
            ))}
          </div>
          <DownloadPdfButton htmlArray={getHtmlArray(selectedReports)} prompt={prompt} />
        </DownloadModal>
      ) : null}
      {isShare ?
        <ShareEmail id={reportId} type={type} setIsShare={setIsShare} htmlArray={getHtmlArray(selectedReports)} prompt={prompt} />
        : null}
    </div>
  );
}
