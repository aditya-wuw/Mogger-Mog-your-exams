import { CreateContext } from "@/Context/ContextProvider";
import React, { useEffect } from "react";
import { FaRegUser } from "react-icons/fa";


const ProfileContainer = () => {
  const { ProfileIconRef, profile,setprofile} = CreateContext();
  
  // useEffect(()=>{
  //   setprofile(localStorage.getItem('pfp'))
  // },[profile])
  
  return (
    <div
      ref={ProfileIconRef}
      className="w-12 h-12 select-none text-center flex justify-center items-center rounded-full bg-green-200 overflow-hidden cursor-pointer hover:border hover:border-green-900"
    >
      {!profile ? (
        <FaRegUser />
      ) : (
        <img
          src={profile}
          alt="pfp.png"
          className="w-full object-cover"
          height={30}
          width={30}
        />
      )}
    </div>
  );
};

export default ProfileContainer;
