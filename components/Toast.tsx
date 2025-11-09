import { Toaster } from "@/Types/others/types";
import { MdOutlineError } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { easeInOut, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { CreateContext } from "@/Context/ContextProvider";

const Toast = ({ message, type_of }: Toaster) => {
  const [closed, setclosed] = useState(false);
  const { ToastMount, setToastMount } = CreateContext();

  function handleClose() {
    setclosed(true);
    setTimeout(() => {
      setToastMount(false);
    }, 1000);
  }
  useEffect(() => {
    if (!ToastMount) return;
    const timeout = setTimeout(() => {
      setToastMount(false);
    }, 6000);
    return () => {
      clearTimeout(timeout);
    };
  }, [setToastMount, ToastMount]);

  if (ToastMount)
    return (
      <div className={"absolute flex justify-center lg:top-10 md:top-15 top-20"}>
        <motion.div
          className={`min-w-70 max-w-100 h-15 p-5 relative ${type_of && type_of === "err" ? "bg-red-500" : type_of === "warn" ? "bg-yellow-500" : "bg-green-400"} rounded-2xl pl-3 
      items-center flex`}
          initial={!closed && { y: -160 }}
          animate={closed ? { y: [0, -160] } : { y: 0 }}
          transition={
            closed
              ? { duration: 0.5, ease: easeInOut }
              : {
                  duration: 1,
                  ease: easeInOut,
                  repeatDelay: 2,
                  repeat: 1,
                  repeatType: "reverse",
                }
          }
        >
          <span>
            {type_of === "err" ? (
              <MdOutlineError className="w-6 h-6 text-red-800 mr-2" />
            ) : type_of === "warn" ? (
              <IoIosWarning className="w-6 h-6 text-yellow-700 mr-2" />
            ) : (
              ""
            )}
          </span>
          <span className="overflow-hidden truncate w-[85%] text-white">{message}</span>
          <span>
            <button
              className="flex absolute bottom-[21px] right-5 cursor-pointer z-4"
              onClick={handleClose}
            >
              <IoMdCloseCircle className="w-5 h-5" />
            </button>
          </span>
        </motion.div>
      </div>
    );
};

export default Toast;
