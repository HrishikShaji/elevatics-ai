import { useCallback, useState } from "react"
import DropDown from "./ui/DropDown";
import { DataFormatType, DropDownItem, OutputFormatType } from "@/types/types";
import { useTheme } from "../contexts/ThemeContext";
import { useSettings } from "../contexts/SettingsContext";
import ToggleButton from "./ui/ToggleButton";

export default function SettingsSection() {
  const [section, setSection] = useState<"appearance" | "customize">("appearance")
  const [isOpen, setIsOpen] = useState(false)
  const { toggleTheme } = useTheme()
  const { setReportOptions, reportOptions } = useSettings()
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

  return (
    <div className="h-[50vh] w-[70vw] flex">
      <div className="w-[30%]  flex flex-col pr-10 border-r-[1px] border-gray-400"
      >
        <button className="w-full p-2 hover:bg-gray-200 text-left border-b-[1px] border-gray-400" onClick={() => setSection("appearance")}>Appearance</button>
        <button className="w-full p-2 hover:bg-gray-200 text-left border-b-[1px] border-gray-400" onClick={() => setSection("customize")} >customize</button>
      </div>
      <div className="w-[70%] ">
        {section === "appearance" ? <div className="w-full h-full p-2">
          <DropDown defaultValue={items[0]} width="150px" onChange={handleChange} title="Theme" items={items} />
        </div> : null}
        {section === "customize" ? <div className="w-full h-full p-2 flex flex-col gap-4">
          <div className="flex gap-10 items-center w-[60%] justify-between">
            <h1>Data Format</h1>

            <DropDown width="250px" defaultValue={dataFormatItems[0]} onChange={dataFormatChange} items={dataFormatItems} />
          </div>
          <div className="flex gap-10 items-center w-[60%] justify-between">
            <h1>Output Format</h1>

            <DropDown width="250px" defaultValue={outputFormatItems[0]} onChange={outputFormatChange} items={outputFormatItems} />
          </div>
          <div className="flex gap-10 items-center w-[60%] justify-between">
            <h1>Internet</h1>
            <div className="w-[250px]">
              <ToggleButton defaultValue={reportOptions.internet} onChange={handleInternet} />
            </div>
          </div>
        </div> : null}
      </div>
    </div>
  )
}
