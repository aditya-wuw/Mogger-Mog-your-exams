import React from "react";
import Link from "next/link";
const Mogger = () => {
  return (
    <Link href='/home'
      className={`text-2xl cursor-pointer select-none px-3 p-2 w-33 text-white bg-green-700 overflow-hidden rounded-3xl`}
    >
      Mogger.AI
    </Link>
  );
};

export default Mogger;
