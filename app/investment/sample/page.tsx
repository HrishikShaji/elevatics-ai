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
  console.log("this is data", data)
  console.log(JSON.stringify(data))
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
        console.log("the name is", name)
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
  console.log(items)
  return (
    <div className="pt-[200px]">
      <button onClick={downloadPdf} className="bg-black p-2 rounded-md text-white">{loading ? <div className="w-10"><Spinner /></div>
        : "Download"}</button>
      <div className="h-[70vh] overflow-y-scroll flex custom-scrollbar flex-col px-[240px]">
        {items.map((item, i) => (

          <ReactMarkdown key={i} className="h-full">
            {item}
          </ReactMarkdown>
        ))}

        <Slider items={sliderData} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        <div className="h-[70vh] overflow-y-scroll custom-scrollbar flex-col px-[240px]">
          <ReactMarkdown>

            {sliderData[currentIndex][1]}
          </ReactMarkdown>
        </div>
        <div className="">{Array.from({ length: data.queries.length }).map((_, i) => (
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
    </div>
  )
}
