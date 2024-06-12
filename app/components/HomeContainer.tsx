"use client";

import { useTheme } from "../contexts/ThemeContext";

export default function HomeContainer() {
  const { theme } = useTheme();
  return (
    <div
      style={{ backgroundColor: theme.primary.backgroundColor }}
      className="h-full w-full flex items-center p-10 justify-center"
    >
      <h1 style={{ color: theme.primary.textColor }}>Home</h1>
    </div>
  );
}
