import { FaGoogle } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { signIn } from "next-auth/react";

export default function SignInSection() {
  return (
    <div className="h-full w-[30vw] flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-semibold text-black">Sign In </h1>
      <div className="w-full flex flex-col gap-10">
        <form className="flex w-full flex-col gap-2 items-center justify-center">
          <input
            className="p-2 w-full  border-b-[2px] border-gray-300 focus:outline-none"
            placeholder="hrishik@gmail.com"
          />
          <input
            className="p-2 w-full border-b-[2px] border-gray-300 focus:outline-none"
            placeholder="password12345"
          />
          <button className="mt-3 text-white rounded-md w-full p-2 bg-black ">
            Log In
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
            onClick={(e) => {
              e.preventDefault();
              signIn("google", { callbackUrl: "/" })            
}}>
            <FaGoogle size={30} />
          </button>
          <button
            className="p-2 rounded-md bg-white"
            onClick={(e) => {
              e.preventDefault();
              signIn("github", { callbackUrl: "/" })            
}}>
            <IoLogoGithub size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}
