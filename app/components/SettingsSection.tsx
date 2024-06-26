import { useCallback, useState } from "react"
import DropDown from "./ui/DropDown";
import { DataFormatType, DropDownItem, OutputFormatType } from "@/types/types";
import { useTheme } from "../contexts/ThemeContext";
import { useSettings } from "../contexts/SettingsContext";
import ToggleButton from "./ui/ToggleButton";
import BasicButtonExample from "./ui/DropDownExample";

export default function SettingsSection() {
  const [section, setSection] = useState<"appearance" | "customize">("appearance")
  const [isOpen, setIsOpen] = useState(false)
  const { toggleTheme, theme, themeName } = useTheme()
  const { setReportOptions, reportOptions, topicsLimit, setTopicsLimit } = useSettings()
  const items: DropDownItem[] = [
    { label: "Light", value: "light" }, { label: "Dark", value: "dark" }
  ]

  const dataFormatItems: DropDownItem[] = [
    { label: "No Presets", value: "No presets" }, { label: "Structured Data", value: "Structured data" }, { label: "Quantitative Data", value: "Quantitative data" }
  ]

  const outputFormatItems: DropDownItem[] = [
    { label: "Chat", value: "chat" }, { label: "Report", value: "report" }, { label: "Report Table", value: "report_table" }
  ]
  const handleInternet = useCallback((value: boolean) => {
    setReportOptions(prev => ({
      ...prev,
      internet: value
    }));
  }, []);



  function dataFormatChange(item: DropDownItem) {
    setReportOptions(prev => ({
      ...prev,
      dataFormat: item.value as DataFormatType
    }))
  }

  function outputFormatChange(item: DropDownItem) {
    setReportOptions(prev => ({
      ...prev,
      outputFormat: item.value as OutputFormatType
    }))
  }
  function handleChange(item: DropDownItem) {
    toggleTheme(item.value as "light" | "dark")
  }

  function getCurrentDataFormat() {
    return dataFormatItems.find(item => item.value === reportOptions.dataFormat)
  }

  function getCurrentOutputFormat() {
    return outputFormatItems.find(item => item.value === reportOptions.outputFormat)
  }

  function getCurrentThemeValue() {
    return items.find(item => item.value === themeName)
  }

  return (
    <div className="h-[50vh] w-[70vw] flex">
      <div className="w-[30%]  flex flex-col "
      >
        <button className="w-full p-2  text-left text-xl" style={{ color: section === "appearance" ? "black" : "gray" }} onClick={() => setSection("appearance")}>Appearance</button>
        <button className="w-full p-2  text-left text-xl" style={{ color: section === "customize" ? "black" : "gray" }} onClick={() => setSection("customize")} >Customize</button>
      </div>
      <div className="w-[70%] ">
        {section === "appearance" ? <div className="w-full flex flex-col gap-4 h-full p-2">
          <div className="flex gap-10 items-center w-[60%] justify-between">
            <h1>Theme</h1>

            <DropDown defaultValue={getCurrentThemeValue() as DropDownItem} width="150px" onChange={handleChange} items={items} />
          </div>
        </div> : null}
        {section === "customize" ? <div className="w-full  border-l-[2px] border-gray-200 pl-5 p-2 flex flex-col gap-4">
          <div className="flex gap-10 items-center w-[60%] justify-between">
            <h1>Data Format</h1>

            <DropDown width="250px" defaultValue={getCurrentDataFormat() as DropDownItem} onChange={dataFormatChange} items={dataFormatItems} />
          </div>
          <div className="flex gap-10 items-center w-[60%] justify-between">
            <h1>Output Format</h1>

            <DropDown width="250px" defaultValue={getCurrentOutputFormat() as DropDownItem} onChange={outputFormatChange} items={outputFormatItems} />
          </div>
          <div className="flex gap-10 items-center w-[60%] justify-between">
            <h1>Internet</h1>
            <div className="w-[250px]">
              <ToggleButton defaultValue={reportOptions.internet} onChange={handleInternet} />
            </div>
          </div>
          <div className="flex gap-10 items-center w-[60%] justify-between">
            <h1>Topics Limit</h1>
            <input
              className="w-[250px] border-gray-200 border-[2px]  p-1 pl-5 rounded-xl focus:outline-none"
              value={topicsLimit.topics}
              type="number"
              onChange={(e) => setTopicsLimit(prev => ({
                ...prev,
                topics: parseInt(e.target.value, 10)
              }))}
            />
          </div>
          <div className="flex gap-10 items-center w-[60%] justify-between">
            <h1>SubTopics Limit</h1>
            <input
              className="w-[250px] border-gray-200 border-[2px]  p-1 pl-5 rounded-xl focus:outline-none"
              value={topicsLimit.subTopics}
              type="number"
              onChange={(e) => setTopicsLimit(prev => ({
                ...prev,
                subTopics: parseInt(e.target.value, 10)
              }))}
            />
          </div>
        </div> : null}
      </div>
    </div>
  )
}
