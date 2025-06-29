"use client"
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CreateContext } from "@/Context/ContextProvider";
import Sidebar from "./Sidebar";
const Mainbodynav = () => {
  const {isSidebar,setsidebar} = CreateContext();
  return (
    <div className="w-full flex justify-between  mt-3">
      <div>
        <div>
            {isSidebar && <GiHamburgerMenu onClick={()=>setsidebar(!Sidebar)}/>}
        </div>
        <div>buttons</div>
      </div>
      <div className="flex gap-2 items-center">
        <p>dsadasdasas</p>
        <div className="w-10 h-10 text-center flex justify-center items-center rounded-full bg-green-800">
          P
        </div>
      </div>
    </div>
  );
};

export default Mainbodynav;
