"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfileSection() {
  const { data, status } = useSession();
  return (
    <div className="w-[60vw] h-[60vh] flex flex-col items-center justify-center gap-5">
      {data?.user?.image ? (
        <Image
          src={data.user.image}
          height={1000}
          width={1000}
          alt=""
          className="w-40 h-40 rounded-full object-cover"
        />
      ) : null}
      <h1>{data?.user?.name}</h1>
      <h2>{data?.user?.email}</h2>
    </div>
  );
}
