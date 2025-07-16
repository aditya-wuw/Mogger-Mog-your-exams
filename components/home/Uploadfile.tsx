"use client";
import { CreateContext } from "@/Context/ContextProvider";
import React from "react";
import { IoCloudUpload } from "react-icons/io5";

const Uploadfile = () => {
  const {setselectedfile} = CreateContext();
  const handlechange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) return setselectedfile((file:Array<Object>) =>[...file,...files]);
  }
  return (
    <div className="w-fit p-3 bg-green-400 rounded-xl text-white">
      <span className="flex items-center gap-2">
        <IoCloudUpload />
        <input type="file" multiple accept="pdf" name="file" className="hidden cursor-pointer" id="fileupload" onChange={handlechange}/>
        <label htmlFor="fileupload" className="cursor-pointer" >Upload file</label>
      </span>
    </div>
  );
};

export default Uploadfile;
