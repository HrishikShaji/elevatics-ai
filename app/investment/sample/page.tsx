"use client"

import Spinner from "@/app/components/svgs/Spinner"
import Slider from "@/app/components/ui/Slider"
import { useInvestor } from "@/app/contexts/InvestorContext"
import { useState } from "react"
import ReactMarkdown from "react-markdown"

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const { data, fileName } = useInvestor()
  if (!data) return null;
  const sliderData = Object.entries(data.other_info_results)
  console.log(sliderData)
  function getQueryData({ questions, answers }: { questions: string[], answers: string[] }) {
    const dataLength = questions.length
    const queryData: string[] = []
    Array.from({ length: dataLength }).forEach((_, i) => {
      queryData.push(questions[i])
      queryData.push(answers[i])
    })

    return queryData
  }

  async function downloadPdf() {
    try {
      setLoading(true)
      const response = await fetch("https://nithin1905-pdf.hf.space/generate_pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        const name = fileName.replace(".pdf", "")
        a.href = url;

        a.download = `${name}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        const result = await response.json()
        console.log(result)
        console.error("Failed to generate PDF");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const items = getQueryData({ questions: data.queries, answers: data.query_results })
  const joinedQueries = items.join(" ")
  const firstArray: [string, string] = ["Queries", joinedQueries]
  sliderData.unshift(firstArray)
  return (
    <div className="pt-[100px] ">
      <button onClick={downloadPdf} className="bg-black p-2 rounded-md text-white">{loading ? <div className="w-10"><Spinner /></div>
        : "Download"}</button>
      <Slider items={sliderData} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      <div className="h-[70vh] overflow-y-scroll custom-scrollbar flex-col px-[240px]">
        <ReactMarkdown>

          {sliderData[currentIndex][1]}
        </ReactMarkdown>
      </div>
    </div>
  )
}
