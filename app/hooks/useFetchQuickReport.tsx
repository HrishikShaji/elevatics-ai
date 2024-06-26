import { useEffect, useState } from "react";
import generateQuickReport from "../lib/generateQuickReport";
import saveReport from "../lib/saveReport";
import { Report } from "@prisma/client";
import { useSettings } from "../contexts/SettingsContext";
import { useUser } from "../contexts/UserContext";

export default function(prompt: string) {

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string>("");
  const { reportOptions } = useSettings()
  const [references, setReferences] = useState({})
  const { setRefetch } = useUser()
  const [savedReport, setSavedReport] = useState<Report | null>(null);
  useEffect(() => {
    async function fetchReport() {
      setLoading(true);
      try {
        const data = await generateQuickReport({ prompt: prompt, internet: reportOptions.internet, outputFormat: reportOptions.outputFormat, dataFormat: reportOptions.dataFormat });

        setReport(data.report);
        setReferences(data.references)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setRefetch(prev => !prev)
      }
    }

    fetchReport();
  }, [prompt]);

  useEffect(() => {
    const fetchSavedReport = async () => {
      try {
        const result = await saveReport({ name: prompt, reportType: "QUICK", report: report });
        setSavedReport(result);
      } catch (error) {
        console.error("Error saving report:", error);
      }
    };

    if (report) {
      fetchSavedReport()
    }
  }, [report]);

  return { loading, report, savedReport, references }
}
