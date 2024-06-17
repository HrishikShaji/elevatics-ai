import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";
import Spinner from "./svgs/Spinner";
import { IoIosCloseCircle } from "react-icons/io";

interface ShareEmailProps {
	setEmail: Dispatch<SetStateAction<string>>;
	email: string;
	handleEmail: (e: FormEvent) => void;
	loading: boolean;
	setIsShare: Dispatch<SetStateAction<boolean>>;
}

export default function ShareEmail({
	handleEmail,
	email,
	setEmail,
	loading,
	setIsShare,
}: ShareEmailProps) {
	return (
		<div className="fixed z-50 top-0 left-0 h-screen w-full bg-black/70 flex items-center justify-center">
			<div className="relative  p-2 flex flex-col gap-2 bg-white rounded-3xl">
				<button
					onClick={() => setIsShare(false)}
					className="absolute top-2 right-2"
				>
					<IoIosCloseCircle size={25} />
				</button>
				<div className="flex flex-col gap-5 p-5 items-center justify-center">
					<div className="flex flex-col gap-5 items-center justify-center ">
						<h1 className="pb-3 border-b-[1px] border-gray-300 text-center">
							Share Via Email
						</h1>
						<form className="flex gap-3 items-center">
							<input
								type="email"
								value={email}
								className="p-2 rounded-md focus:outline-none"
								placeholder="Address"
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<button
								onClick={handleEmail}
								type="submit"
								className="p-2 rounded-full bg-black text-white"
							>
								{loading ? (
									<div className="w-10">
										<Spinner />
									</div>
								) : (
									<TbSquareRoundedArrowRightFilled size={25} />
								)}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
