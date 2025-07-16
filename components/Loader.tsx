import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { easeInOut, motion } from "motion/react";
const Loader = ({ message }: { message?: string }) => {
  const [Message, setmessage] = useState<string | undefined>("");
  useEffect(() => {
    setTimeout(() => {
      setmessage(message);
    }, 3000);
  }, []);

  return (
    <div className="flex justify-center text-center flex-col items-center gap-5 relative w-full">
      <HashLoader
        color="green"
        cssOverride={{}}
        loading
        speedMultiplier={1.5}
      />
      {Message && Message?.length > 0 ? (
        <motion.h1
          className={`text-black text-xl absolute bottom-[-50] `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, ease: easeInOut }}
        >
          {Message}
        </motion.h1>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Loader;
