import { useEffect } from "react";
import ReportContainer from "./ReportContainer";
import Spinner from "./svgs/Spinner";
import { useReports } from "../contexts/ReportsContext";

type TopicType = {
  title: string;
  desc: string;
};

interface SubTopicReportProps {
  title: string;
  currentTopic: TopicType[];
  parentIndex: number;
}

const SubTopicReport: React.FC<SubTopicReportProps> = ({
  title,
  currentTopic,
  parentIndex,
}) => {
  const { reportsData, setReportsData, loading, setLoading } = useReports();

  const fetchSubTopics = async (
    { title, desc }: { title: string; desc: string },
    index: number,
  ) => {
    setLoading((prev) => ({
      ...prev,
      [parentIndex]: { ...prev[parentIndex], [index]: true },
    }));

    const token = process.env.NEXT_PUBLIC_HFSPACE_TOKEN || "";
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "https://pvanand-search-generate.hf.space/generate_report",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          query: title,
          description: desc,
          user_id: "",
          user_name: "",
          internet: true,
          output_format: "Tabular Report",
          data_format: "Structured data",
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Error fetching topics");
    }

    const data = await response.json();
    setReportsData((prev) => ({
      ...prev,
      [parentIndex]: { ...prev[parentIndex], [index]: data },
    }));

    setLoading((prev) => ({
      ...prev,
      [parentIndex]: { ...prev[parentIndex], [index]: false },
    }));
  };

  useEffect(() => {
    const fetchAllReportsSequentially = async () => {
      if (!reportsData[parentIndex]) {
        for (let i = 0; i < currentTopic.length; i++) {
          await fetchSubTopics(
            { title: currentTopic[i].title, desc: currentTopic[i].desc },
            i,
          );
        }
      }
    };

    fetchAllReportsSequentially();
  }, [currentTopic, parentIndex, reportsData]);

  return (
    <div className="relative w-full h-[600px] overflow-y-scroll custom-scrollbar">
      {currentTopic.map((_, i) => (
        <ReportContainer key={i}>
          {loading[parentIndex]?.[i] ? (
            <div className="w-10">
              <Spinner />
            </div>
          ) : (
            reportsData[parentIndex]?.[i] && (
              <div
                dangerouslySetInnerHTML={{
                  __html: reportsData[parentIndex][i].report,
                }}
                className="flex flex-col gap-5"
              ></div>
            )
          )}
        </ReportContainer>
      ))}
    </div>
  );
};

export default SubTopicReport;
