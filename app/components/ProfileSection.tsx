"use client";

import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfileSection() {
  const [profile, setProfile] = useState<User | null>(null);
  const [details, setDetails] = useState<"account" | "personal">("account");
  useEffect(() => {
    async function fetchProfile() {
      const response = await fetch("/api/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("fetch failed");
      }

      const result = await response.json();

      setProfile(result.profile);
    }

    fetchProfile();
  }, []);
  const { data, status } = useSession();

  return (
    <div className="w-[60vw] h-[60vh] flex flex-col items-center justify-start gap-5">
      {data?.user?.image ? (
        <Image
          src={data.user.image}
          height={1000}
          width={1000}
          alt=""
          className="w-40 h-40 rounded-full object-cover"
        />
      ) : null}
      <div className="flex w-[40%] ">
        <button
          className="w-[50%] pb-2"
          style={{
            borderBottom:
              details === "account" ? "3px solid blue" : "3px solid gray",
          }}
          onClick={() => setDetails("account")}
        >
          Account
        </button>
        <button
          style={{
            borderBottom:
              details === "personal" ? "3px solid blue" : "3px solid gray",
          }}
          className="w-[50%] pb-2"
          onClick={() => setDetails("personal")}
        >
          Personal
        </button>
      </div>
      <div className="flex flex-col gap-1 w-[80%] ">
        {details === "account" ? (
          <>
            <div className="flex w-full py-1 border-gray-200 border-b-[1px]">
              <h1 className="w-[50%]">Name</h1>
              <h1 className="w-[50%]">{profile?.name}</h1>
            </div>
            <div className="flex w-full py-1 border-gray-200 border-b-[1px]">
              <h1 className="w-[50%]">Email</h1>
              <h1 className="w-[50%]">{profile?.email}</h1>
            </div>
            <div className="flex w-full py-1 border-gray-200 border-b-[1px]">
              <h1 className="w-[50%]">Role</h1>
              <h1 className="w-[50%]">{profile?.role}</h1>
            </div>
            <div className="flex w-full py-1 border-gray-200 border-b-[1px]">
              <h1 className="w-[50%]">Plan</h1>
              <h1 className="w-[50%]">{profile?.plan}</h1>
            </div>
            <div className="flex w-full py-1 border-gray-200 border-b-[1px]">
              <h1 className="w-[50%]">Queries Left</h1>
              <h1 className="w-[50%]">{profile?.queries}</h1>
            </div>
          </>
        ) : null}
        {details === "personal" ? (
          <>
            <div className="flex w-full py-1 border-gray-200 border-b-[1px]">
              <h1 className="w-[50%]">Phone number</h1>
              <div className="w-[50%]">
                {profile?.phoneNumber ? (
                  profile.phoneNumber
                ) : (
                  <button className="text-sm p-1 px-3 rounded-md bg-gray-200">
                    Update
                  </button>
                )}
              </div>
            </div>
            <div className="flex w-full py-1 border-gray-200 border-b-[1px]">
              <h1 className="w-[50%]">Gender</h1>
              <div className="w-[50%]">
                {profile?.gender ? (
                  profile.gender
                ) : (
                  <button className="text-sm p-1 px-3 rounded-md bg-gray-200">
                    Update
                  </button>
                )}
              </div>
            </div>
            <div className="flex w-full py-1 border-gray-200 border-b-[1px]">
              <h1 className="w-[50%]">Date of Birth</h1>
              <div className="w-[50%]">
                {profile?.dob ? (
                  profile.dob.toLocaleDateString()
                ) : (
                  <button className="text-sm p-1 px-3 rounded-md bg-gray-200">
                    Update
                  </button>
                )}
              </div>
            </div>
            <div className="flex w-full py-1 border-gray-200 border-b-[1px]">
              <h1 className="w-[50%]">Nationality</h1>
              <div className="w-[50%]">
                {profile?.nationality ? (
                  profile.nationality
                ) : (
                  <button className="text-sm p-1 px-3 rounded-md bg-gray-200">
                    Update
                  </button>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
