import Link from 'next/link';
import React from 'react'
import { FaClipboardCheck } from "react-icons/fa";
const NavBar = () => {
  return (
    <div className=' group md:w-[80%] w-full mx-2 px-3 mt-5 rounded-2xl h-10 flex justify-between p-8 bg-gradient-to-br from-green-900/30 hover:to-green-500/30 transition  to-green-500/20 border border-l-0 border-r-0  border-t-green-300/30  text-white items-center backdrop-blur-xs'>
       <Link href={'/'} className='flex items-center gap-2'>
          <FaClipboardCheck className='size-6 text-green-900'/>
          <span className='lg:text-2xl font-bold drop-shadow-2xl select-none'>Mogger.AI</span>
        </Link >
        <div className='flex gap-2'>
          <Link href={'/auth_/login'} className='p-2 bg-green-500 rounded-2xl hover:cursor-pointer hover:bg-green-700'>Login</Link>
          <Link href={'/auth_/SignUp'} className='p-2 bg-green-500 rounded-2xl hover:cursor-pointer hover:bg-green-700'>Sign Up</Link>
        </div>
    </div>
  )
}

export default NavBar
