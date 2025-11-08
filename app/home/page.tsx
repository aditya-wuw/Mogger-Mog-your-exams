"use client";
import Feedback from "@/components/Feedbackform/feedback";
import Feedbackform from "@/components/Feedbackform/Feedbackform";
import InputField from "@/components/home/InputField";
import Loader from "@/components/Loader";
import Toast from "@/components/Toast";
import { CreateContext } from "@/Context/ContextProvider";
import React, { useEffect } from "react";

const Page = () => {
  const {setsidebar,loader,setloader,SetTimerSlider,feedbackform,setuploader,loadermessage,SETloadermessAGE,ToastMount,ToastMessage,setselectedfile} = CreateContext();
  useEffect(()=>{setloader(false);setsidebar(true);SETloadermessAGE("");setselectedfile([])},[setloader,setsidebar,setselectedfile,SETloadermessAGE])
  
  if(loader) return <div className="w-full h-screen flex justify-center items-center"><Loader message={loadermessage}/></div>
  return (
    <div>
        {ToastMount && <Toast message={ToastMessage} type_of="err"/>}
      <main>
        <section  className="mainContaine md:h-[90vh] h-[86vh] relative" onClick={()=>{SetTimerSlider(false);setuploader(false);}}>
          {feedbackform && <div className="flex justify-center items-center relative md:top-[-5%] top-[10%] z-6"><Feedbackform/></div>}
        </section>
        <InputField/> 
      </main>
      <footer className="absolute bottom-0.5 left-1/2 -translate-x-1/2">
        <Feedback/>
      </footer>
    </div>
  );
};

export default Page;
