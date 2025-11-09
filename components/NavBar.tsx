import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaClipboardCheck, FaGithub } from "react-icons/fa";
const NavBar = () => {
  return (
    <div className="md:w-[80%] w-full mx-2 px-3 mt-5 rounded-2xl h-10 flex justify-between p-8 bg-linear-to-br from-green-900/30 hover:to-green-500/30 transition  to-green-500/20 border border-l-0 border-r-0  border-t-green-300/30  text-white items-center backdrop-blur-xs">
      <Link href={"/"} className="flex items-center gap-2">
        <FaClipboardCheck className="size-6 text-green-900" />
        <span className="lg:text-2xl font-bold drop-shadow-2xl select-none">
          Mogger.AI
        </span>
      </Link>
      <div className="flex gap-5 items-center">
        <a
          target="_blank"
          href={"https://github.com/aditya-wuw/Mogger-Mog-your-exams.git"}
          className="cursor-pointer hover:text-green-800 transition duration-100 ease-in-out relative"
        >
          <span className="group">
            <FaGithub size={30} />
            <span className="absolute pointer-events-none flex gap-2 items-center justify-center text-sm right-10 -bottom-1 opacity-0 group-hover:opacity-100 bg-green-700 rounded-2xl p-2 text-white w-20">
              star ?
              <Star size={15} />
            </span>
          </span>
        </a>
        <Link
          href={"/auth_/login"}
          className="p-2 bg-green-500 rounded-2xl hover:cursor-pointer hover:bg-green-700"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
