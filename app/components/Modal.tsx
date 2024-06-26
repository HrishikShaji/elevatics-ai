"use client";

import { useTheme } from "../contexts/ThemeContext";
import { IoIosCloseCircle } from "react-icons/io";
import SignInSection from "./SignInSection";
import ProfileSection from "./ProfileSection";
import SettingsSection from "./SettingsSection";
import LimitModal from "./LimitModal";
import PlanModal from "./PlanModal";
import { IoCloseOutline } from "react-icons/io5";

export default function Modal() {
  const { modal, setModal } = useTheme();
  return (
    <>
      {modal !== "" ? (
        <div className="h-screen w-full fixed top-0 left-0 bg-black/70 flex justify-center items-center z-50">
          <div className=" rounded-md p-10 relative  bg-white">
            <button
              onClick={() => setModal("")}
              className="absolute text-black p-2 rounded-md bg-gray-300 -top-3 -right-3"
            >
              <IoCloseOutline size={20} />
            </button>
            {modal === "library" ? "library" : null}
            {modal === "signIn" ? <SignInSection /> : null}
            {modal === "settings" ? <SettingsSection /> : null}
            {modal === "profile" ? <ProfileSection /> : null}
            {modal === "limit" ? <LimitModal /> : null}
            {modal === "plan" ? <PlanModal /> : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
