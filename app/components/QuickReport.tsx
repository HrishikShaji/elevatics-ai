"use client";

import { useState } from "react";
import { useQuickReport } from "../contexts/QuickReportContext";
import Spinner from "./svgs/Spinner";
import ReportContainer from "./ReportContainer";
import ShareEmail from "./ShareEmail";
import useFetchQuickReport from "../hooks/useFetchQuickReport";
import { getHostname, getHtmlArray } from "../lib/utils";
import QuickReportActions from "./QuickReportActions";
import { RxArrowTopRight } from "react-icons/rx";

export default function QuickReport() {
  const { prompt } = useQuickReport();
  const [isShare, setIsShare] = useState(false);
  const { loading, report, savedReport, references } = useFetchQuickReport(prompt)
  return (
    <div className="h-screen  relative w-full text-black flex flex-col justify-end items-center">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-10">
            <Spinner />
          </div>
        </div>
      ) : (
        <>
          <QuickReportActions setIsShare={setIsShare} htmlArray={getHtmlArray(report)} prompt={prompt} />
          <ReportContainer>
            <div className="py-10 px-10 sm:px-28 h-[90vh] sm:h-[85vh] overflow-y-scroll custom-scrollbar">
              <div
                className="h-full"
                dangerouslySetInnerHTML={{
                  __html: report,
                }}></div>
              <div className="flex flex-col gap-2 mt-10 h-full">
                {Object.keys(
                  references
                ).map((key, i) => (<a key={i} href={key} className="cursor-pointer flex gap-3 items-center hover:text-blue-500" target="_blank" rel="noopener noreferrer">
                  {key ? (<>{getHostname(key)} < RxArrowTopRight /></>) : null}</a>
                ))}
              </div>
            </div>
          </ReportContainer>
        </>
      )}
      {isShare && savedReport ? (
        <ShareEmail
          id={savedReport.id}
          type={savedReport.reportType}
          setIsShare={setIsShare}
          prompt={prompt}
          htmlArray={getHtmlArray(report)}
        />
      ) : null}
    </div>
  );
}
