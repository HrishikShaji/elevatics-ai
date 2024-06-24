
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

    <div className="flex gap-3 absolute top-2 right-32">
      <button
        className="text-sm bg-[#EDF0FF] flex text-[#2A42CB] gap-2 rounded-md p-2 items-center justify-center w-[120px]"
        onClick={handleDownload}>
        {downloading ? <div className="w-10"><Spinner /></div> :
          <AiOutlineDownload size={25} />} Download
      </button>
      <button
        onClick={() => setIsShare(true)}
        className="text-sm gap-2 text-gray-500 border-2 border-gray-500 rounded-md p-2 flex items-center justify-center w-[120px]">
        <IoMdShare /> Share
      </button>
    </div>
  )
}
