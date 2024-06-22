
import { DropDownItem } from "@/types/types";
import { useState } from "react"
import { BiDownArrow, BiUpArrow } from "react-icons/bi";


interface DropDownProps {
  title: string;
  items: DropDownItem[]
  onChange: (item: DropDownItem) => void;
}

export default function DropDown({ title, items, onChange }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DropDownItem>({
    label: 'Light',
    value: "light"
  })



  function handleSelect(item: DropDownItem) {
    setSelectedItem(item);
    onChange(item)
    setIsOpen(false)
  }

  return (
    <div className="w-full h-full p-2">
      <div className="flex gap-3 items-center">
        <h1>{title}</h1>
        <div className="flex bg-gray-300 rounded-md w-[150px]  justify-between py-1 px-5 relative">
          <h1>{selectedItem.label}</h1>
          <button onClick={() => setIsOpen(prev => !prev)}>
            {isOpen ? <BiUpArrow /> :
              <BiDownArrow />}
          </button>
          {isOpen ?

            <div className="w-full flex flex-col rounded-md overflow-hidden bg-gray-300 absolute left-0 -bottom-20 divide-gray-100 divide-y">
              {items.map((item, i) => (
                <button className="py-1 px-5 hover:bg-gray-400 text-left" key={i} onClick={() => handleSelect(item)}>{item.label}</button>
              ))}
            </div>
            : null}
        </div>
      </div>
    </div>
  )
}
