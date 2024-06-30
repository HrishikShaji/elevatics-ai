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

  console.log(sliderData[currentIndex][1])
  return (
    <div className="pt-[200px]">
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
