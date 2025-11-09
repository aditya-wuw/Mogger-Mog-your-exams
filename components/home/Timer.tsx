"use client";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import { CreateContext } from "@/Context/ContextProvider";
import { useParams } from "next/navigation";

const Timer = ({ duration }: { duration: number }) => {
  const [timeleft, setTimeleft] = useState<number>(duration * 1000);
  const [isMounted, setIsMounted] = useState(false);
  const test_id = useParams();
  const { handlesubmit, Answer } = CreateContext();
  const Answerref = useRef(Answer);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setTimeleft(duration * 1000);
  }, [duration]);

  useEffect(() => {
    Answerref.current = Answer;
  }, [Answer]);

  useEffect(() => {
    if (!isMounted) return; // Don't run this effect until component is mounted

    let endtime: number;
    const storedEndtime = localStorage.getItem("endtime");

    if (!storedEndtime || duration * 1000 !== Number(storedEndtime) - Date.now()) {
      endtime = Date.now() + duration * 1000;
      localStorage.setItem("endtime", endtime.toString());
    } else {
      endtime = Number(storedEndtime);
    }

    const interval = setInterval(() => {
      const remaining = endtime - Date.now();
      setTimeleft(remaining > 0 ? remaining : 0);
      if (remaining <= 0) {
        setTimeout(() => {
          handlesubmit(test_id.id, Answerref.current);
        }, 1000);
        localStorage.removeItem("endtime");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, handlesubmit, test_id.id, isMounted]);

  const hours = Math.floor(timeleft / 3600000);
  const minutes = Math.floor((timeleft % 3600000) / 60000);
  const seconds = Math.floor((timeleft % 60000) / 1000);

  if (timeleft === duration * 1000)
    return (
      <div className="scale-50">
        <Loader />
      </div>
    );

  return (
    <div
      className={`p-2 text-2xl text-white transition duration-500 ease-in-out ${
        timeleft < duration * 0.1 * 1000
          ? "bg-red-500"
          : timeleft < duration * 0.5 * 1000
            ? "bg-yellow-400 text-yellow-950"
            : "bg-green-700"
      } rounded-2xl`}
    >
      {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </div>
  );
};

export default Timer;
