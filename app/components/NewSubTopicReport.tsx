import Link from "next/link";
import { RxArrowTopRight } from "react-icons/rx";
import { usePrompt } from "../contexts/PromptContext";
import ReportContainer from "./ReportContainer";
import Spinner from "./svgs/Spinner";
import { getHostname } from "../lib/utils";

type TopicType = {
  title: string;
  desc: string;
};

interface SubTopicReportProps {
  title: string;
  currentTopic: TopicType[];
  parentIndex: string;
}

export default function NewSubTopicReport({
  title,
  currentTopic,
  parentIndex,
}: SubTopicReportProps) {
  const { reportContainerRef, reportData, reportLoading } = usePrompt();
  const hasFetchStarted = Object.keys(reportLoading).find(
    (key) => key === parentIndex
  );

  return (
    <div
      className=" px-10 sm:px-32 h-[85vh] sm:h-[60vh] overflow-y-scroll custom-scrollbar"
      ref={reportContainerRef}>
      <div className="flex flex-col w-full h-full  ">
        {currentTopic.map((item, i) => (
          <ReportContainer key={i}>
            {!hasFetchStarted ? (
              <div className="w-10">
                <Spinner />
              </div>
            ) : null}
            {reportLoading[parentIndex]?.[item.title] ? (
              <div className="w-10">
                <Spinner />
              </div>
            ) : (
              reportData[parentIndex]?.[item.title] && (
                <div className="py-20">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: reportData[parentIndex][item.title].report,
                    }}></div>
                  <div className="flex flex-col gap-2 mt-10">
                    {Object.keys(
                      reportData[parentIndex][item.title].references
                    ).map((key, i) => (<a key={i} href={key} className="cursor-pointer flex gap-3 items-center hover:text-blue-500" target="_blank" rel="noopener noreferrer">
                      {key ? (<>{getHostname(key)} < RxArrowTopRight /></>) : null}</a>
                    ))}
                  </div>
                </div>
              )
            )}
          </ReportContainer>
        ))}
      </div>
    </div>
  );
}
