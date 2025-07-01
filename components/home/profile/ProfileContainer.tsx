import { CreateContext } from "@/Context/ContextProvider";
import React from "react";

const ProfileContainer = () => {
    const{ProfileIconRef} = CreateContext();
  return (
    <div
      ref={ProfileIconRef}
      className="w-12 h-12 select-none text-center flex justify-center items-center rounded-full bg-green-800 overflow-hidden cursor-pointer hover:border hover:border-green-900"
    >
      <img
        src={"https://media.craiyon.com/2025-04-14/aBeNQ-bqRuC-YKZwS9ZHZQ.webp"}
        alt="pfp.png"
        className="w-full object-cover"
        height={30}
        width={30}
      />
    </div>
  );
};

export default ProfileContainer;
