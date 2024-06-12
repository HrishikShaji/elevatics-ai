"use client";

import { useTheme } from "../contexts/ThemeContext";
import { IoIosCloseCircle } from "react-icons/io";
import SignInSection from "./SignInSection";

export default function Modal() {
  const { modal, setModal } = useTheme();
  return (
    <>
      {modal !== "" ? (
        <div className="h-screen w-full fixed top-0 left-0 bg-black/70 flex justify-center items-center z-50">
          <div className="w-[500px] rounded-3xl p-10 relative h-[500px] bg-white">
            <button
              className="absolute top-2 right-2"
              onClick={() => setModal("")}
            >
              <IoIosCloseCircle size={25} />
            </button>
            {modal === "library" ? "library" : null}
            {modal === "signIn" ? <SignInSection /> : null}
            {modal === "settings" ? "settings" : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
