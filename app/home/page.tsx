"use client";
import Feedback from "@/components/Feedbackform/feedback";
import Feedbackform from "@/components/Feedbackform/Feedbackform";
import Mainbodynav from "@/components/home/BodyNav";
import InputField from "@/components/home/InputField";
import Sidebar from "@/components/home/Sidebar";
import Loader from "@/components/Loader";
import { CreateContext } from "@/Context/ContextProvider";
import React, { useEffect } from "react";

const Page = () => {
  const {setsidebar,loader,setloader,SetTimerSlider,feedbackform} = CreateContext();
  useEffect(()=>{setloader(false)},[setloader])
  if(loader) return <div className="w-full h-screen flex justify-center items-center"><Loader/></div>
  return (
    <div className="w-[100%] h-full flex">
      <Sidebar/>
      <main className="w-full h-full mx-4 " >
        <Mainbodynav />
        <section  className="mainContaine md:h-[90vh] h-[86vh] relative" onClick={()=>{setsidebar(true);SetTimerSlider(false);}}>
          {feedbackform && <div className="flex justify-center items-center relative md:top-[-10%] top-[2%] z-10"><Feedbackform/></div>}
        </section>
        <InputField/>
        
      </main>
      <footer className="absolute bottom-0 w-full flex justify-center">
        <Feedback/>
      </footer>
    </div>
  );
};

export default Page;
