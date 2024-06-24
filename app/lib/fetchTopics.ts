
export default async function fetchTopics({ prompt, topicsNum }: { prompt: string, topicsNum: number }) {
  const token = process.env.NEXT_PUBLIC_HFSPACE_TOKEN || "";
  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
  };
  const response = await fetch(
    "https://pvanand-generate-subtopics.hf.space/generate_topics",
    {
      method: "POST",
      cache: "no-store",
      headers: headers,
      body: JSON.stringify({
        user_input: prompt,
        num_topics: topicsNum,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Error fetching topics");
  }

  return response.json();
}
