
import { useState } from "react"
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

export default function DropDown() {
  const [isOpen, setIsOpen] = useState(false)


  return (
    <div className="w-full h-full p-2">
      <div className="flex gap-3">
        <h1>Theme</h1>
        <div className="flex bg-gray-300 rounded-md w-[150px]  justify-between py-1 px-5 relative">
          <h1>light</h1>
          <button onClick={() => setIsOpen(prev => !prev)}>
            {isOpen ? <BiUpArrow /> :
              <BiDownArrow />}
          </button>
          {isOpen ?

            <div className="w-full flex flex-col rounded-md overflow-hidden bg-gray-300 absolute left-0 -bottom-20 divide-gray-100 divide-y">
              <h1 className="py-1 px-5 hover:bg-gray-400">Dark</h1>
              <h1 className="py-1 px-5 hover:bg-gray-400">Light</h1>
            </div>
            : null}
        </div>
      </div>
    </div>
  )
}
