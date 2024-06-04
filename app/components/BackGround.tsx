"use client";

import { useTheme } from "../contexts/ThemeContext";

export const BackGround = () => {
  const { getTheme } = useTheme();
  return (
    <div
      style={{
        backgroundColor: getTheme().primary.backgroundColor,
      }}
      className="h-screen w-full absolute -z-20"
    >
      <div className="radial-gradientone h-[500px] blur-[250px] w-[500px] -z-10 rounded-full absolute top-10 right-0"></div>
      <div className="radial-gradienttwo h-[200px] blur-[150px] w-[200px] -z-10 rounded-full absolute bottom-10 left-10"></div>
    </div>
  );
};
