import { Record } from "@prisma/client/runtime/library";
import { Dispatch, RefObject, SetStateAction, useRef } from "react";

interface SliderProps {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  items: Record<string, any>[];
}

export default function Slider({ items, setCurrentIndex, currentIndex }: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  function scrollLeft(ref: RefObject<HTMLDivElement>) {
    if (ref.current) {
      ref.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  }

  function scrollRight(ref: RefObject<HTMLDivElement>) {
    if (ref.current) {
      ref.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  }
  const handlePageChange = (page: number) => {
    setCurrentIndex(page);
  };
  return (

    <div className="relative flex w-fit items-center ">
      <button
        onClick={() => scrollLeft(containerRef)}
        className="absolute size-6 flex items-center justify-center -left-10 hover:bg-gray-200 rounded-full"
      >
        {"<"}
      </button>
      <div
        className="flex gap-1 overflow-x-hidden  rounded-md border-gray-300 h-[50px]"
        ref={containerRef}
      >
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => handlePageChange(i)}
            className="w-full cursor-pointer h-full flex items-center  relative group"
            style={{
              backgroundColor: currentIndex === i ? "#cbd5e1" : "#f3f4f6",
              // borderColor: currentIndex === i ? "#2A42CB" : "white",
            }}
          >
            <div
              className="px-10 text-center whitespace-nowrap"
              style={{ color: currentIndex === i ? "#000000" : "#7F7F7F" }}
            >
              {items[i][0]}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => scrollRight(containerRef)}
        className="absolute size-6 flex items-center justify-center -right-10  hover:bg-gray-200 rounded-full"
      >
        {">"}
      </button>
    </div>
  )
}
