"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaRegPlusSquare } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { uid } from "uid";
import axios from "axios";
import { CreateContext } from "@/Context/ContextProvider";
import { testQuestionSaveObject } from "@/Types/others/types";
import TimerField from "./TimerField";
import { MdTimer } from "react-icons/md";
import Uploadfile from "./Uploadfile";
import { FaFilePdf } from "react-icons/fa6";
import { CiSquareRemove } from "react-icons/ci";
const InputField = () => {
  const Router = useRouter();
  const [input, setinput] = useState<string>("");
  const [error, seterror] = useState<string>();
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const { TimerSlider, SetTimerSlider, setTimer, uploader, setuploader, file } =
    CreateContext();

  const {
    setquestions,
    SETloadermessAGE,
    setloader,
    user_details,
    GetUser,
    TimerUser,
  } = CreateContext();

  useEffect(() => {
    SetTimerSlider(false);
    setTimer(1800);
    seterror("");
  }, [SetTimerSlider, setTimer, seterror]);

  const handleClick = async () => {
    setinput("");
    setloader(true);
    const id = uid();
    try {
      SETloadermessAGE("generating Mock test, might take a while ...")
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
        sessionStorage.setItem("duration", TimerUser);
        Router.push(`/home/t/${id}`);
        setloader(false);
        GetUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center relative">
      <div>{error} </div>
      <h1 className="fixed select-none top-[40%] text-3xl md:text-6xl font-bold  z-[-10] text-center mx-10">
        Ready to{" "}
        <span className="px-6 p-1 bg-green-700 text-white rounded-xl">Mog</span>{" "}
        your exam ?
      </h1>
      <div className="text_input fixed top-[50%] md:mt-8 mt-5 bg-green-200 p-4 rounded-xl flex flex-col items-center gap-2 z-[5]">
        <div className="flex gap-3 justify-start w-full">
          {file.map((i: { name: string }, index: number) => (
            <div
              key={index}
              className="bg-green-500 p-2 rounded-2xl text-white flex"
            >
              <div>
                <FaFilePdf />
                <h1 className="max-w-35  truncate">{i?.name}</h1>
              </div>
              <button>
                <CiSquareRemove className="text-red-600 cursor-pointer" />
              </button>
            </div>
          ))}
        </div>
        <textarea
          ref={textarea}
          value={input}
          placeholder="what's the topic 🤫🧏 ..."
          className={`input_text w-[80vw] md:w-150 resize-none p-2 outline-none text-green-900  focus:outline-none border-none ${textarea.current && textarea.current.value.length > 130 ? "h-30" : "h-10"} transition-all ease-in-out duration-200`}
          onClick={() => {
            SetTimerSlider(false);
            setuploader(false);
          }}
          onChange={(e) => setinput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />

        <div className="flex gap-3 w-full justify-end">
          <div className="relative">
            <MdTimer
              onClick={() => {
                SetTimerSlider(!TimerSlider);
                setuploader(false);
              }}
              className="w-5 h-5 cursor-pointer"
            />
            <div
              className={`${TimerSlider ? "block" : "hidden"} absolute md:left-[-50] left-[-70] bottom-8 w-40`}
            >
              <TimerField />
            </div>
          </div>
          <div className="relative">
            <FaRegPlusSquare
              className="upload_file w-5 h-5 cursor-pointer"
              onClick={() => {
                setuploader(!uploader);
                SetTimerSlider(false);
              }}
            />
            <div
              className={`${uploader ? "block" : "hidden"} absolute md:left-[-80] left-[-90] bottom-8 w-40`}
            >
              <Uploadfile />
            </div>
          </div>
          <button disabled={input.length < 6} onClick={handleClick}>
            <IoSend
              className={`send_icon cursor-pointer w-5 h-5 ${input.length < 6 ? "text-black hover:cursor-not-allowed" : "text-green-600"} `}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputField;
