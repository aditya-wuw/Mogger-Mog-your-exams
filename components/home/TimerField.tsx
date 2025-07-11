import { CreateContext } from "@/Context/ContextProvider";
import { formatTime } from "@/utils/util";
import React, { useEffect, useState } from "react";

const TimerField = () => {
  const [mode, setMode] = useState<"minute" | "hour" | "custom">("minute");
  const [minute, setMinute] = useState<number>(0);
  const [hour, setHour] = useState<number>(0);
  const [customMinute, setCustomMinute] = useState<number>(0);
  const [customHour, setCustomHour] = useState<number>(0);
  const { TimerUser, setTimer } = CreateContext();
  
  useEffect(() => {
    if (TimerUser === 0) {
      setTimer(1800);
    }
  }, [setTimer,TimerUser]);

  useEffect(() => {
    if (mode === "minute") {
      setTimer(minute * 60);
    } else if (mode === "hour") {
      setTimer(hour * 60 * 60);
    } else if (mode === "custom") {
      setTimer(customHour * 60 * 60 + customMinute * 60);
    }
  }, [mode, minute, hour, customMinute, customHour, setTimer]);

  return (
    <div className="flex flex-col gap-4 bg-green-600 p-3 rounded-2xl justify-center text-center">
      <h1 className="text-xl font-semibold">Set Timer</h1>
      <select
        value={mode}
        onChange={(e) =>
          setMode(e.target.value as "minute" | "hour" | "custom")
        }
        className="p-2 bg-gray-100 outline-0 cursor-pointer"
      >
        <option value="minute">Minute</option>
        <option value="hour">Hour</option>
        <option value="custom">Custom</option>
      </select>
      {mode === "minute" && (
        <select
          value={minute}
          onChange={(e) => setMinute(parseInt(e.target.value))}
          className="p-2 bg-blue-100 outline-0 cursor-pointer"
        >
          {[0, 5, 10, 20, 30, 40, 50, 60].map((min) => (
            <option key={min} value={min}>
              {min} min
            </option>
          ))}
        </select>
      )}

      {mode === "hour" && (
        <select
          value={hour}
          onChange={(e) => setHour(parseInt(e.target.value))}
          className="p-2 bg-yellow-100 outline-0 cursor-pointer"
        >
          {[0, 1, 2, 3, 4].map((h) => (
            <option key={h} value={h}>
              {h} hr
            </option>
          ))}
        </select>
      )}
      {mode === "custom" && (
        <div className="flex gap-2 items-center">
          <input
            type="number"
            className="w-16 p-2 bg-green-200"
            placeholder="Hrs"
            onChange={(e) => setCustomHour(parseInt(e.target.value) || 0)}
          />
          <input
            type="number"
            className="w-16 p-2 bg-green-200"
            placeholder="Min"
            onChange={(e) => setCustomMinute(parseInt(e.target.value) || 0)}
          />
        </div>
      )}
      <p className="text-sm text-gray-700">
        ⏱️ Timer set to:
        <strong className="text-white">
          {TimerUser === 0
            ? "00h: 30m"
            : `${formatTime(TimerUser).split(":").slice(0, 2).join("h: ")}m`}
        </strong>
      </p>
    </div>
  );
};

export default TimerField;
