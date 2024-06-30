

export default async function fetchNewTopics({ prompt, topicsNum, subTopicsNum }: { prompt: string, topicsNum: number, subTopicsNum: number }) {
  const token = process.env.NEXT_PUBLIC_HFSPACE_TOKEN || "";
  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
  };
  const response = await fetch(
    "https://pvanand-generate-subtopics.hf.space/generate_topicsv2",
    {
      method: "POST",
      cache: "no-store",
      headers: headers,
      body: JSON.stringify({
        user_input: prompt,
        num_topics: topicsNum,
        num_subtopics: subTopicsNum
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Error fetching topics");
  }

  return response.json();
}
