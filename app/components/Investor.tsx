"use client"
import { LuUploadCloud } from "react-icons/lu";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Spinner from "./svgs/Spinner";
import { HiArrowRight } from "react-icons/hi2";

export default function Investor() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState("");
  const inputRef = useRef<HTMLInputElement>(null)
  console.log(file.name)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files[0]);
  };


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    try {
      setLoading(true)
      const response = await fetch("https://nithin1905-investor.hf.space/investor", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false)
    }
  };
  const handleClick = () => {
    if (inputRef.current) {

      inputRef.current.click();
    }
  };
  return (
    <div className="h-full w-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className=" w-[50%] p-10 rounded-3xl border-2 border-gray-300">
        <input type="file" onChange={handleFileChange} ref={inputRef} hidden />
        <div className="w-full flex items-center justify-center h-[20vh] border-dashed border-gray-300 border-2 rounded-3xl" onClick={handleClick}>

          <LuUploadCloud size={25} />
        </div>
        <div className="w-full mt-5 flex justify-between">
          <h1>{file.name ? file.name : null}</h1>
          <button type="submit" className="p-2 rounded-full hover:bg-gray-300">{loading ? <div className="w-10"><Spinner /></div> : <HiArrowRight size={25} />}</button>
        </div>
      </form>
    </div>
  );
}
