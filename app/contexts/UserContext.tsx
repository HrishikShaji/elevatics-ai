"use client";

import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from "react";

interface UserData {
  setRefetch: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  queries: number;
  status: "authenticated" | "loading" | "unauthenticated";
}

export const UserContext = createContext<UserData | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const { status, data } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [refetch, setRefetch] = useState(false)
  const [queries, setQueries] = useState(0)


  useEffect(() => {
    async function fetchProfile() {
      console.log("refetched")
      const response = await fetch("/api/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("fetch failed");
      }

      const result = await response.json();

      setUser(result.profile);
      setQueries(result.profile.queries)
    }

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, data, refetch]);
  const userData: UserData = { queries, user, status, setRefetch };
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};
