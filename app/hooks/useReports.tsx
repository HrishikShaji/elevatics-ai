import { FormEvent, useEffect, useRef, useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import fetchReport from "../lib/fetchReport";
import { ReportLoading } from "@/types/types";
import saveReport from "../lib/saveReport";

export default function useReports() {

  const {
    finalTopics,
    reportData,
    setReportData,
    prompt,
    reportLoading,
    setReportLoading,
  } = usePrompt();
  const data = Object.entries(finalTopics);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reportsFetched, setReportsFetched] = useState(false);
  const handlePageChange = (page: number) => {
    setCurrentIndex(page);
  };
  const allReportsFetched = (loadingState: ReportLoading) => {
    return Object.keys(loadingState).length > 0 && Object.values(loadingState).every((topic) =>
      Object.values(topic).every((isLoading) => !isLoading)
    );
  };

  async function fetchReports(
    { title, desc }: { title: string; desc: string },
    parentIndex: string,
    index: string,
  ) {
    try {

      setReportLoading((prev) => ({
        ...prev,
        [parentIndex]: { ...prev[parentIndex], [index]: true },
      }));

      const data = await fetchReport({ title: title, desc: desc });
      setReportData((prev) => ({
        ...prev,
        [parentIndex]: { ...prev[parentIndex], [index]: data },
      }));
    } catch (error) {
      console.log(error)
    } finally {

      setReportLoading((prev) => ({
        ...prev,
        [parentIndex]: { ...prev[parentIndex], [index]: false },
      }));
    }
  }

  useEffect(() => {
    const fetchAllReportsSequentially = async () => {
      for (const [parentIndex, topics] of Object.entries(finalTopics)) {
        if (!reportData[parentIndex]) {
          for (const subtopic of topics) {
            if (!reportData[parentIndex] || !reportData[parentIndex][subtopic.title]) {
              await fetchReports(subtopic, parentIndex, subtopic.title);
            }
          }
        }
      }
    };

    fetchAllReportsSequentially();
  }, []);

  useEffect(() => {
    if (allReportsFetched(reportLoading)) {
      setReportsFetched(true);
    }
  }, [reportLoading]);

  useEffect(() => {
    if (reportsFetched) {
      const report = JSON.stringify(reportData);
      saveReport({ name: prompt, reportType: "FULL", report: report });
    }
  }, [reportsFetched]);

  return { handlePageChange, data, currentIndex }
}
