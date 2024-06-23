"use client";

import { FormEvent, useEffect, useState } from "react";
import { useQuickReport } from "../contexts/QuickReportContext";
import Spinner from "./svgs/Spinner";
import ReportContainer from "./ReportContainer";
import ShareEmail from "./ShareEmail";
import { styledHtml } from "../lib/sample";
import { AiOutlineDownload } from "react-icons/ai";
import { IoIosCloseCircle, IoMdShare } from "react-icons/io";
import generateQuickReport from "../lib/generateQuickReport";
import saveReport from "../lib/saveReport";
import DownloadPdfButton from "./DownloadPdfButton";

export default function QuickReport() {
  const { prompt } = useQuickReport();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string>("");
  const [isShare, setIsShare] = useState(false);
  const [isDownload, setIsDownload] = useState(false);

  useEffect(() => {
    async function fetchReport() {
      setLoading(true);
      try {
        const data = await generateQuickReport(prompt);

        setReport(data.report);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [prompt]);

  useEffect(() => {
    saveReport({ name: prompt, reportType: "QUICK", report: report });
  }, [report]);

  function getHtmlArray() {
    const styledReport = styledHtml(report);
    const htmlArray = [styledReport];
    return htmlArray
  }



  return (
    <div className="h-screen relative w-full text-black flex flex-col justify-end items-center">
      {isDownload ? (
        <div className="fixed z-50 top-0 left-0 h-screen w-full bg-black/70 flex items-center justify-center">
          <div className="relative  p-2 flex flex-col gap-2 bg-white rounded-3xl">
            <button
              onClick={() => setIsDownload(false)}
              className="absolute top-2 right-2">
              <IoIosCloseCircle size={25} />
            </button>
            <div className="flex flex-col gap-5 p-5 items-center justify-center">
              <h1 className="whitespace-nowrap border-b-[1px] border-gray-300 w-full pb-2 text-center font-semibold text-xl">
                Download as
              </h1>
              <div className="flex justify-center gap-5">
                <DownloadPdfButton htmlArray={getHtmlArray()} prompt={prompt} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {isShare && (
        <ShareEmail
          setIsShare={setIsShare}
          prompt={prompt}
          htmlArray={getHtmlArray()}
        />
      )}
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-10">
            <Spinner />
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-3 absolute top-2 right-32">
            <button
              className="text-sm bg-[#EDF0FF] flex text-[#2A42CB] gap-2 rounded-md p-2 items-center justify-center w-[120px]"
              onClick={() => setIsDownload((prev) => !prev)}>
              <AiOutlineDownload size={25} /> Download
            </button>
            <button
              onClick={() => setIsShare(true)}
              className="text-sm gap-2 text-gray-500 border-2 border-gray-500 rounded-md p-2 flex items-center justify-center w-[120px]">
              <IoMdShare /> Share
            </button>
          </div>
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
    </div>
  );
}
