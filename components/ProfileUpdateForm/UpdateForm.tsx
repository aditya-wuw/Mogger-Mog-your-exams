import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { AnimatePresence, motion } from "motion/react";
import { CreateContext } from "@/Context/ContextProvider";
const UpdateForm = () => {
  const  {isEditing,setisEditing} = CreateContext();
  const [Visi, setVisi] = useState<boolean | undefined>(false); 

  return (
    <AnimatePresence>
      {
        isEditing &&
      <motion.div
      className="flex items-center justify-center absolute 2xl:left-[40vw] left-[15vw]"
      animate={{ opacity: [0, 1] }}
      exit={{opacity:0}}
      key="modal"
      transition={{ duration: 1, ease: "easeInOut" }}
      >
        <form className="w-full max-w-xs bg-white p-6 border rounded-2xl  shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-center">Update Profile</h2>
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>
          <div className="relative">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type={Visi ? "text" : "password"}
              name="password"
              placeholder="************"
              className="w-full p-2 border rounded bg-white"
              />
            {Visi ? (
              <FaEye
              className="absolute w-5 h-5 bottom-3 right-5 hover:cursor-pointer"
              onClick={() => setVisi(!Visi)}
              />
            ) : (
              <IoIosEyeOff
              className="absolute w-5 h-5 bottom-3 right-5 hover:cursor-pointer"
              onClick={() => setVisi(!Visi)}
              />
            )}
          </div>
          <div className="flex gap-2">

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 cursor-pointer transition"
            >
            Update
          </button>
          <button
          onClick={()=>(setisEditing(false))}
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 cursor-pointer transition"
          >
            cancel
          </button>
            </div>
        </form>
      </motion.div>
  }
    </AnimatePresence>
  );
};

export default UpdateForm;
