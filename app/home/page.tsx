"use client";
import Mainbodynav from "@/components/home/BodyNav";
import Sidebar from "@/components/home/Sidebar";
import React, { useState } from "react";

const Page = () => {
  
  return (
    <div className="w-[100%] h-full flex">
      <Sidebar/>
      <main className="w-full h-full mx-4">
        <Mainbodynav />
        <section>main body</section>
      </main>
    </div>
  );
};

export default Page;
