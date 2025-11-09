"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IoMdSettings } from "react-icons/io";
import { OptionType } from "@/Types/others/types";
import { CreateContext } from "@/Context/ContextProvider";
import Link from "next/link";
import { LogIn, UserCircle } from "lucide-react";

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
  }, [ProfileIconRef, setOpenProfile, GetUser]);

  useEffect(() => {
    if (user_details?.users?.profile_pic) {
      setprofile(user_details.users.profile_pic);
    }
  }, [user_details?.users?.profile_pic, setprofile, GetUser]);

  const Options: Array<OptionType> = [
    {
      item: user_details?.users?.email ?? "username",
      link: "none",
      icon: <LogIn size={18} className="shrink-0" />,
    },
    {
      item: "User Profile",
      link: "/home/Profile",
      icon: <UserCircle size={18} className="shrink-0" />,
    },
    {
      item: "Settings",
      link: `/home/Settings/${user_details?.user_id}`,
      icon: <IoMdSettings size={18} className="shrink-0" />,
    },
  ];

  if (OpenProfile)
    return (
      <div
        ref={Profileref}
        className="absolute z-10 top-13 right-0 w-50 bg-green-200 rounded-xl p-1 "
      >
        <section className="p-1 w-full justify-center flex-col flex">
          <div>
            {Options.map((i, index) => (
              <Link
                href={i.link && i.link !== "none" ? i.link : ""}
                className={`select-none rounded-2xl cursor-default ${i.link !== "none" && "hover:bg-white cursor-pointer"} p-1 px-2 flex gap-2 items-center mb-1`}
                key={index}
              >
                {i.icon}
                <p className="truncate">{i.item}</p>
              </Link>
            ))}
          </div>
          <button
            className="mt-1 bg-green-700 select-none p-1 rounded-2xl text-white cursor-pointer hover:bg-green-800 transition-all"
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
