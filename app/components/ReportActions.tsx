import { Dispatch, SetStateAction } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { IoMdShare } from "react-icons/io";

interface ReportActionsProps {
  setIsDownload: Dispatch<SetStateAction<boolean>>;
  setIsShare: Dispatch<SetStateAction<boolean>>;
}

export default function ReportActions({ setIsShare, setIsDownload }: ReportActionsProps) {
  return (

    <div className="flex gap-3 absolute bottom-10 right-6 sm:right-32">
      <button
        className="text-sm sm:bg-[#f9f8fb] flex text-gray-500 hover:bg-gray-100 gap-2 rounded-md sm:p-2 items-center justify-center sm:w-[120px]"
        onClick={() => setIsDownload((prev) => !prev)}>
        <AiOutlineDownload size={25} /><span className="hidden sm:block">Download</span>
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
