import { ReportData } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchReportFromDatabase } from "../lib/fetchReportFromDatabase";
import { extractReports } from "../lib/utils";

export default function useSavedFullReport() {

  const { id } = useParams();
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false);
  const [selectedReports, setSelectedReports] = useState<
    Record<string, boolean>
  >({});
  const [report, setReport] = useState<ReportData>({});


  useEffect(() => {
    async function fetchReport() {
      setLoading(true);
      try {
        const data = await fetchReportFromDatabase(id as string);
        const savedReport = JSON.parse(data.data);
        setPrompt(data.name)
        setReport(savedReport);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [id]);

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
    const reportsToDownload = Object.keys(report)
      .filter((key) => topics.includes(key))
      .reduce(
        (obj, key) => {
          obj[key] = report[key];
          return obj;
        },
        {} as Record<string, any>,
      );

    const htmlArray = extractReports(reportsToDownload);
    return htmlArray;
  }

  return { report, getHtmlArray, handleReportSelection, selectedReports, prompt, loading }
}
