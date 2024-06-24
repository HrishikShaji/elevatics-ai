import { FormEvent, useEffect, useRef, useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import fetchReport from "../lib/fetchReport";
import { ReportLoading } from "@/types/types";
import saveReport from "../lib/saveReport";
import { extractReports } from "../lib/utils";
import { Report } from "@prisma/client";
import { useSettings } from "../contexts/SettingsContext";

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
  const [reportsFetched, setReportsFetched] = useState(false);
  const [savedReport, setSavedReport] = useState<Report | null>(null)
  const allReportsFetched = (loadingState: ReportLoading) => {
    return Object.keys(loadingState).length > 0 && Object.values(loadingState).every((topic) =>
      Object.values(topic).every((isLoading) => !isLoading)
    );
  };
  const { reportOptions } = useSettings()

  const [selectedReports, setSelectedReports] = useState<
    Record<string, boolean>
  >({});


  const handleReportSelection = (report: string) => {
    setSelectedReports((prev) => ({
      ...prev,
      [report]: !prev[report],
    }));
  };

  function getHtmlArray(selectedReports: Record<string, boolean>) {

    const selectedTopics = Object.entries(selectedReports).filter(
      ([key, value]) => value === true,
    );
    const topics = selectedTopics.map(([key]) => key);
    const reportsToDownload = Object.keys(reportData)
      .filter((key) => topics.includes(key))
      .reduce(
        (obj, key) => {
          obj[key] = reportData[key];
          return obj;
        },
        {} as Record<string, any>,
      );

    const htmlArray = extractReports(reportsToDownload);
    return htmlArray

  }
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

      const data = await fetchReport({ internet: reportOptions.internet, dataFormat: reportOptions.dataFormat, outputFormat: reportOptions.outputFormat, title: title, desc: desc });
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
    const fetchSavedReport = async () => {
      try {
        const report = JSON.stringify(reportData);
        const result = await saveReport({ name: prompt, reportType: "FULL", report: report });
        setSavedReport(result);
      } catch (error) {
        console.error("Error saving report:", error);
      }
    };

    if (reportsFetched) {
      fetchSavedReport()
    }
  }, [reportsFetched]);

  return { data, selectedReports, handleReportSelection, getHtmlArray, savedReport }
}
