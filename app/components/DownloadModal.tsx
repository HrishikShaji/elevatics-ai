import { Dispatch, ReactNode, SetStateAction } from "react"
import { IoIosCloseCircle } from "react-icons/io";

interface DownloadModalProps {
  setIsDownload: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function DownloadModal({ setIsDownload, children }: DownloadModalProps) {
  return (

    <div className="fixed z-50 top-0 left-0 h-screen w-full bg-black/70 flex items-center justify-center">
      <div className="relative  p-2 flex flex-col gap-2 bg-white rounded-3xl">
        <button
          onClick={() => setIsDownload(false)}
          className="absolute top-2 right-2">
          <IoIosCloseCircle size={25} />
        </button>
        <div className="flex flex-col gap-5 p-5 items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}
