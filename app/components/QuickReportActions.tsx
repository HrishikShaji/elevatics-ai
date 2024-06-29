
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { IoMdShare } from "react-icons/io";
import downloadPdf from "../lib/downloadPdf";
import Spinner from "./svgs/Spinner";

interface QuickReportActionsProps {
  setIsShare: Dispatch<SetStateAction<boolean>>;
  htmlArray: string[];
  prompt: string;
}

export default function QuickReportActions({ setIsShare, htmlArray, prompt }: QuickReportActionsProps) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    try {
      setDownloading(true);
      await downloadPdf({ htmlArray: htmlArray, prompt: prompt });
    } catch (error) {
      console.log(error);
    } finally {
      setDownloading(false);
    }
  }
  return (

    <div className="flex gap-3 absolute top-20 right-6 sm:right-[260px]">
      <button
        className="text-sm sm:bg-[#f9f8fb] flex text-gray-500 hover:bg-gray-100 gap-2 rounded-md sm:p-2 items-center justify-center sm:w-[120px]"
        onClick={handleDownload}>
        {downloading ? <div className="w-10"><Spinner /></div> :
          <AiOutlineDownload size={25} />}<span className="hidden sm:block">Download</span>
      </button>
      <button
        onClick={() => setIsShare(true)}

        className="text-sm sm:bg-[#f9f8fb] flex text-gray-500 hover:bg-gray-100 gap-2 rounded-md sm:p-2 items-center justify-center sm:w-[120px]"
      >
        <IoMdShare size={25} /> <span className="hidden sm:block">Share</span>
      </button>
    </div>
  )
}
