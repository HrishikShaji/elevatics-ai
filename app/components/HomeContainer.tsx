"use client";

import { useTheme } from "../contexts/ThemeContext";

export default function HomeContainer() {
	const { theme } = useTheme();

	const html = "<div>Hello World</div>";

	async function generatePDF() {
		const response = await fetch("/api/pdf", {
			method: "POST",
			body: JSON.stringify({ html }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'generated.pdf';
			document.body.appendChild(a);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(url);
		} else {
			console.error('Failed to generate PDF');
		}
	}
	return (
		<div
			style={{ backgroundColor: theme.primary.backgroundColor }}
			className="h-full w-full flex items-center p-10 justify-center"
		>
			<button
				className="p-2 rounded-md bg-black text-white"
				onClick={generatePDF}
			>
				Generate
			</button>
			<h1 style={{ color: theme.primary.textColor }}>Home</h1>
		</div>
	);
}
