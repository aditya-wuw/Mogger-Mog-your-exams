"use client";
import { MdDelete } from "react-icons/md";
import React from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { CreateContext } from "@/Context/ContextProvider";
import Sidebar from "@/components/home/Sidebar";
import { GiHouseKeys } from "react-icons/gi";
import { RiLockPasswordFill } from "react-icons/ri";
import Mainbodynav from "@/components/home/BodyNav";
import ProfileContainer from "@/components/home/profile/ProfileContainer";
import { TbArrowBack } from "react-icons/tb";

const Page = () => {
  const param = useParams();
  const { Router, setloader } = CreateContext();
  
  async function handleclick() {
    const c = confirm("Are you sure you want to delete this account ?");
    if (c) {
      setloader(true);
      const res = await axios.delete("/api/auth/delete_acc", {
        data: { user_id: param.id },
      });
      if (res.data.success) {
        console.log(res.data.message);
        Router.push("/");
      }
    }
  }

  function handleUserpage() {
    Router.push('/home/Profile')
  }
  return (
    <div className="w-[100%] h-full flex">
      <Sidebar />
      <main className="w-full mx-5">
        <Mainbodynav />
        <h1 className="mt-5">The functions are still is not available right now, please wait untill it&apos;s added</h1>
        <section>
          <div className="flex gap-3  w-fit p-3 rounded bg-green-200 items-center mt-2 cursor-pointer" onClick={handleUserpage}>
            <TbArrowBack className="w-5 h-5"/>
            <span>
              user page
            </span>
          </div>
          <div className="flex gap-2 w-fit p-3 rounded bg-green-200 items-center mt-2 cursor-pointer">
            <RiLockPasswordFill/>
            <span>
              Change email / password
            </span>
          </div>
        </section>
        <section>
          <div className="flex gap-2 w-fit p-3 rounded bg-green-200 items-center mt-2 cursor-pointer">
            <GiHouseKeys/>
            <span>
              Two-factor authentication (2FA)
            </span>
          </div>
        </section>
        <section className="flex items-center gap-2 mt-3 bg-red-300 w-fit p-3 rounded">
          <ProfileContainer/>
          <h1>delete account</h1>
          <button onClick={() => handleclick()}>
            <MdDelete className="text-red-500 w-5 h-5 cursor-pointer" />
          </button>
        </section>
      </main>
    </div>
  );
};

export default Page;
