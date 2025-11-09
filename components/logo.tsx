import React from "react";
import { FaClipboardCheck } from "react-icons/fa";

const Logo = () => {
  return (
    <div className="flex items-center">
      <FaClipboardCheck className="size-6 text-green-900" />
      <span className="lg:text-2xl font-bold drop-shadow-2xl select-none">Mogger.AI</span>
    </div>
  );
};

export default Logo;
