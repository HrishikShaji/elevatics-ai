import { useState } from "react"
import DropDown from "./ui/DropDown";
import { DropDownItem } from "@/types/types";
import { useTheme } from "../contexts/ThemeContext";

export default function SettingsSection() {
  const [section, setSection] = useState<"appearance" | "customize">("appearance")
  const [isOpen, setIsOpen] = useState(false)
  const { toggleTheme } = useTheme()
  const items: DropDownItem[] = [
    { label: "Light", value: "light" }, { label: "Dark", value: "dark" }
  ]

  function handleChange(item: DropDownItem) {
    console.log(item)
    toggleTheme(item.value as "light" | "dark")
  }

  return (
    <div className="h-[50vh] w-[70vw] flex">
      <div className="w-[30%] bg-gray-100 flex flex-col"
      >
        <button className="w-full p-2 hover:bg-gray-200 text-left" onClick={() => setSection("appearance")}>Appearance</button>
        <button className="w-full p-2 hover:bg-gray-200 text-left" onClick={() => setSection("customize")} >customize</button>
      </div>
      <div className="w-[70%] bg-gray-200">
        {section === "appearance" ? <div className="w-full h-full p-2">
          <DropDown onChange={handleChange} title="Theme" items={items} />
        </div> : null}
        {section === "customize" ? <div></div> : null}
      </div>
    </div>
  )
}
