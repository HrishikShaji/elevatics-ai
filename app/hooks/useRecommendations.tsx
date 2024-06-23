import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import fetchSuggestions from "../lib/fetchSuggestions";

export default function useRecommendations() {
  const [input, setInput] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const debouncedValue = useDebounce(input, 1000);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
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

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setShouldFetch(true);
    setInput(e.target.value);
  }

  function handleRecommendation(prompt: string) {
    setShouldFetch(false);
    setInput(prompt);
  }
  return { isLoading, isSuccess, data, setShouldFetch, handleRecommendation, handleChange, input }
}
