import { CreateContext } from "@/Context/ContextProvider";
import Image from "next/image";
import React from "react";
import { FaRegUser } from "react-icons/fa";

const ProfileContainer = () => {
  const { ProfileIconRef, profile } = CreateContext();
  return (
    <div
      ref={ProfileIconRef}
      className="w-12 h-12 select-none text-center flex justify-center items-center rounded-full bg-green-200 overflow-hidden cursor-pointer hover:border hover:border-green-900"
    >
      {!profile ? (
        <FaRegUser />
      ) : (
        <Image
          src={profile}
          alt="pfp.png"
          className="w-full object-cover"
          height={200}
          width={200}
        />
      )}
    </div>
  );
};

export default ProfileContainer;
