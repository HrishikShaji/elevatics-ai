import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";
import Spinner from "./svgs/Spinner";
import { IoIosCloseCircle } from "react-icons/io";
import sendEmail from "../lib/sendEmail";
import { IoCloseOutline } from "react-icons/io5";
import { PiCopySimpleFill } from "react-icons/pi";
import { IoSend } from "react-icons/io5";

interface ShareEmailProps {
  setIsShare: Dispatch<SetStateAction<boolean>>;
  prompt: string;
  htmlArray: string[];
  id: string;
  type: string
}

export default function ShareEmail({
  setIsShare,
  prompt,
  htmlArray,
  id,
  type
}: ShareEmailProps) {

  const [email, setEmail] = useState("")
  const [sending, setSending] = useState(false)
  const [createLink, setCreateLink] = useState(false)
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (type === "FULL") {

      setInputValue(`http://localhost:3000/full-report/${id}`)
    } else {
      setInputValue(`http://localhost:3000/quick-report/${id}`)
    }
  }, [id])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const copyToClipboard = () => {
    if (inputRef.current) {

      inputRef.current.select();
      inputRef.current.setSelectionRange(0, 99999);

      document.execCommand('copy');

      alert('Copied the text: ' + inputRef.current.value);
    }
  };

  async function handleEmail(e: FormEvent) {
    e.preventDefault();
    try {
      setSending(true);
      await sendEmail({ htmlArray: htmlArray, email: email, prompt: prompt });
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  }
  return (
    <div className="fixed z-50 top-0 left-0 h-screen w-full bg-black/70 flex items-center justify-center">
      <div className="relative w-[50vw] h-[50vh] justify-center items-center  p-10 flex flex-col gap-2 bg-white rounded-md">
        <button
          onClick={() => setIsShare(false)}
          className="absolute text-black p-2 rounded-md bg-gray-300 -top-3 -right-3"
        >
          <IoCloseOutline size={20} />
        </button>
        <h1 className="text-xl font-semibold border-b-[1px] border-gray-300 w-full text-center">Share</h1>
        <div className="flex flex-col gap-5 py-5  w-full">
          <div className="flex flex-col gap-5  items-start">
            <h1 className="pb-2 font-semibold border-b-[1px] border-gray-300 ">
              Share Link
            </h1>
            <div className=" flex gap-5 items-center w-full relative">
              <input
                className="p-2 w-full rounded-md bg-gray-200"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                ref={inputRef}
              />
              <button className=" absolute right-2 hover:text-gray-700 z-10" onClick={copyToClipboard}><PiCopySimpleFill size={25} /></button>
            </div>
            <h1 className="pb-2 border-b-[1px] font-semibold border-gray-300 ">
              Share Email
            </h1>
            <form className="flex gap-3  w-full items-center relative">
              <input
                type="email"
                value={email}
                className="p-2 rounded-md bg-gray-200 w-full focus:outline-none"
                placeholder="Address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                onClick={handleEmail}
                type="submit"
                className="absolute right-2 z-10"
              >
                {sending ? (
                  <div className="w-10">
                    <Spinner />
                  </div>
                ) : (
                  <IoSend size={20} />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
