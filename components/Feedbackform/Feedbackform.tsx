import { CreateContext } from "@/Context/ContextProvider";
import axios from "axios";
import React, { useState } from "react";
import { easeInOut, motion } from "motion/react";
import { MdDone } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

const Feedbackform = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { user_details, setFeedbackForm } = CreateContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim() && user_details.user_id) {
      console.log("Submitted Feedback:", feedback, user_details?.user_id);
      await axios.post("/api/feedback", {
        user_id: user_details?.user_id,
        feedback: feedback,
      });
      setSubmitted(true);
      setTimeout(() => {
        setFeedbackForm(false);
      }, 3000);
    }
  };
  return (
    <motion.div
      className="max-w-md mx-auto mt-10 p-6 bg-green-300/30 backdrop-blur-2xl shadow-lg rounded-lg md:w-100 w-[90vw]"
      initial={{ y: -150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
    >
      {submitted ? (
        <p className="text-green-950 font-medium">
          Thank you for your feedback! Keep Mogging 😎
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4">Submit Your Feedback</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={5}
            placeholder="Write your feedback here..."
            className="w-full p-3 bg-white border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <div className="flex gap-1">
            <button
              type="submit"
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer flex gap-2 items-center"
            >
              <MdDone />
              Submit
            </button>
            <button
              type="submit"
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition  cursor-pointer flex gap-2 items-center"
              onClick={() => setFeedbackForm(false)}
            >
              back
              <IoArrowBack className="scale-x-[-1]" />
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default Feedbackform;
