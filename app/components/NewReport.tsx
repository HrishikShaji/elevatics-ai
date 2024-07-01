"use client"

import { useEffect, useState } from "react"
import { useResearcher } from "../contexts/ResearcherContext"
import fetchReport from "../lib/fetchReport";
import { useSettings } from "../contexts/SettingsContext";
import Spinner from "./svgs/Spinner";
type Subtask = {
  name: string;
  prompt: string;
};

type OriginalData = {
  [key: string]: Subtask[];
};

type TransformedData = {
  parentKey: string;
  name: string;
  prompt: string;
};
export default function NewReport() {
  const { selectedSubtasks } = useResearcher()
  console.log(selectedSubtasks)
  const [loading, setLoading] = useState(false)
  const { reportOptions } = useSettings()
  const [reports, setReports] = useState<any[]>([]);
  const transformData = (data: OriginalData): TransformedData[] => {
    const result: TransformedData[] = [];

    for (const parentKey in data) {
      if (data.hasOwnProperty(parentKey)) {
        data[parentKey].forEach(subtask => {
          result.push({
            parentKey,
            name: subtask.name,
            prompt: subtask.prompt,
          });
        });
      }
    }

    return result;
  };


  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_HFSPACE_TOKEN || "";
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    const transformedData = transformData(selectedSubtasks);

    const fetchData = async () => {
      try {
        setLoading(true)
        const responses = await Promise.all(
          transformedData.map((item) =>
            fetch("https://pvanand-search-generate-staging.hf.space/generate_report", {
              method: "POST",
              cache: "no-store",
              headers: headers,
              body: JSON.stringify({
                topic: item.name,
                description: item.prompt,
                user_id: "",
                user_name: "",
                internet: reportOptions.internet,
                output_format: reportOptions.outputFormat,
                data_format: reportOptions.dataFormat,
              }),
            })
          )
        );

        const data = await Promise.all(responses.map(response => response.json()));
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchData();

  }, [selectedSubtasks, reportOptions]);

  {/*     

  useEffect(() => {
    const transformedData = transformData(selectedSubtasks)
    const fetchData = async () => {
      try {
        setLoading(true)
        const results = await Promise.all(
          transformedData.map((item) =>
            fetchReport({
              title: item.name,
              desc: item.prompt,
              internet: reportOptions.internet,
              dataFormat: reportOptions.dataFormat,
              outputFormat: reportOptions.outputFormat,
            })
          )
        );
        setReports(results);
      } catch (error) {
        console.error("Error fetching reports", error);
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);
*/}


  return <div className="h-full w-full flex items-center justify-center">
    {loading ? <div className="w-10"><Spinner /></div> : null}
  </div>
}
