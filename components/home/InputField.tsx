"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { uid } from "uid";
import axios from "axios";
import { CreateContext } from "@/Context/ContextProvider";
import { flag, testQuestionSaveObject } from "@/Types/others/types";
import TimerField from "./TimerField";
import { MdTimer } from "react-icons/md";
import Uploadfile from "./Uploadfile";
import { FaFilePdf } from "react-icons/fa6";
import { AiFillCloseSquare } from "react-icons/ai";
import { UploadCloudIcon } from "lucide-react";

const InputField = () => {
  const Router = useRouter();
  const [input, setinput] = useState<string>("");
  const [error, seterror] = useState<string>();
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const {
    TimerSlider,
    SetTimerSlider,
    setTimer,
    uploader,
    setuploader,
    file,
    setselectedfile,
    filepath,
  } = CreateContext();

  const { setquestions, SETloadermessAGE, setloader, user_details, GetUser, TimerUser } =
    CreateContext();

  const delete_cache = useCallback(async () => {
    if (user_details) {
      const res = await axios.delete(`/api/auth/uploads/del_cache?user_id=${user_details.user_id}`);
      if (!res.data.success) {
        console.log("failed to clear upload cache");
      }
    }
  }, [user_details]);

  useEffect(() => {
    SetTimerSlider(false);
    setTimer(1800);
    setloader(false);
    seterror("");
    delete_cache();
  }, [SetTimerSlider, setTimer, seterror, setloader, delete_cache]);

  const handleClick = async () => {
    setinput("");
    setloader(true);
    const id = uid();
    try {
      SETloadermessAGE("generating Mock test, might take a while ...");
      let res;
      if (filepath) {
        res = await axios.post("/api/generatetest/gen", { prompt: input, filepath: filepath });
        const usedflag: flag = {
          user_id: user_details.user_id,
          path: filepath.split("notes/")[1].replaceAll("%20", " "),
          value: true,
        };
        const result = await axios.put("api/auth/uploads/used", usedflag);
        if (!result.data.success) {
          console.log(result.data.error);
          return;
        }
      } else {
        res = await axios.post("/api/generatetest/gen", { prompt: input });
      }

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
        GetUser();
      }
    } catch (error) {
      setloader(false);
      alert("generation failed");
      console.log(error);
    }
  };

  const handledelete = async (index: number) => {
    const del = file.filter((_: string, i: number) => i !== index);
    setselectedfile(del);
    await axios.delete("/api/auth/uploads/del", {
      data: { user_id: user_details?.user_id, file_name: file[index].name },
    });
  };

  return (
    <div className="flex justify-center items-center relative">
      <div>{error} </div>
      <h1 className="fixed select-none top-[40%] text-3xl md:text-4xl font-bold  -z-10 text-center mx-10">
        Ready to <span className="px-6 p-1 bg-green-700 text-white rounded-xl">Mog</span> your exam
        ?
      </h1>
      <div className="text_input fixed top-[50%] md:mt-8 mt-5 bg-green-200 p-4 rounded-xl flex flex-col items-center gap-2 z-5">
        <div className="w-full">
          {file.map((i: File, index: number) => (
            <div key={index} className="bg-green-600 p-2 rounded-2xl text-white flex w-fit">
              <div className="flex items-center gap-1">
                <FaFilePdf />
                <h1 className="max-w-15 md:max-w-30 lg:max-w-35 truncate">{i?.name}</h1>
              </div>
              <button onClick={() => handledelete(index)}>
                <AiFillCloseSquare className="text-green-800 cursor-pointer ml-2" size={20} />
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
              className={`${TimerSlider ? "block" : "hidden"} absolute md:left-[-50] left-[-90] bottom-8 w-50`}
            >
              <TimerField />
            </div>
          </div>
          <div className="relative">
            <UploadCloudIcon
              className="upload_file w-5 h-5 cursor-pointer"
              onClick={() => {
                setuploader(!uploader);
                SetTimerSlider(false);
              }}
            />
            <div className={`${uploader ? "block" : "hidden"} absolute left-[-75] bottom-8 w-40`}>
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
