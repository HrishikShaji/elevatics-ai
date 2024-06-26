import { useEffect, useState } from "react";

interface ToggleButtonProps {
  onChange: (value: boolean) => void;
  defaultValue: boolean;
}

export default function ToggleButton({ onChange, defaultValue }: ToggleButtonProps) {
  const [active, setActive] = useState(defaultValue)
  function handleToggle() {
    setActive(prev => {
      const newValue = !prev;
      return newValue;
    });
    onChange(!active);
  }
  return (

    <div
      onClick={handleToggle}
      className=" cursor-pointer  flex p-1 rounded-3xl w-12 border-[2px] border-gray-200"
    >
      <div
        style={{
          transform: active ? `translateX(20px)` : `translateX(0px)`,
          transition: `transform 0.25s`,
          backgroundColor: active ? "#4ade80" : "#9ca3af",
        }}
        className="size-4  rounded-full cursor-pointer"
      ></div>
    </div>
  )
}
