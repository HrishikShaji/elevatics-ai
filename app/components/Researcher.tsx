"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { usePrompt } from "../contexts/PromptContext";
import { useTheme } from "../contexts/ThemeContext";
import { PiRocketLaunchThin } from "react-icons/pi";
import { useDebounce } from "../hooks/useDebounce";
import Spinner from "./svgs/Spinner";

const Researcher = () => {
  const [input, setInput] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const { setPrompt } = usePrompt();
  const router = useRouter();
  const { theme } = useTheme();
  const debouncedValue = useDebounce(input, 1000);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchSuggestions(prompt: string) {
      const token = process.env.NEXT_PUBLIC_HFSPACE_TOKEN || "";
      const headers = {
        Authorization: token,
        "Content-Type": "application/json",
      };
      const response = await fetch(
        "https://pvanand-generate-subtopics.hf.space/get_recommendations",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            user_input: prompt,
            num_recommendations: 6,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching recommendations");
      }

      return response.json();
    }

    if (shouldFetch) {
      setIsLoading(true);
      setIsSuccess(false);

      fetchSuggestions(debouncedValue)
        .then((response) => {
          setData(response.recommendations);
          setIsSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          setIsSuccess(false);
        })
        .finally(() => {
          setIsLoading(false);
          setShouldFetch(false);
        });
    }
  }, [debouncedValue, shouldFetch]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setPrompt(input);
    router.push(`/researcher/topics`);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setShouldFetch(true);
    setInput(e.target.value);
  }

  function handleRecommendation(prompt: string) {
    setShouldFetch(false);
    setInput(prompt);
  }

  return (
    <div className="flex  w-full h-full">
      <div className="flex flex-col items-center h-full pt-[200px] w-full">
        <h1
          style={{ color: theme.primary.textColor }}
          className="text-3xl font-semibold">
          iResearcher
        </h1>
        <h1 className="text-[#8282AD] mt-5">
          Take your unbiased research to new level{" "}
        </h1>
        <div className="w-[50%] flex flex-col gap-3">
          <form
            onSubmit={handleSubmit}
            className="mt-5 flex items-center relative w-full">
            <input
              value={input}
              onChange={handleChange}
              placeholder="What's on your mind..."
              className="rounded-xl border-2 shadow-md border-gray-100 bg-white focus:outline-gray-300 p-4 w-full"
            />{" "}
            <button className="text-black absolute right-2 ">
              <PiRocketLaunchThin size={30} />
            </button>
          </form>
          {isLoading ? (
            <div className="w-10">
              <Spinner />
            </div>
          ) : null}
          {isSuccess ? (
            <div className="flex flex-col gap-1 w-full">
              <span className="text-[#535353] ">Here are some suggestions</span>
              <div className="p-10 md:p-0 w-full flex flex-col gap-1">
                {data.map((recommendation: string, i: number) => (
                  <div
                    onClick={() => handleRecommendation(recommendation)}
                    key={i}
                    style={{
                      borderColor: theme.primary.textColor,
                    }}
                    className="flex cursor-pointer p-1 items-center text-gray-500 gap-5 bg-transparent ">
                    <h1 className="bg-gray-100 py-1 px-3 hover:font-semibold rounded-xl">
                      {recommendation}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Researcher;
