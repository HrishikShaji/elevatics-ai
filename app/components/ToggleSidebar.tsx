"use client";
import { CiMenuKebab } from "react-icons/ci";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import { GiHamShank, GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ToggleSidebar() {
  const { setIsSideBarOpen, isSideBarOpen } = useTheme();
  const { status } = useSession();
  const { setModal } = useTheme();

  return (
    <div className="fixed bg-white sm:bg-transparent w-full justify-between top-0 left-0 z-20 flex items-center pt-8 pl-8 px-5 gap-5">
      <div className="flex gap-4 items-center">

        <Link href="/">
          <Image height={274} width={762} src="/assets/ElevaticsAILogo.png" className="w-[130px] h-full" alt="logo" />
        </Link>
      </div>
      {/*    

      */}
      <div className="flex gap-4">
        <button
          style={{ color: isSideBarOpen ? "black" : "" }}
          className=" text-gray-500 hover:text-black rounded-md"
          onClick={() => setIsSideBarOpen((prev) => !prev)}
        >
          <CiMenuKebab size={25} />
        </button>
        {/*  Documents and Settings

        <Link
          className=" text-xl rounded-md  text-gray-500 hover:text-black "
          href="/demo"
        >
          Demo
        </Link>
        */}
        {status === "unauthenticated" ?
          <button
            onClick={() => setModal("signIn")}
            className=" text-xl rounded-md  text-gray-500 hover:text-black "
          >
            Sign in
          </button> : null}
      </div>
    </div>
  );
}
