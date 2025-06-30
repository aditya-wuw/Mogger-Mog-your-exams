"use client"
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaRegPlusSquare } from "react-icons/fa";


const InputField = () => {

    const [input,setinput] = useState<string>("");
    const handleClick = async () => {
        console.log(input)
        setinput("")      
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
          <button disabled={ input.length < 1} onClick={handleClick}><IoSend className={`send_icon w-5 h-5 ${input.length < 1 ? "text-black" : "text-green-600"} `}/></button>  
        </div>
      </div>
    </div>
  );
};

export default InputField;
