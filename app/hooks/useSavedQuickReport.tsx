import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchReportFromDatabase } from "../lib/fetchReportFromDatabase";

export default function() {

  const { id } = useParams()
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string>("");
  const [prompt, setPrompt] = useState("")
  const [reportId, setReportId] = useState("")
  const [type, setType] = useState("")
  useEffect(() => {
    async function fetchReport() {
      setLoading(true);
      try {
        const data = await fetchReportFromDatabase(id as string);
        setReport(data.data);
        setPrompt(data.name)
        setReportId(data.id)
        setType(data.reportType)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [id]);



  return { report, loading, prompt, reportId, type }
}
