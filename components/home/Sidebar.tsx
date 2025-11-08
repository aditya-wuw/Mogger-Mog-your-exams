"use client";
import React, { use, useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { CreateContext } from "@/Context/ContextProvider";
import Link from "next/link";
import { SidebarTypes } from "@/Types/others/types";

const Sidebar = () => {
  const { isSidebar, setsidebar } = CreateContext();
  const [CurrentPath, SetCurrentPath] = useState<string>("");

  const sidebarItems: Array<SidebarTypes> = [
    { item: "Home", link: "/home" },
    { item: "Chat Mode", link: "/home/Chat" },
    { item: "Notes Creation", link: "/home/Notes_Creation" },
    { item: "Uploaded Notes", link: "/home/PrevNotes" },
    { item: "Performance", link: "/home/Performance" },
    { item: "History", link: "/home/history" },
  ];

  const setCurrent = async (destination:string) => {
    const path = destination.split("/").slice(-1)[0];
    SetCurrentPath(path);
  };

  useEffect(()=>{
    setCurrent(window.location.href)
  },[])

  return (
    <div
      className={`fixed select-none lg:relative overflow-hidden z-10 top-0 left-0 h-screen bg-green-800/20 transition-all duration-500 ease-in-out backdrop-blur-md px-3
        ${isSidebar ? "translate-x-0 w-[80%] md:w-[20%]" : "-translate-x-full w-0"}`}
    >
      <main>
        <div
          className={`min-h-screen ${isSidebar ? "opacity-100" : "opacity-0"} transtion duration-300 ease-in-out`}
        >
          <section className="Header flex items-center justify-between w-full pt-5 mx-1">
            <div>
              <p
                className={`text-2xl select-none p-3 bg-white overflow-hidden rounded-3xl`}
              >
                Mogger.AI
              </p>
            </div>
            <div>
              <IoChevronBack
                className="text-white size-10 cursor-pointer mr-2"
                onClick={() => setsidebar(!isSidebar)}
              />
            </div>
          </section>
          <section className="history mt-10 h-70 p-2 rounded-2xl text-green flex flex-col text-xl gap-3">
            {sidebarItems.map((i, index) => (
              <Link
                href={i.link}
                onClick={()=>setCurrent(i.link)}
                className={`hover:bg-white rounded-2xl cursor-pointer px-2 p-2 text-start w-300 text-md ${i.link.split("/").slice(-1)[0] === CurrentPath && "bg-white"}`}
                key={index}
              >
                {i.item}
              </Link>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
