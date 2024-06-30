"use client"

import Slider from "@/app/components/ui/Slider"
import { useInvestor } from "@/app/contexts/InvestorContext"
import { useState } from "react"
import ReactMarkdown from "react-markdown"

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { data } = useInvestor()
  if (!data) return null;
  const sliderData = Object.entries(data.other_info_results)

  function getQueryData({ questions, answers }: { questions: string[], answers: string[] }) {
    const dataLength = questions.length
    const queryData: string[] = []
    Array.from({ length: dataLength }).forEach((_, i) => {
      queryData.push(questions[i])
      queryData.push(answers[i])
    })

    return queryData
  }

  const items = getQueryData({ questions: data.queries, answers: data.query_results })
  console.log(items)
  return (
    <div className="pt-[200px]">
      <div className="h-[70vh] overflow-y-scroll flex custom-scrollbar flex-col px-[240px]">
        {items.map((item, i) => (

          <ReactMarkdown key={i} className="h-full">
            {item}
          </ReactMarkdown>
        ))}

      </div>
      <Slider items={sliderData} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      <div className="h-[70vh] overflow-y-scroll custom-scrollbar flex-col px-[240px]">
        <ReactMarkdown>

          {sliderData[currentIndex][1]}
        </ReactMarkdown>
      </div>
      <div className="px-[240px] flex h-[80vh] gap-10 overflow-y-scroll custom-scrollbar flex-col">{Array.from({ length: data.queries.length }).map((_, i) => (
        <div className="flex bg-green-500 flex-col gap-2 " key={i}>
          <ReactMarkdown>{data.queries[i]}</ReactMarkdown>
          <ReactMarkdown>{data.query_results[i]}</ReactMarkdown>
        </div>
      ))}
        <div className="bg-blue-500">
          {Object.entries(data.other_info_results).map(([k, v], i) => (
            <div className="" key={i}>
              <h1 className="bg-red-500">{k}</h1>
              <h1>{v}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
