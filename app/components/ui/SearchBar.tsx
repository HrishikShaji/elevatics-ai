"use client";
import { PiRocketLaunchThin } from "react-icons/pi";

export default function SearchBar() {
  return (
    <div className="mt-10 relative w-[50%]">
      <input
        placeholder="What's on your mind..."
        className="rounded-xl border-2 border-gray-100 focus:outline-gray-300 p-3 w-full"
      />{" "}
      <button className="text-black absolute right-2 top-2">
        <PiRocketLaunchThin size={30} />
      </button>
    </div>
  );
}
