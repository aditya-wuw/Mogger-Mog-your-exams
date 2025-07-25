"use client";
import Mainbodynav from "@/components/home/BodyNav";
import Sidebar from "@/components/home/Sidebar";
import { CreateContext } from "@/Context/ContextProvider";
import { FaRegUser, FaEdit } from "react-icons/fa";
import Image from "next/image";
import React from "react";

const ProfileSettings = () => {
  const { user_details } = CreateContext();
  function handleEdit() {
    //give a from to edit the user name and password
  }
  return (
    <div className="w-[100%] h-full flex">
      <div className="Profile_container mt-10">
        <section className="profile">
          <div className="flex items-center gap-5">
            {user_details?.users?.profile_pic ? (
              <div className="rounded-full w-15 h-15 overflow-hidden">
                <Image
                  src={user_details?.users?.profile_pic}
                  alt="Profile.png"
                  width={100}
                  height={100}
                  className="object-cover w-full"
                />
              </div>
            ) : (
              <div className="bg-green-200 rounded-full p-5 w-fit">
                <FaRegUser className="w-5 h-5" />
              </div>
            )}
            <span>
              <h1>{user_details?.users?.username}</h1>
              <h1>{user_details?.users?.email}</h1>
            </span>
            <div className="flex items-start h-12">
              <FaEdit className="w-6 h-6 cursor-pointer" onClick={handleEdit} />
            </div>
          </div>
        </section>
        <section className="performance "></section>
      </div>
    </div>
  );
};

export default ProfileSettings;
