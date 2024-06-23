
"use client";

import { useState } from "react";
import Spinner from "./svgs/Spinner";
import { FaFilePdf } from "react-icons/fa";
import downloadPdf from "../lib/downloadPdf";

interface DownloadPdfButtonProps {
  htmlArray: string[];
  prompt: string;
}

export default function DownloadPdfButton({ htmlArray, prompt }: DownloadPdfButtonProps) {
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
    <button
      className="bg-black text-white p-3 rounded-full"
      onClick={handleDownload}>
      {downloading ? (
        <div className="w-10">
          <Spinner />
        </div>
      ) : (
        <FaFilePdf />
      )}
    </button>
  );
}
