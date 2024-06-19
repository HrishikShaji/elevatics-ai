import { SEND_EMAIL_URL } from "./endpoints";

export default async function sendEmail({
  htmlArray,
  email,
  prompt,
}: {
  htmlArray: string[];
  email: string;
  prompt: string;
}) {
  const response = await fetch(SEND_EMAIL_URL, {
    method: "POST",
    body: JSON.stringify({ htmlArray, email, prompt }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("success");
  } else {
    console.error("Failed to send");
  }
}
