
import { DropDownItem } from "@/types/types";
import { useState } from "react"
import { BiDownArrow, BiUpArrow } from "react-icons/bi";


interface DropDownProps {
  width: string;
  title: string;
  items: DropDownItem[];
  defaultValue: DropDownItem;
  onChange: (item: DropDownItem) => void;
}

export default function DropDown({ defaultValue, width, title, items, onChange }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DropDownItem>(defaultValue)



  function handleSelect(item: DropDownItem) {
    setSelectedItem(item);
    onChange(item)
    setIsOpen(false)
  }

  return (
    <div className="flex gap-3 items-center">
      <h1>{title}</h1>
      <div style={{ width: width }} className="flex bg-gray-300 rounded-md z-1  justify-between py-1 px-5 relative">
        <h1>{selectedItem.label}</h1>
        <button onClick={() => setIsOpen(prev => !prev)}>
          {isOpen ? <BiUpArrow /> :
            <BiDownArrow />}
        </button>
        {isOpen ?

          <div className="w-full flex flex-col rounded-md overflow-hidden z-10 bg-gray-300 absolute left-0 top-10 divide-gray-100 divide-y">
            {items.map((item, i) => (
              <button className="py-1 px-5 hover:bg-gray-400 text-left" key={i} onClick={() => handleSelect(item)}>{item.label}</button>
            ))}
          </div>
          : null}
      </div>
    </div>
  )
}
