import { Dispatch, SetStateAction } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { IoMdShare } from "react-icons/io";

interface ReportActionsProps {
  setIsDownload: Dispatch<SetStateAction<boolean>>;
  setIsShare: Dispatch<SetStateAction<boolean>>;
}

export default function ReportActions({ setIsShare, setIsDownload }: ReportActionsProps) {
  return (

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
  )
}
