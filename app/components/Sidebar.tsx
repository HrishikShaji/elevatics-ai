"use client";

import { signOut, useSession } from "next-auth/react";
import { useTheme } from "../contexts/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLibrary } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";

export default function Sidebar() {
  const { isSideBarOpen, setModal, modal } = useTheme();
  const { status, data } = useSession();

  if (!isSideBarOpen) return null;
  return (
    <>
      <div className="sm:hidden bg-white fixed top-14 items-center z-40 flex flex-col w-full h-[200px] left-0">

        <button
          style={{ color: modal === "settings" ? "black" : "" }}
          className="p-2 flex gap-4 items-center text-xl pl-4 text-left text-gray-500 hover:text-black"
          onClick={() => setModal("settings")}
        >
          <IoSettingsOutline />       Settings
        </button>
        <Link className="p-2 pl-4 flex gap-4 items-center text-xl text-gray-500 hover:text-black" href="/history">
          <BiLibrary />   Library
        </Link>
        <button
          style={{ color: modal === "profile" ? "black" : "" }}
          className="p-2 flex gap-4 items-center text-xl pl-4 text-left text-gray-500 hover:text-black"
          onClick={() => setModal("profile")}
        >
          <VscAccount />   Profile
        </button>
        <button
          className="p-2 rounded-md text-xl hover:text-red-500 text-black "
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
      <div className="h-full relative hidden sm:block w-[300px] bg-gray-100 ">
        <div className="mt-20 flex flex-col">
          <button
            style={{ color: modal === "settings" ? "black" : "" }}
            className="p-2 flex gap-4 items-center text-xl pl-4 text-left text-gray-500 hover:text-black"
            onClick={() => setModal("settings")}
          >
            <IoSettingsOutline />       Settings
          </button>
          <Link className="p-2 pl-4 flex gap-4 items-center text-xl text-gray-500 hover:text-black" href="/history">
            <BiLibrary />   Library
          </Link>
          <button
            style={{ color: modal === "profile" ? "black" : "" }}
            className="p-2 flex gap-4 items-center text-xl pl-4 text-left text-gray-500 hover:text-black"
            onClick={() => setModal("profile")}
          >
            <VscAccount />   Profile
          </button>
        </div>
        {status === "authenticated" ? (
          <div className="absolute flex justify-between items-center w-full bottom-5 left-0 px-4 p-2">
            <button
              className="p-2 rounded-md text-xl hover:text-red-500 text-black "
              onClick={() => signOut()}
            >
              Logout
            </button>
            {/*   

          {data.user?.image ? (
            <Image
              onClick={() => setModal("profile")}
              src={data.user.image}
              className="h-10 cursor-pointer w-10 rounded-full object-cover"
              height={1000}
              width={1000}
              alt="image"
            />
          ) : null}
          */}
          </div>
        ) : null}
      </div>
    </>
  );
}
