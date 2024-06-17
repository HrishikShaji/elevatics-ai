"use client";

import { FormEvent, useEffect, useState } from "react";
import { useQuickReport } from "../contexts/QuickReportContext";
import Spinner from "./svgs/Spinner";
import ReportContainer from "./ReportContainer";
import ShareEmail from "./ShareEmail";
import { styledHtml } from "../lib/sample";
import { AiOutlineDownload } from "react-icons/ai";
import { IoIosCloseCircle, IoMdShare } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import { TbFileTypeDocx } from "react-icons/tb";

export default function QuickReport() {
  const { prompt } = useQuickReport();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string>("");
  const [email, setEmail] = useState("");
  const [isShare, setIsShare] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function fetchSubTopics() {
      setLoading(true);
      try {
        const token = process.env.NEXT_PUBLIC_HFSPACE_TOKEN || "";
        const headers = {
          Authorization: token,
          "Content-Type": "application/json",
        };
        const response = await fetch(
          "https://pvanand-search-generate.hf.space/generate_report",
          {
            method: "POST",
            headers: headers,
            cache: "no-store",
            body: JSON.stringify({
              topic: "",
              description: prompt,
              user_id: "",
              user_name: "",
              internet: true,
              output_format: "Tabular Report",
              data_format: "No presets",
            }),
          },
        );

        if (!response.ok) {
          throw new Error("Error fetching topics");
        }

        const data = await response.json();
        setReport(data.report);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchSubTopics();
  }, [prompt]);

  async function handleDownload() {
    if (report) {
      const styledReport = styledHtml(report);
      const htmlArray = [styledReport];
      try {
        setDownloading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pdf`, {
          method: "POST",
          body: JSON.stringify({ htmlArray }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "generated.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        } else {
          console.error("Failed to generate PDF");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setDownloading(false);
      }
    }
  }

  async function handleEmail(e: FormEvent) {
    e.preventDefault();
    if (report) {
      try {
        setSending(true);
        const styledReport = styledHtml(report);
        const htmlArray = [styledReport];
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/email`,
          {
            method: "POST",
            body: JSON.stringify({ htmlArray, email }),
            headers: { "Content-Type": "application/json" },
          },
        );

        if (response.ok) {
          console.log("success");
        } else {
          console.error("Failed to send");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSending(false);
      }
    }
  }

  return (
    <div className="h-screen relative w-full text-black flex flex-col justify-end items-center">
      {isDownload ? (
        <div className="fixed z-50 top-0 left-0 h-screen w-full bg-black/70 flex items-center justify-center">
          <div className="relative  p-2 flex flex-col gap-2 bg-white rounded-3xl">
            <button
              onClick={() => setIsDownload(false)}
              className="absolute top-2 right-2"
            >
              <IoIosCloseCircle size={25} />
            </button>
            <div className="flex flex-col gap-5 p-5 items-center justify-center">
              <h1 className="whitespace-nowrap border-b-[1px] border-gray-300 w-full pb-2 text-center font-semibold text-xl">
                Download as
              </h1>
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
                <button className="bg-black text-white p-3 rounded-full">
                  <RiFileExcel2Fill />
                </button>
                <button className="bg-black text-white p-3 rounded-full">
                  <TbFileTypeDocx />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {isShare && (
        <ShareEmail
          loading={sending}
          setIsShare={setIsShare}
          handleEmail={handleEmail}
          email={email}
          setEmail={setEmail}
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
              onClick={() => setIsDownload((prev) => !prev)}
            >
              <AiOutlineDownload size={25} /> Download
            </button>
            <button
              onClick={() => setIsShare(true)}
              className="text-sm gap-2 text-gray-500 border-2 border-gray-500 rounded-md p-2 flex items-center justify-center w-[120px]"
            >
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
                    }}
                  ></div>
                </div>
              </ReportContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
