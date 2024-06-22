"use client";

import { useTheme } from "../contexts/ThemeContext";
import { IoIosCloseCircle } from "react-icons/io";
import SignInSection from "./SignInSection";
import ProfileSection from "./ProfileSection";
import SettingsSection from "./SettingsSection";

export default function Modal() {
  const { modal, setModal } = useTheme();
  return (
    <>
      {modal !== "" ? (
        <div className="h-screen w-full fixed top-0 left-0 bg-black/70 flex justify-center items-center z-50">
          <div className=" rounded-md p-10 relative  bg-white">
            <button
              className="absolute top-2 right-2"
              onClick={() => setModal("")}
            >
              <IoIosCloseCircle size={25} />
            </button>
            {modal === "library" ? "library" : null}
            {modal === "signIn" ? <SignInSection /> : null}
            {modal === "settings" ? <SettingsSection /> : null}
            {modal === "profile" ? <ProfileSection /> : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
