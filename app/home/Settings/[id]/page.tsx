"use client";
import { MdDelete } from "react-icons/md";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { CreateContext } from "@/Context/ContextProvider";
import { GiHouseKeys } from "react-icons/gi";
import { RiLockPasswordFill } from "react-icons/ri";
import ProfileContainer from "@/components/home/profile/ProfileContainer";
import { TbArrowBack } from "react-icons/tb";
import ProfileSettings from "@/components/home/ProfileSettings";
import Loader from "@/components/Loader";
import Toast from "@/components/Toast";

const Page = () => {
  const param = useParams();
  const { Router, user_details, setloader, loader, ToastMessage } = CreateContext();

  useEffect(() => {
    setloader(true);
  }, [setloader]);

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
    Router.push("/home/Profile");
  }
  if (!loader)
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  return (
    <div>
      <Toast message={ToastMessage} type_of="err" />
      <h1 className="mt-5">
        The functions are still is not available right now, please wait untill it&apos;s added
      </h1>
      <section>
        <div className="mb-5">
          {user_details === undefined ? (
            <div className="flex justify-start w-20 mt-5">
              <Loader />
            </div>
          ) : (
            <ProfileSettings />
          )}
        </div>
        <div
          className="flex gap-3  w-fit p-3 rounded bg-green-200 items-center mt-2 cursor-pointer"
          onClick={handleUserpage}
        >
          <TbArrowBack className="w-5 h-5" />
          <span>user page</span>
        </div>
        <div className="flex gap-2 w-fit p-3 rounded bg-green-200 items-center mt-2 cursor-pointer">
          <RiLockPasswordFill />
          <span>Change email / password</span>
        </div>
      </section>
      <section>
        <div className="flex gap-2 w-fit p-3 rounded bg-green-200 items-center mt-2 cursor-pointer">
          <GiHouseKeys />
          <span>Two-factor authentication (2FA)</span>
        </div>
      </section>
      <section className="flex items-center gap-2 mt-3 bg-red-300 w-fit p-3 rounded">
        <ProfileContainer />
        <h1>delete account</h1>
        <button onClick={() => handleclick()}>
          <MdDelete className="text-red-500 w-5 h-5 cursor-pointer" />
        </button>
      </section>
    </div>
  );
};

export default Page;
