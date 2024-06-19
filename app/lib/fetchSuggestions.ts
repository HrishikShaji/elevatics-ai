export default async function fetchSuggestions(prompt: string) {
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
		},
	);

	if (!response.ok) {
		throw new Error("Error fetching recommendations");
	}

	return response.json();
}
