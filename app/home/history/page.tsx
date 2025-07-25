"use client";
import Mainbodynav from "@/components/home/BodyNav";
import Sidebar from "@/components/home/Sidebar";
import TimerField from "@/components/home/TimerField";
import Loader from "@/components/Loader";
import { CreateContext } from "@/Context/ContextProvider";
import { history } from "@/Types/others/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const Page = () => {
  const { user_details, setloader, TimerUser, loader, setsidebar } = CreateContext();
  const [historyData, setHistoryData] = useState<Array<history>>([]);
  const [retakeMap, setRetakeMap] = useState<Record<string, boolean>>({});

  const router = useRouter();

  async function handleDelete(id: string) {
    await axios.delete(`/api/delete?id=${id}&user_id=${user_details?.user_id}`);
    setHistoryData((prev) => prev.filter((item) => item.id !== id));
  }

  async function handleTest(id: string) {
    if (id) {
      if (TimerUser === 0) {
        sessionStorage.setItem("duration", "1800");
        router.push(`/home/t/${id}`);
      } else {
        sessionStorage.setItem("duration", TimerUser);
        router.push(`/home/t/${id}`);
      }
    }
  }

  const getHistory = useCallback(async (id: number) => {
    const res = await axios.get(`/api/history?id=${id}`);
    if (res.data.success === true) {
      setHistoryData(res.data.message);
      setloader(false);
    }
  },[setloader])
  
  useEffect(() => {
    setloader(true);
    setsidebar(true);
  }, [setloader,user_details?.user_id,setsidebar]);

  useEffect(() => {
    if (user_details?.user_id !== undefined) {
      getHistory(user_details?.user_id);
    }
  }, [user_details?.user_id,getHistory]);
  

  if (loader)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <main className="w-full px-4 overflow-hidden mb-5">
        <Mainbodynav />
        <div className="mt-5">
          <strong className="text-2xl">History</strong>
          {historyData.length === 0 ? (
            <div className="w-full h-fit flex justify-center">
              no history found
            </div>
          ) : (
            <div className="md:h-[43vw]  h-screen overflow-y-scroll">
              {historyData.map((i, index) => (
                <div
                  key={i.id}
                  className="flex w-full justify-between md:px-10 px-2 mt-5 items-center"
                >
                  <div className="flex gap-2 md:w-[70%] mr-1">
                    <span>{index + 1})</span>
                    <span className="w-40 md:w-[100vw] text-nowrap truncate font-bold">
                      {i.title}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {retakeMap[i.id] ? (
                      <div className="relative w-full ">
                        <div className="absolute w-60 md:left-[-170px] left-[-190px] top-[-5] bg-green-400 rounded-2xl p-3">
                          <TimerField />
                          <div className="flex gap-2 mt-2 mx-auto">
                            <button
                              type="button"
                              className="p-2 rounded bg-green-700 cursor-pointer hover:bg-green-500/90 text-white"
                              onClick={() => handleTest(i.id)}
                            >
                              Retake test
                            </button>
                            <button
                              onClick={() =>
                                setRetakeMap((prev) => ({
                                  ...prev,
                                  [i.id]: false,
                                }))
                              }
                              className="p-2 rounded bg-gray-300 cursor-pointer hover:bg-gray-300/50"
                            >
                              Back
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="p-2 rounded bg-green-400 cursor-pointer hover:bg-green-500/50"
                        onClick={() => {
                          setRetakeMap((prev) => ({
                            ...prev,
                            [i.id]: true,
                          }));
                        }}
                      >
                        Retake
                      </button>
                    )}

                    <button
                      type="button"
                      className="p-2 rounded text-red-500 cursor-pointer hover:text-red-500/80"
                      onClick={() => handleDelete(i.id)}
                    >
                      <MdDelete className="w-7 h-7"/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
