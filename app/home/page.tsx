"use client";
import Mainbodynav from "@/components/home/BodyNav";
import InputField from "@/components/home/InputField";
import Sidebar from "@/components/home/Sidebar";
import { CreateContext } from "@/Context/ContextProvider";
import React from "react";

const Page = () => {
  const {setsidebar} = CreateContext();
  return (
    <div className="w-[100%] h-full flex">
      <Sidebar/>
      <main className="w-full h-full mx-4 " >
        <Mainbodynav />
        <section  className="mainContaine h-[90vh] relative" onClick={()=>setsidebar(true)}>
        </section>
        <InputField/>
      </main>
    </div>
  );
};

export default Page;
