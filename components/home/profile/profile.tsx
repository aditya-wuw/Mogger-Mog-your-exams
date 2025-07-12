"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IoPersonCircle } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { OptionType } from "@/Types/others/types";
import { CreateContext } from "@/Context/ContextProvider";
import { FaCopy } from "react-icons/fa";
import Link from "next/link";
const Profile = () => {
  const Router = useRouter();
  const {
    OpenProfile,
    setOpenProfile,
    ProfileIconRef,
    user_details,
    GetUser,
    setloader,
    setprofile,
  } = CreateContext();
  const Profileref = useRef<HTMLDivElement>(null);

  async function handleSignOut() {
    setloader(true);
    const res = await axios.post("/api/auth/Logout");
    if (res.data.success) {
      localStorage.removeItem("pfp");
      Router.push("/");
    } else {
      Router.push("/error");
    }
  }

  useEffect(() => {
    GetUser();
    function handleClick(e: MouseEvent) {
      if (
        Profileref.current &&
        !Profileref.current.contains(e.target as Node) &&
        !ProfileIconRef.current.contains(e.target as Node)
      ) {
        setOpenProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ProfileIconRef,setOpenProfile,GetUser]);

  useEffect(() => {
    if (user_details?.users?.profile_pic) {
      setprofile(user_details.users.profile_pic);
    }
  }, [user_details?.users?.profile_pic,setprofile,GetUser]);

  const handleCopy = async (data: string) => {
    navigator.clipboard.writeText(data);
  };

  const Options: Array<OptionType> = [
    { item: "User Profile", link: "/home/Profile", icon: <IoPersonCircle /> },
    { item: "Settings", link: "/home/Settings", icon: <IoMdSettings /> },
  ];

  if (OpenProfile)
    return (
      <div
        ref={Profileref}
        className="absolute z-10 top-13 right-0 w-50 bg-green-200 rounded-xl p-1 "
      >
        <section className="p-1 w-full justify-center flex-col flex">
          <p className="mx-2">{user_details?.users?.username}</p>
          <div className="flex items-center mx-2 ">
            <FaCopy
              className="hover:text-green-700 cursor-pointer"
              onClick={() => handleCopy(user_details?.users?.email)}
            />
            <p className="username select-text overflow-hidden text-ellipsis p-2 w-[90%]">
              @{user_details?.users?.email}+{user_details?.user_id}
            </p>
          </div>
          <div>
            {Options.map((i, index) => (
              <Link
                href={i.link}
                className="cursor-pointer select-none rounded-2xl hover:bg-white p-2 mb-2 flex gap-2 items-center"
                key={index}
              >
                {i.icon}
                <p>{i.item}</p>
              </Link>
            ))}
          </div>
          <button
            className="bg-red-500 select-none p-2 rounded-2xl cursor-pointer hover:text-white transition-all"
            onClick={handleSignOut}
          >
            Log out
          </button>
        </section>
      </div>
    );
  else return <></>;
};

export default Profile;
