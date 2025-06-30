"use client";
import React, { Profiler } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CreateContext } from "@/Context/ContextProvider";
import Sidebar from "./Sidebar";
import Image from "next/image";
import Profile from "./profile/profile";
const Mainbodynav = () => {
  const { isSidebar, setsidebar, setOpenProfile, OpenProfile,ProfileIconRef} =
    CreateContext();
  const handleProfile = () => {
    setOpenProfile (!OpenProfile);
  };
  return (
    <div className="w-full flex justify-between  mt-3">
      <div className="Sidebar flex gap-2 items-center">
        <div>
          {isSidebar && (
            <div className="flex items-center gap-2" >
              <GiHamburgerMenu
                className="drop-shadow-2xl cursor-pointer size-7"
                onClick={() => setsidebar(!Sidebar)}
              />
              <p
                className={`text-2xl select-none px-3 p-2 text-white bg-green-700 overflow-hidden rounded-3xl`}
              >
                Mogger.AI
              </p>
            </div>
          )}
        </div>
      </div>
      <div
        className="Profile flex gap-2 items-center relative"
        onClick={handleProfile}
      >
        <div ref={ProfileIconRef} className="w-12 h-12 select-none text-center flex justify-center items-center rounded-full bg-green-800 overflow-hidden cursor-pointer hover:border hover:border-green-900">
          <img
            src={
              "https://media.craiyon.com/2025-04-14/aBeNQ-bqRuC-YKZwS9ZHZQ.webp"
            }
            alt="pfp.png"
            className="w-full object-cover"
            height={30}
            width={30}
          />
        </div>
        <Profile />
      </div>
    </div>
  );
};

export default Mainbodynav;
