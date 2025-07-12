"use client";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaRegPlusSquare } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { uid } from "uid";
import axios from "axios";
import { CreateContext } from "@/Context/ContextProvider";
import { testQuestionSaveObject } from "@/Types/others/types";
import Loader from "../Loader";
import TimerField from "./TimerField";
import { MdTimer } from "react-icons/md";
import Uploadfile from "./Uploadfile";

const InputField = () => {
  const Router = useRouter();
  const [input, setinput] = useState<string>("");
  const [error, seterror] = useState("");
  

  const {TimerSlider,SetTimerSlider,setTimer,uploader, setuploader} = CreateContext();

  const {
    setquestions,
    loader,
    setloader,
    user_details,
    GetUser,
    TimerUser
  } = CreateContext();

  useEffect(()=>{SetTimerSlider(false); setTimer(1800);},[SetTimerSlider,setTimer])

  const handleClick = async () => {
    setinput("");
    setloader(true);
    const id = uid();
    try {
      const res = await axios.post("/api/generatetest/gen", { prompt: input });
      const data = JSON.parse(res.data.message);
      setquestions(data.questions_key);
      const savedata: testQuestionSaveObject = {
        id: id,
        user_id: user_details.user_id,
        title: input,
        questions: data.questions_key,
        answers: data.answer_key,
      };
      const res2 = await axios.post("/api/generatetest/save", savedata);
      if (res2.data.success === false) {
        setloader(false);
        seterror(res2.data.message);
      } else {
        setloader(false);
        sessionStorage.setItem('duration',TimerUser);
        Router.push(`/home/t/${id}`);
        GetUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loader)
    return (
      <div className="absolute top-[50%] left-[50%]">
        {/* use tost to show the error message later  */}
        <Loader /> {error} 
      </div>
    );
  return (
    <div className="flex justify-center items-center relative">
      <h1 className="fixed select-none top-[40%] text-3xl md:text-6xl font-bold  z-[-10] text-center mx-10">
        Ready to{" "}
        <span className="px-6 p-1 bg-green-700 text-white rounded-xl">Mog</span>{" "}
        your exam ?
      </h1>
      <div className="text_input fixed top-[50%] md:mt-8 mt-5 bg-green-200 p-4 rounded-xl flex items-center gap-2 z-[5]">
        <input
          type="text"
          value={input}
          placeholder="What you want to prepare for to mog the exam 🤫🧏 bye bye ..."
          className="input_text w-[60vw] md:w-150 p-2 outline-none text-green-900"
          onClick={()=>{SetTimerSlider(false);setuploader(false);}} 
          onChange={(e) => setinput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />  
        <div className="flex gap-2">
        <div className="relative">
          <MdTimer onClick={()=>{SetTimerSlider(!TimerSlider);setuploader(false)}} className="w-5 h-5 cursor-pointer"/>
          <div className={`${TimerSlider ? "block" : "hidden"} absolute md:left-[-50] left-[-70] bottom-8 w-40`}><TimerField /></div>
        </div>
        <div className="relative">
          <FaRegPlusSquare className="upload_file w-5 h-5 cursor-pointer" onClick={()=>{setuploader(!uploader);SetTimerSlider(false)}}/>
          <div className={`${uploader ? "block" : "hidden"} absolute md:left-[-80] left-[-90] bottom-8 w-40`}><Uploadfile /></div>
        </div>
        <button disabled={input.length < 6} onClick={handleClick}>
          <IoSend className={`send_icon cursor-pointer w-5 h-5 ${input.length < 6 ? "text-black hover:cursor-not-allowed" : "text-green-600"} `}/>
        </button>
        </div>
      </div>
    </div>
  );
};

export default InputField;
