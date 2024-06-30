"use client";

import { signOut, useSession } from "next-auth/react";
import { useTheme } from "../contexts/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLibrary } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { HiOutlineFolderArrowDown } from "react-icons/hi2";
export default function Sidebar() {
  const { isSideBarOpen, setModal, modal } = useTheme();
  const { status, data } = useSession();

  if (!isSideBarOpen) return null;
  return (
    <>
      <div className="sm:hidden bg-gray-100 fixed top-0  pt-14 z-20 flex flex-col w-full h-[250px] left-0">

        <button
          style={{ color: modal === "settings" ? "black" : "" }}
          className="p-2 flex gap-4 items-center text-xl pl-4 text-left text-gray-500 hover:text-black"
          onClick={() => setModal("settings")}
        >
          <IoSettingsOutline />       Settings
        </button>
        <Link className="p-2 pl-4 flex gap-4 items-center text-xl text-gray-500 hover:text-black" href="/history">
          <HiOutlineFolderArrowDown />   Library
        </Link>
        <button
          style={{ color: modal === "profile" ? "black" : "" }}
          className="p-2 flex gap-4 items-center text-xl pl-4 text-left text-gray-500 hover:text-black"
          onClick={() => setModal("profile")}
        >
          <VscAccount />   Profile
        </button>
        <button
          className="p-2 pl-4 flex gap-4 items-center text-left rounded-md text-xl hover:text-red-500 text-gray-500 "
          onClick={() => signOut()}
        >
          <IoIosLogOut />      Logout
        </button>
      </div>
      <div className="h-full relative hidden sm:block w-[300px] bg-gray-100 ">
        <div className="mt-28 flex flex-col">
          <button
            style={{ color: modal === "settings" ? "black" : "" }}
            className="p-2 flex gap-4 items-center text-xl pl-8 text-left text-gray-500 hover:text-black"
            onClick={() => setModal("settings")}
          >
            <IoSettingsOutline />       Settings
          </button>
          <Link className="p-2 pl-8 flex gap-4 items-center text-xl text-gray-500 hover:text-black" href="/history">
            <HiOutlineFolderArrowDown />   Library
          </Link>
          <button
            style={{ color: modal === "profile" ? "black" : "" }}
            className="p-2 flex gap-4 items-center text-xl pl-8 text-left text-gray-500 hover:text-black"
            onClick={() => setModal("profile")}
          >
            <VscAccount />   Profile
          </button>
        </div>
        {status === "authenticated" ? (
          <div className="absolute flex justify-between items-center w-full bottom-5 left-0 pl-8 px-4 p-2">
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
