import { useEffect, useState } from "react";
import generateQuickReport from "../lib/generateQuickReport";
import saveReport from "../lib/saveReport";

export default function(prompt: string) {

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string>("");
  useEffect(() => {
    async function fetchReport() {
      setLoading(true);
      try {
        const data = await generateQuickReport(prompt);

        setReport(data.report);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [prompt]);

  useEffect(() => {
    saveReport({ name: prompt, reportType: "QUICK", report: report });
  }, [report]);

  return { loading, report }
}
