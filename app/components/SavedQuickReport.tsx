
"use client";

import { useEffect, useState } from "react";
import Spinner from "./svgs/Spinner";
import ReportContainer from "./ReportContainer";
import ShareEmail from "./ShareEmail";
import ReportActions from "./ReportActions";
import { getHtmlArray } from "../lib/utils";
import DownloadModal from "./DownloadModal";
import DownloadPdfButton from "./DownloadPdfButton";
import useSavedQuickReport from "../hooks/useSavedQuickReport";

export default function SavedQuickReport() {
  const [isShare, setIsShare] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const { loading, prompt, report } = useSavedQuickReport()

  return (
    <div className="h-screen relative w-full text-black flex flex-col justify-end items-center">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-10">
            <Spinner />
          </div>
        </div>
      ) : (
        <>
          <ReportActions setIsShare={setIsShare} setIsDownload={setIsDownload} />
          <div className="relative px-28 w-full h-[660px] flex flex-col overflow-y-scroll custom-scrollbar">
            <div className="flex flex-col w-full h-full">
              <ReportContainer>
                <div className="py-10">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: report,
                    }}></div>
                </div>
              </ReportContainer>
            </div>
          </div>
        </>
      )}
      {isDownload ? (
        <DownloadModal setIsDownload={setIsDownload}>
          <h1 className="whitespace-nowrap border-b-[1px] border-gray-300 w-full pb-2 text-center font-semibold text-xl">
            Download as
          </h1>
          <div className="flex justify-center gap-5">
            <DownloadPdfButton htmlArray={getHtmlArray(report)} prompt={prompt} />
          </div>
        </DownloadModal>
      ) : null}
      {isShare && (
        <ShareEmail
          setIsShare={setIsShare}
          htmlArray={getHtmlArray(report)}
          prompt={prompt}
        />
      )}
    </div>
  );
}
