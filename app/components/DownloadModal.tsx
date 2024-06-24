import { Dispatch, ReactNode, SetStateAction } from "react"
import { IoIosCloseCircle } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

interface DownloadModalProps {
  setIsDownload: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function DownloadModal({ setIsDownload, children }: DownloadModalProps) {
  return (

    <div className="fixed z-50 top-0 left-0 h-screen w-full bg-black/70 flex items-center justify-center">
      <div className="relative h-[50vh] w-[60vw]  p-2 flex flex-col gap-2 bg-white rounded-md">
        <button
          onClick={() => setIsDownload(false)}
          className="absolute text-black p-2 rounded-md bg-gray-300 -top-3 -right-3"
        >
          <IoCloseOutline size={20} />
        </button>
        <div className="flex flex-col gap-5 p-5 items-start justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}
