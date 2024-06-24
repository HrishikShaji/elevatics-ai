export default async function generateQuickReport({ prompt, internet, dataFormat, outputFormat }: { prompt: string; internet: boolean; dataFormat: string; outputFormat: string }) {
  const token = process.env.NEXT_PUBLIC_HFSPACE_TOKEN || "";
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(
    "https://pvanand-search-generate-staging.hf.space/generate_report",
    {
      method: "POST",
      cache: "no-store",
      headers: headers,
      body: JSON.stringify({
        topic: "",
        description: prompt,
        user_id: "",
        user_name: "",
        internet: internet,
        output_format: outputFormat,
        data_format: dataFormat,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching topics");
  }

  const data = await response.json();

  return data;
}
