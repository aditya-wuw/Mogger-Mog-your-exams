"use client";
import { CreateContext } from "@/Context/ContextProvider";
import axios from "axios";
import React, { useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import Loader from "../Loader";
import { users_details_ } from "@/Types/others/types"; // Assuming users_details_ has a user_id property
import { toast } from "react-toastify";

const Uploadfile = () => {
  const {
    file: existingFiles, 
    setselectedfile,
    setuploader,
    user_details, 
    setfilepath,
    setToastMount,
    setToastMessage,
  } = CreateContext();

  const [uploading, setuploading] = useState(false);

  const handlechange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files;
    if (!f || f.length === 0) {
      setuploading(false);
      return;
    }
    setuploading(true);
    if (f.length > 1) {
      setuploading(false);
      e.target.value = ""; 
      return;
    }
    if (existingFiles && existingFiles.length >= 1) { 
      setuploading(false);
      e.target.value = "";
      return;
    }

    try {
      const fileToUpload = f[0];
      const userId = (user_details as users_details_ | undefined)?.user_id;

      if (!userId) {
        setuploading(false);
        e.target.value = "";
        return;
      }
      
      const formData = new FormData();
      formData.set("Files", fileToUpload);
      formData.set("userid", userId.toString());

      const res = await axios.post("/api/auth/uploads/upload", formData);

      if (res.data.success) {
        const PDFlink = res.data.message.replaceAll(" ", "%20");
        setfilepath(PDFlink);
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setselectedfile((prevFiles: any) => [...prevFiles, fileToUpload]);
      } else {
        setToastMessage(`Upload failed: ${res.data.message || "Unknown error"}`);
        setToastMount(true);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setToastMessage("An error occurred during upload.");
      setToastMount(true);
    } finally {
      setuploader(false);
      setuploading(false);
      // Reset input value to allow the same file to be selected again if needed
      e.target.value = ""; 
    }
  };

  // console.log(currentFiles); // Retaining the console log for debug

  return (
    <div className="w-fit p-3 bg-green-600 rounded-xl text-white">
      <span className="flex items-center gap-2">
        <IoCloudUpload />
        <input
          type="file"
          // Removed 'multiple' attribute as per the single-file limit
          accept=".pdf"
          name="file"
          className="hidden cursor-pointer"
          id="fileupload"
          // Disabled if the Context already tracks an uploaded file (assuming limit is 1)
          // disabled={existingFiles?.length >= 1} 
          disabled={true} 
          onChange={handlechange}
        />
        <label htmlFor="fileupload" className="cursor-pointer" onClick={()=>toast.error("Currently Unavailable")}>

          {uploading ? (
            <div className="flex gap-2">
              <span className="mr-2">Uploading</span>
              <div className="size-2 scale-40 mr-3">
                <Loader />
              </div>
            </div>
          ) :existingFiles?.length >= 1 ? "Max limit" : "Upload PDF"}
        </label>
      </span>
    </div>
  );
};

export default Uploadfile;