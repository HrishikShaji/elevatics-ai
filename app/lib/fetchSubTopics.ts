export default async function fetchSubTopics({
  desc,
  title,
  excludedTopicTitles,
  subTopicsNum
}: {
  desc: string;
  title: string;
  excludedTopicTitles: string[];
  subTopicsNum: number;
}) {
  const token = process.env.NEXT_PUBLIC_HFSPACE_TOKEN || "";
  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
  };
  const response = await fetch(
    "https://pvanand-generate-subtopics.hf.space/generate_subtopics",
    {
      method: "POST",
      headers: headers,
      cache: "no-store",
      body: JSON.stringify({
        main_task: desc,
        user_input: title,
        num_topics: subTopicsNum,
        excluded_topics: excludedTopicTitles,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Error fetching topics");
  }

  return response.json();
}
