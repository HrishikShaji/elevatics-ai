"use client";
import { AiOutlineDownload } from "react-icons/ai";
import { IoMdShare } from "react-icons/io";
import { useRef, useState, useEffect, FormEvent } from "react";
import { usePrompt } from "../contexts/PromptContext";
import { IoIosCloseCircle } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa6";
import ShareEmail from "./ShareEmail";
import Spinner from "./svgs/Spinner";
import sendEmail from "../lib/sendEmail";
import downloadPdf from "../lib/downloadPdf";
import { extractReports, scrollLeft, scrollRight } from "../lib/utils";
import { Record } from "@prisma/client/runtime/library";
import { useParams } from "next/navigation";
import { fetchReportFromDatabase } from "../lib/fetchReportFromDatabase";
import ReportContainer from "./ReportContainer";
import Slider from "./ui/Slider";

export default function SavedFinalReport() {
  const { id } = useParams();

  const { reportData, prompt } = usePrompt();
  const [isDownload, setIsDownload] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [selectedReports, setSelectedReports] = useState<
    Record<string, boolean>
  >({});
  const [report, setReport] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    async function fetchReport() {
      setLoading(true);
      try {
        const data = await fetchReportFromDatabase(id as string);
        const savedReport = JSON.parse(data.data);
        console.log(savedReport);
        setReport(savedReport);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [id]);

  const handleReportSelection = (report: string) => {
    setSelectedReports((prev) => ({
      ...prev,
      [report]: !prev[report],
    }));
  };

  function getHtmlArray(selectedReports: Record<string, boolean>) {
    const selectedTopics = Object.entries(selectedReports).filter(
      ([key, value]) => value === true,
    );
    const topics = selectedTopics.map(([key]) => key);
    const reportsToDownload = Object.keys(reportData)
      .filter((key) => topics.includes(key))
      .reduce(
        (obj, key) => {
          obj[key] = reportData[key];
          return obj;
        },
        {} as Record<string, any>,
      );

    const htmlArray = extractReports(reportsToDownload);
    return htmlArray;
  }

  async function handleDownload() {
    try {
      console.log("clicked");
      setDownloading(true);
      await downloadPdf({ htmlArray: getHtmlArray(selectedReports), prompt: prompt });
    } catch (error) {
      console.log(error);
    } finally {
      setDownloading(false);
    }
  }

  async function handleEmail(e: FormEvent) {
    e.preventDefault();
    try {
      setSending(true);
      await sendEmail({ htmlArray: getHtmlArray(selectedReports), email: email, prompt: prompt });
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col justify-end relative items-center">
      <div className="flex gap-2 absolute top-3 right-20">
        <div className="relative">
          <button
            className="text-sm bg-[#EDF0FF] flex text-[#2A42CB] gap-2 rounded-md p-2 items-center justify-center w-[120px]"
            onClick={() => setIsDownload((prev) => !prev)}
          >
            <AiOutlineDownload size={25} /> Download
          </button>
          {isDownload ? (
            <div className="fixed z-50 top-0 left-0 h-screen w-full bg-black/70 flex items-center justify-center">
              <div className="relative p-2 flex flex-col gap-2 bg-white rounded-3xl">
                <button
                  onClick={() => setIsDownload(false)}
                  className="absolute top-2 right-2"
                >
                  <IoIosCloseCircle size={25} />
                </button>
                <div className="flex flex-col gap-5 p-5 items-center justify-center">
                  <h1 className="whitespace-nowrap border-b-[1px] border-gray-300 w-full pb-2 text-center font-semibold text-xl">
                    Select Reports
                  </h1>
                  <div className="flex flex-col gap-1 p-5">
                    {Object.keys(reportData).map((key, i) => (
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
                  <div className="flex justify-center gap-5">
                    <button
                      className="bg-black text-white p-3 rounded-full"
                      onClick={handleDownload}
                    >
                      {downloading ? (
                        <div className="w-10">
                          <Spinner />
                        </div>
                      ) : (
                        <FaFilePdf />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <button
          onClick={() => setIsShare(true)}
          className="text-sm gap-2 text-gray-500 border-2 border-gray-500 rounded-md p-2 flex items-center justify-center w-[120px]"
        >
          <IoMdShare /> Share
        </button>
        {isShare ? (
          <ShareEmail
            setIsShare={setIsShare}
            loading={sending}
            email={email}
            setEmail={setEmail}
            handleEmail={handleEmail}
          />
        ) : null}
      </div>
      <div className="flex flex-col h-[700px] justify-between items-center w-full">
        <Slider items={Object.entries(report)} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        <div
          className="relative px-28 w-full h-[630px] flex flex-col overflow-y-scroll custom-scrollbar"
        >
          <div className="flex flex-col w-full h-full">
            {Object.entries(report).map((item, i) => (
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
    </div>
  );
}
