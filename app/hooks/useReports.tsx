import { FormEvent, useEffect, useRef, useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import fetchReport from "../lib/fetchReport";
import { extractReports } from "../lib/utils";
import downloadPdf from "../lib/downloadPdf";
import sendEmail from "../lib/sendEmail";

export default function useReports() {

  const {
    finalTopics,
    reportData,
    setReportData,
    prompt,
    setReportLoading,
  } = usePrompt();
  const data = Object.entries(finalTopics);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePageChange = (page: number) => {
    setCurrentIndex(page);
  };


  async function fetchSubTopics(
    { title, desc }: { title: string; desc: string },
    parentIndex: string,
    index: string,
  ) {
    setReportLoading((prev) => ({
      ...prev,
      [parentIndex]: { ...prev[parentIndex], [index]: true },
    }));

    const data = await fetchReport({ title: title, desc: desc });
    setReportData((prev) => ({
      ...prev,
      [parentIndex]: { ...prev[parentIndex], [index]: data },
    }));
    setReportLoading((prev) => ({
      ...prev,
      [parentIndex]: { ...prev[parentIndex], [index]: false },
    }));
  }

  useEffect(() => {
    const fetchAllReportsSequentially = async () => {
      for (const [parentIndex, topics] of Object.entries(finalTopics)) {
        if (!reportData[parentIndex]) {
          for (const subtopic of topics) {
            await fetchSubTopics(subtopic, parentIndex, subtopic.title);
          }
        }
      }
    };

    fetchAllReportsSequentially();
  }, [finalTopics]);

  return { handlePageChange, data, currentIndex }
}
