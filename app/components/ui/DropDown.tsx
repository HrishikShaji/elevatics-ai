
import { DropDownItem } from "@/types/types";
import { useState } from "react"
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

interface DropDownProps {
  width: string;
  title?: string;
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
      {title ?

        <h1>{title}</h1>
        : null}
      <div style={{ width: width }} className="flex bg-white border-[2px] border-gray-200 rounded-xl z-1  justify-between py-1 px-2 relative">
        <h1>{selectedItem.label}</h1>
        <button onClick={() => setIsOpen(prev => !prev)} className="text-gray-400">
          {!isOpen ? <IoIosArrowDropdown size={25} /> :
            <IoIosArrowDropup size={25} />}
        </button>
        {isOpen ?

          <div className="w-full flex flex-col rounded-xl shadow-lg overflow-hidden z-10 border-[2px] border-gray-200 bg-white absolute left-0 top-10 divide-gray-100 divide-y">
            {items.map((item, i) => (
              <button className="py-1 px-5 hover:bg-gray-200 text-left" key={i} onClick={() => handleSelect(item)}>{item.label}</button>
            ))}
          </div>
          : null}
      </div>
    </div>
  )
}
