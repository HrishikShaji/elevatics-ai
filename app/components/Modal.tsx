"use client";

import { useTheme } from "../contexts/ThemeContext";

const Modal = () => {
  const { modal, setModal } = useTheme();
  if (modal === "") return null;
  return (
    <div className="h-screen w-full fixed top-0 left-0 bg-black/70 flex justify-center items-center z-50">
      <div className="w-[500px] p-10 relative h-[500px] bg-white">
        <button
          className="p-2 rounded-md bg-black text-white absolute top-2 right-2"
          onClick={() => setModal("")}
        >
          close
        </button>
        <div className="bg-green-500">
          {modal === "library" ? "library" : null}
          {modal === "signIn" ? "signin" : null}
          {modal === "settings" ? "settings" : null}
        </div>
      </div>
    </div>
  );
};

export default Modal;
