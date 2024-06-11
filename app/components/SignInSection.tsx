import { FaGoogle } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { signIn } from "next-auth/react";
import { RiLoginCircleFill } from "react-icons/ri";

export const SignInSection = () => {
	return (
		<div className="h-full w-full flex flex-col items-center justify-center gap-5">
			<h1 className="text-2xl font-semibold text-black">Sign In </h1>
			<div className="w-full flex flex-col gap-10">
				<form className="flex w-full flex-col gap-2 items-center justify-center">
					<input
						className="p-2 w-full rounded-md bg-gray-300"
						placeholder="hrishik@gmail.com"
					/>
					<input
						className="p-2 w-full rounded-md bg-gray-300"
						placeholder="password12345"
					/>
					<button className="mt-3 text-black">
						<RiLoginCircleFill size={40} />
					</button>
				</form>
				<div className="w-full items-center flex justify-center gap-4">
					<div className="w-full h-[1px] bg-gray-500"></div>
					<h1>OR</h1>
					<div className="w-full h-[1px] bg-gray-500"></div>
				</div>
				<div className="flex gap-5 justify-center">
					<button
						className="p-2 rounded-md bg-white"
						onClick={() => signIn("google", { callbackUrl: "/" })}
					>
						<FaGoogle size={30} />
					</button>
					<button
						className="p-2 rounded-md bg-white"
						onClick={() => signIn("github", { callbackUrl: "/" })}
					>
						<IoLogoGithub size={30} />
					</button>
				</div>
			</div>
		</div>
	);
};
