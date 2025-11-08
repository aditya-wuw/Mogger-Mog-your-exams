"use client";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CreateContext } from "@/Context/ContextProvider";
import Sidebar from "./Sidebar";
import Profile from "./profile/profile";
import Mogger from "../Mogger";
import ProfileContainer from "./profile/ProfileContainer";
const Mainbodynav = () => {
  const { isSidebar, setsidebar, setOpenProfile, OpenProfile} =
    CreateContext();

  const handleProfile = () => {
    setOpenProfile (!OpenProfile);
  };
  return (
    <div className="w-full flex justify-between  mt-3">
      <div className="Sidebar flex gap-2 items-center">
        <div>
          {!isSidebar && (
            <div className="flex items-center gap-2 relative z-20" >
              <GiHamburgerMenu
                className="drop-shadow-2xl cursor-pointer size-7"
                onClick={() => setsidebar(true)}
              />
              <Mogger/>
            </div>
          )}
        </div>
      </div>
      <div
        className="Profile flex gap-2 items-center relative"
        onClick={handleProfile}
      >
        <ProfileContainer/>
        <Profile />
      </div>
    </div>
  );
};

export default Mainbodynav;
