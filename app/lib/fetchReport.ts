export default async function fetchReport({ title, desc }: { title: string, desc: string }) {

	const token = process.env.NEXT_PUBLIC_HFSPACE_TOKEN || "";
	const headers = {
		Authorization: token,
		"Content-Type": "application/json",
	};
	const response = await fetch(
		"https://pvanand-search-generate.hf.space/generate_report",
		{
			method: "POST",
			headers: headers,
			body: JSON.stringify({
				query: title,
				description: desc,
				user_id: "",
				user_name: "",
				internet: true,
				output_format: "Tabular Report",
				data_format: "Structured data",
			}),
		}
	);

	if (!response.ok) {
		throw new Error("Error fetching topics");
	}

	const data = await response.json();
	return data
}
