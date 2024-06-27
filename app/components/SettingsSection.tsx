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

  const topicsItems: DropDownItem[] = [{ label: "1", value: 1 }, { label: "2", value: 2 }, { label: '3', value: 3 }, { label: "4", value: 4 }, { label: "5", value: 5 },
  { label: "6", value: 6 }, { label: '7', value: 7 }, { label: "8", value: 8 }, { label: "9", value: 9 }, { label: "10", value: 10 }
  ]
  const subTopicsItems: DropDownItem[] = [{ label: "1", value: 1 }, { label: "2", value: 2 }, { label: '3', value: 3 }, { label: "4", value: 4 }, { label: "5", value: 5 },
  { label: "6", value: 6 }, { label: '7', value: 7 }, { label: "8", value: 8 }, { label: "9", value: 9 }, { label: "10", value: 10 }
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

  function topicsLimitChange(item: DropDownItem) {
    setTopicsLimit(prev => ({
      ...prev,
      topics: item.value as number
    }))
  }
  function subTopicsLimitChange(item: DropDownItem) {
    setTopicsLimit(prev => ({
      ...prev,
      subTopics: item.value as number
    }))
  }

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


  function getCurrentTopicsLimit() {
    return topicsItems.find(item => item.value === topicsLimit.topics)
  }
  function getCurrentSubTopicsLimit() {
    return subTopicsItems.find(item => item.value === topicsLimit.subTopics)
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
    <div className="h-[50vh] w-[70vw] flex flex-col sm:flex-row">
      <div className="sm:w-[30%]  flex sm:flex-col flex-row "
      >
        <button className="w-full p-2  text-left text-xl" style={{ color: section === "appearance" ? "black" : "gray" }} onClick={() => setSection("appearance")}>Appearance</button>
        <button className="w-full p-2  text-left text-xl" style={{ color: section === "customize" ? "black" : "gray" }} onClick={() => setSection("customize")} >Customize</button>
      </div>
      <div className="sm:w-[70%] w-full">
        {section === "appearance" ? <div className="w-full  sm:border-l-[2px] border-gray-200 flex flex-col gap-4 p-2">
          <div className="flex sm:gap-10 sm:items-center w-full sm:w-[60%] sm:justify-between flex-col sm:flex-row">
            <h1 >Theme</h1>

            <DropDown defaultValue={getCurrentThemeValue() as DropDownItem} width="250px" onChange={handleChange} items={items} />
          </div>
        </div> : null}
        {section === "customize" ? <div className="w-full  sm:border-l-[2px] border-gray-200  p-2 flex flex-col gap-4">
          <div className="flex sm:gap-10 sm:items-center w-full sm:w-[60%] sm:justify-between flex-col sm:flex-row">
            <h1 >Data Format</h1>

            <DropDown width="250px" defaultValue={getCurrentDataFormat() as DropDownItem} onChange={dataFormatChange} items={dataFormatItems} />
          </div>
          <div className="flex sm:gap-10 sm:items-center w-full sm:w-[60%] sm:justify-between flex-col sm:flex-row">
            <h1>Output Format</h1>

            <DropDown width="250px" defaultValue={getCurrentOutputFormat() as DropDownItem} onChange={outputFormatChange} items={outputFormatItems} />
          </div>
          <div className="flex gap-10 items-center w-[60%] justify-between">
            <h1>Internet</h1>
            <div className="w-[250px]">
              <ToggleButton defaultValue={reportOptions.internet} onChange={handleInternet} />
            </div>
          </div>
          <div className="flex sm:gap-10 sm:items-center w-full sm:w-[60%] sm:justify-between flex-col sm:flex-row">
            <h1>Topics Limit</h1>
            <DropDown width="250px" defaultValue={getCurrentTopicsLimit() as DropDownItem} onChange={topicsLimitChange} items={topicsItems} />
          </div>
          <div className="flex sm:gap-10 sm:items-center w-full sm:w-[60%] sm:justify-between flex-col sm:flex-row">
            <h1>SubTopics Limit</h1>
            <DropDown width="250px" defaultValue={getCurrentSubTopicsLimit() as DropDownItem} onChange={subTopicsLimitChange} items={subTopicsItems} />
          </div>
        </div> : null}
      </div>
    </div>
  )
}
