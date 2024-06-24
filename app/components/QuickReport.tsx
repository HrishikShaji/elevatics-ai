"use client";

import { useState } from "react";
import { useQuickReport } from "../contexts/QuickReportContext";
import Spinner from "./svgs/Spinner";
import ReportContainer from "./ReportContainer";
import ShareEmail from "./ShareEmail";
import useFetchQuickReport from "../hooks/useFetchQuickReport";
import { getHtmlArray } from "../lib/utils";
import QuickReportActions from "./QuickReportActions";

export default function QuickReport() {
  const { prompt } = useQuickReport();
  const [isShare, setIsShare] = useState(false);
  const { loading, report, savedReport } = useFetchQuickReport(prompt)
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
          <div className="relative px-28 w-full  h-[660px] flex flex-col overflow-y-scroll custom-scrollbar">
            <div className="flex flex-col w-full h-full ">
              <ReportContainer>
                <div className="py-10 ">
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
