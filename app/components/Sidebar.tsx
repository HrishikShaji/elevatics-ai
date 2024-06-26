"use client";

import { signOut, useSession } from "next-auth/react";
import { useTheme } from "../contexts/ThemeContext";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const { isSideBarOpen, setModal } = useTheme();
  const { status, data } = useSession();

  if (!isSideBarOpen) return null;
  return (
    <div className="h-full relative w-[250px] bg-gray-100 ">
      <div className="mt-20 flex flex-col">
        <button
          className="p-2 text-xl pl-4 text-left hover:bg-gray-200"
          onClick={() => setModal("settings")}
        >
          Settings
        </button>
        <Link className="p-2 pl-4 text-xl text-left hover:bg-gray-200" href="/history">
          Library
        </Link>
      </div>
      {status === "authenticated" ? (
        <div className="absolute flex justify-between items-center w-full bottom-5 left-0 px-4 p-2">
          <button
            className="p-2 rounded-md text-xl hover:bg-red-500 hover:text-white "
            onClick={() => signOut()}
          >
            Logout
          </button>
          {data.user?.image ? (
            <Image
              onClick={() => setModal("profile")}
              src={data.user.image}
              className="h-10 w-10 rounded-full object-cover"
              height={1000}
              width={1000}
              alt="image"
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
