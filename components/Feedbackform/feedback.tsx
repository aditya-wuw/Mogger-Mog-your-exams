"use client";
import { CreateContext } from "@/Context/ContextProvider";
import React from "react";

const Feedback = () => {
  const { feedbackform, setFeedbackForm } = CreateContext();
  if (feedbackform) return <></>;
  return (
    <div
      onClick={() => setFeedbackForm(true)}
      className="px-2 pt-2 bg-green-500 rounded-tl-2xl rounded-tr-2xl w-fit md:text-xl cursor-pointer select-none"
    >
      feedback
    </div>
  );
};

export default Feedback;
