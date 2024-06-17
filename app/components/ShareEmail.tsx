import React, { useState } from "react";
import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";

export default function ShareEmail() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		const response = await fetch("/api/email", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		const result = await response.json();
		setMessage(result.message);
	};

	return (
		<div className="flex flex-col gap-5 items-center justify-center ">
			<h1 className="pb-3 border-b-[1px] border-gray-300 text-center">Share Via Email</h1>
			<form onSubmit={handleSubmit} className="flex gap-3 items-center">
				<input
					type="email"
					value={email}
					className="p-2 rounded-md"
					placeholder="Address"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<button type="submit" className="p-2 rounded-full bg-black text-white"><TbSquareRoundedArrowRightFilled size={25} /></button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}
