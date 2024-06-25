import { GENERATE_PDF_URL } from "./endpoints";

export default async function downloadPdf({
  htmlArray,
  prompt,
}: {
  htmlArray: string[];
  prompt: string;
}) {
  const response = await fetch(GENERATE_PDF_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ htmlArray }),
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${prompt}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } else {
    const result = await response.json()
    console.log(result)
    console.error("Failed to generate PDF");
  }
}
