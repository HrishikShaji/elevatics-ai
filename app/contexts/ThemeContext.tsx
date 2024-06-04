"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type Theme = "dark" | "light";

type ThemeItem = {
  backgroundColor: string;
  textColor: string;
};

type ThemeColors = {
  primary: ThemeItem;
  secondary: ThemeItem;
  ternary: ThemeItem;
  button: ThemeItem;
  border: { color: string };
  selectedTitle: { color: string };
  unSelectedTitle: { color: string };
  selectedSubTitle: { color: string };
  unSelectedSubTitle: { color: string };
  input: { textColor: string; borderColor: string };
};

interface ThemeData {
  setTheme: Dispatch<SetStateAction<Theme>>;
  getTheme: () => ThemeColors;
  theme: Theme;
  isSideBarOpen: boolean;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeData | undefined>(undefined);

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

export const ThemeColors = {
  primary: "",
  secondary: "",
  ternary: "",
  accent: "",
  textPrimary: "",
  textSecondary: "",
  textTernary: "",
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

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

  function getTheme() {
    let themeObj: ThemeColors = {
      primary: { backgroundColor: "", textColor: "" },
      secondary: { backgroundColor: "", textColor: "" },
      ternary: { backgroundColor: "", textColor: "" },
      button: { backgroundColor: "", textColor: "" },
      border: { color: "" },
      selectedTitle: { color: "" },
      unSelectedTitle: { color: "" },
      selectedSubTitle: { color: "" },
      unSelectedSubTitle: { color: "" },
      input: { borderColor: "", textColor: "" },
    };
    if (theme === "dark") {
      themeObj = darkTheme;
    } else {
      themeObj = lightTheme;
    }
    return themeObj;
  }

  const themeData: ThemeData = {
    setTheme,
    getTheme,
    theme,
    setIsSideBarOpen,
    isSideBarOpen,
  };

  return (
    <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
  );
};
