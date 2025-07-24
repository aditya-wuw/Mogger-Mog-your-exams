"use client";
import { CreateContext } from "@/Context/ContextProvider";
import axios from "axios";
import React, { useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import Loader from "../Loader";

const Uploadfile = () => {
  const {
    file,
    setselectedfile,
    setuploader,
    user_details,
    setfilepath,
    setToastMount,
    setToastMessage,
  } = CreateContext();
  const [uploading, setuploading] = useState(false);

  const handlechange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setuploading(true);
    if (!files || files.length === 0) return setuploading(false);
    if (file && files) {
      if (files?.length > 1) {
        setToastMessage("select only 1 file at a time");
        setToastMount(true);
        setuploading(false);
        setuploader(false);
        return;
      } else {
        if (file.length === 1) {
          setToastMessage("file upload limit reached");
          setToastMount(true);
          setuploading(false);
          setuploader(false);
        } else {
          for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.set("Files", files[i]);
            formData.set("userid", user_details.user_id);
            const res = await axios.post("/api/auth/uploads/upload", formData);
            if (res.data.success) {
              const PDFlink = res.data.message.replaceAll(" ", "%20");
              setfilepath(PDFlink);
            }
          }
          setuploader(false);
          setuploading(false);
          setselectedfile((file: Array<object>) => [...file, ...files]);
        }
      }
    }
  };
  return (
    <div className="w-fit p-3 bg-green-400 rounded-xl text-white">
      <span className="flex items-center gap-2">
        <IoCloudUpload />
        <input
          type="file"
          multiple
          accept=".pdf"
          name="file"
          className="hidden cursor-pointer"
          id="fileupload"
          onChange={handlechange}
        />
        <label htmlFor="fileupload" className="cursor-pointer">
          {uploading ? (
            <div className="flex gap-2">
              <span className="mr-2">Uploading </span>{" "}
              <div className="size-2 scale-40 mr-3">
                <Loader />
              </div>
            </div>
          ) : (
            "Upload PDF"
          )}
        </label>
      </span>
    </div>
  );
};

export default Uploadfile;
