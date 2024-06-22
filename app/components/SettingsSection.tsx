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
      <div className="w-[30%] bg-gray-100 flex flex-col"
      >
        <button className="w-full p-2 hover:bg-gray-200 text-left" onClick={() => setSection("appearance")}>Appearance</button>
        <button className="w-full p-2 hover:bg-gray-200 text-left" onClick={() => setSection("customize")} >customize</button>
      </div>
      <div className="w-[70%] ">
        {section === "appearance" ? <div className="w-full h-full p-2">
          <DropDown defaultValue={items[0]} width="150px" onChange={handleChange} title="Theme" items={items} />
        </div> : null}
        {section === "customize" ? <div className="w-full h-full flex flex-col gap-1">
          <DropDown width="250px" defaultValue={dataFormatItems[0]} onChange={dataFormatChange} title="Data Format" items={dataFormatItems} />
          <DropDown width="250px" defaultValue={outputFormatItems[0]} onChange={outputFormatChange} title="Output Format" items={outputFormatItems} />
          <div className="flex gap-2 items-center">
            <h1>Internet</h1>
            <ToggleButton defaultValue={reportOptions.internet} onChange={handleInternet} />
          </div>
        </div> : null}
      </div>
    </div>
  )
}
