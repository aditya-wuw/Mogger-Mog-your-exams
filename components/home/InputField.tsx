"use client"
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaRegPlusSquare } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { uid } from 'uid';

const InputField = () => {
    const Router = useRouter();
    const [input,setinput] = useState<string>("");
    const handleClick = async () => {
        const payload = {
          id:uid(),
          contents:[{questions : "What is your name"},{questions : "What are you gooner ? "}]
        }
        console.log(input)
        setinput("")      
        Router.push(`/home/t/${payload.id}/${payload.contents}`);
    }

  return (
    <div className="flex justify-center items-center ">
       <h1 className="fixed select-none top-[40%] text-3xl md:text-6xl font-bold  z-[-10] text-center mx-10">Ready to <span className="px-6 p-1 bg-green-700 text-white rounded-xl">Mog</span> your exam ?</h1>
      <div className="text_input fixed top-[50%] bg-green-200 p-4 rounded-xl flex items-center gap-2 z-[5]">
        <input
          type="text"
          value={input}
          placeholder="What you want to prepare for to mog the exam 🤫🧏 bye bye ..."
          className="input_text w-70 md:w-150 bg-white p-2 outline-none text-green-900"
          onChange={(e)=>setinput(e.target.value)}
        />
        <div className="flex gap-2">
          <FaRegPlusSquare className="plus_icon w-5 h-5" />
          <button disabled={ input.length < 6} onClick={handleClick}><IoSend className={`send_icon cursor-pointer w-5 h-5 ${input.length < 6 ? "text-black hover:cursor-not-allowed" : "text-green-600"} `}/></button>  
        </div>
      </div>
    </div>
  );
};

export default InputField;
