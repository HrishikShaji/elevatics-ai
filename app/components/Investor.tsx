"use client"

import { ChangeEvent, FormEvent, useState } from "react";

export default function Investor() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
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

  return (
    <div className="h-full w-full flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            File:
            <input type="file" onChange={handleFileChange} />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input type="text" value={description} onChange={handleDescriptionChange} />
          </label>
        </div>
        <button type="submit">{loading ? "Uploading..." : "Upload"}</button>
      </form>
    </div>
  );
}
