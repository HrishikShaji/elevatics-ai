import { useEffect, useState, useRef } from "react";
import ReportContainer from "./ReportContainer";
import Spinner from "./svgs/Spinner";

interface SingleReportProps {
  title: string;
  desc: string;
  hasFetched: boolean;
  markAsFetched: () => void;
  parentIndex: number;
}

const SingleReport: React.FC<SingleReportProps> = ({
  title,
  desc,
  hasFetched,
  markAsFetched,
  parentIndex,
}) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");

  const fetchedReportsRef = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    const reportKey = `${parentIndex}-${title}-${desc}`;

    if (fetchedReportsRef.current.has(reportKey)) {
      setReport(fetchedReportsRef.current.get(reportKey) || "");
      return;
    }

    async function fetchReports() {
      try {
        setLoading(true);
        const token = process.env.NEXT_PUBLIC_HFSPACE_TOKEN || "";
        const headers = {
          Authorization: token,
          "Content-Type": "application/json",
        };
        const response = await fetch(
          "https://pvanand-generate-subtopics.hf.space/generate_report",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              topic: title,
              description: desc,
            }),
          },
        );
        const reportData = await response.json();

        fetchedReportsRef.current.set(reportKey, reportData.report);
        setReport(reportData.report);
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setLoading(false);
      }
    }

    setReport("");
    fetchReports();
  }, [title, desc, parentIndex]);

  return (
    <div className="mt-5 bg-white ">
      <div className="flex  w-full custom-scrollbar h-[540px] overflow-y-scroll">
        {loading ? (
          <div className="w-10">
            <Spinner />
          </div>
        ) : (
          <ReportContainer>
            <div
              className="w-full flex flex-col gap-5 pr-5"
              dangerouslySetInnerHTML={{ __html: report }}
            ></div>
          </ReportContainer>
        )}
      </div>
    </div>
  );
};

export default SingleReport;
