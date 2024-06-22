"use client";

import { Modal, Theme, ThemeColors } from "@/types/types";
import { User } from "@prisma/client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ThemeData {
  user: User;
  status: "authenticated" | "loading" | "unauthenticated";
}

export const ThemeContext = createContext<ThemeData | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

type ThemeProviderProps = {
  children: ReactNode;
};

const darkTheme: ThemeColors = {
  primary: { backgroundColor: "black", textColor: "white" },
  secondary: { backgroundColor: "#171717", textColor: "white" },
  ternary: { backgroundColor: "#262626", textColor: "#9ca3af" },
  button: { backgroundColor: "white", textColor: "black" },
  border: { color: "#171717" },
  selectedTitle: { color: "white" },
  unSelectedTitle: { color: "#404040" },
  selectedSubTitle: { color: "white" },
  unSelectedSubTitle: { color: "#262626" },
  input: { borderColor: "#27272a", textColor: "white" },
};
const lightTheme: ThemeColors = {
  primary: { backgroundColor: "white", textColor: "black" },
  secondary: { backgroundColor: "#F4F1F7", textColor: "black" },
  ternary: { backgroundColor: "#9ca3af", textColor: "black" },
  button: { backgroundColor: "black", textColor: "white" },
  border: { color: "#ECECEC" },
  selectedTitle: { color: "black" },
  unSelectedTitle: { color: "#A7A7A7" },
  selectedSubTitle: { color: "black" },
  unSelectedSubTitle: { color: "#E0E0E0" },
  input: { borderColor: "#E5E0DF", textColor: "black" },
};
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeColors>(lightTheme);
  const [themeName, setThemeName] = useState<Theme>("light");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [modal, setModal] = useState<Modal>("");

  function toggleTheme(theme: Theme) {
    if (theme === "light") {
      setTheme(lightTheme);
      setThemeName("light");
    } else {
      setTheme(darkTheme);
      setThemeName("dark");
    }
  }

  const themeData: ThemeData = {
    toggleTheme,
    theme,
    setIsSideBarOpen,
    isSideBarOpen,
    themeName,
    modal,
    setModal,
  };

  return (
    <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
  );
};
