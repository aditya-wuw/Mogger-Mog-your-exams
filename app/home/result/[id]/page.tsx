"use client";

import Loader from "@/components/Loader";
import { CreateContext } from "@/Context/ContextProvider";
import { testObject, valided_answers } from "@/Types/others/types";
import React, { useEffect } from "react";
import { MdDelete, MdReviews } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";

const Page = () => {
  const test_id = useParams();
  const { result, Answer, user_details, Router, setAnswer } = CreateContext();
  useEffect(() => {
    if (!result) {
      alert("result not available");
      setAnswer([]);
      Router.push("/home");
    }
  }, [user_details?.user_id, Router, result, setAnswer]);

  async function handledelete() {
    const Prompt: boolean = confirm("you want to delele the questions ?");
    if (Prompt) {
      const res = await axios.delete(
        `/api/delete?id=${test_id.id}&user_id=${user_details?.user_id}`,
      );
      if (res.data.success) {
        setAnswer([]);
        Router.push("/home");
      }
    }
  }

  const correct = result?.Validated_answers.filter(
    (ans: valided_answers) => ans?.given_answer === true,
  ).length;
  const wrong = result?.Validated_answers.filter(
    (ans: valided_answers) => ans?.given_answer === false,
  ).length;
  const total = result?.qustions_details?.questions.length;

  if (!result)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loader />
      </div>
    );
  return (
    <div>
      <div className="mt-18 px-2 w-full md:h-[85vh] md:overflow-y-scroll scroll-smooth scroll-me-1">
        <section className="result_bord select-none bg-green-500 rounded-2xl p-2 mb-3 md:w-[30%] mx-auto text-white">
          <div className="score_card p-2 text-center">
            <div className="font-bold text-2xl">
              {correct > total * 0.7
                ? `You are on a roll ! keep it up 🎉 ${user_details?.users?.username ?? "Jimbob"}`
                : correct > total / 2
                  ? `It's ok mate batter luck next time 😎 ${user_details?.users?.username ?? "Jimbob"}`
                  : `You gonna get Cooked lil ${user_details?.users?.username ?? "Jimbob"}! 😔`}
            </div>
            <div>you got <span className="text-green-700 font-bold">✅{correct}</span> correct</div>
            <div>and ❌<span className="text-red-500  font-bold">{wrong}</span> answer wrong  out of {total}</div>
            <div className="w-full flex justify-center mt-2">
              <div className="text-center p-2 bg-yellow-600 rounded-xl w-fit">
                ⚠️ warning the answer report&apos;ll not be saved
              </div>
            </div>
          </div>
        </section>
        <p className="text-xl md:text-2xl font-bold md:mx-[10%] mx-2 flex gap-2 items-center m-2">
          <MdReviews />
          Review
        </p>
        <section className="mx-2 md:mx-[10%] bg-green-200 p-5 mb-2 rounded-2xl text-green-900">
          {result?.qustions_details?.questions.map((i: testObject, index: number) => (
            <div key={index} className="questions-x">
              <h1 className="questions my-2 md:text-[19px] font-bold">{i.question}</h1>
              {i.options.map((i, optIdx) => (
                <div key={optIdx} className="options pl-5">
                  {" "}
                  <input
                    className="accent-green-500 "
                    type="radio"
                    readOnly
                    checked={i === result?.Validated_answers[index]?.correct_answer}
                    name={`option-${index}`}
                  />{" "}
                  {i} {i === result?.Validated_answers[index]?.correct_answer && <span>✅</span>}
                </div>
              ))}
              <div className="p-2 w-fit">
                <span className="bg-green-500 p-2 rounded-xl text-green-900">Given answer</span>{" "}
                <span
                  className={`p-2 rounded-xl ${result?.Validated_answers[index]?.given_answer ? "bg-green-500 text-green-950" : "bg-red-500 text-white"}`}
                >
                  {Answer[index] ? Answer[index] : "not answered"}
                </span>
              </div>
            </div>
          ))}
        </section>
        <section className="sticky bottom-3 px-2 flex justify-end md:mx-[10%] mx-2 gap-2 hover:gap-5 transition-gap ease-in-out duration-150 mb-10 text-white">
          <button
            onClick={handledelete}
            className="flex gap-2 justify-center items-center bg-red-500 p-3 rounded-2xl hover:scale-120 cursor-pointer hover:bg-red-700 transition-all duration-200 ease-in-out text-nowrap overflow-hidden group"
          >
            <MdDelete size={15}/>{" "}
            <span className="group-hover:w-fit text-sm group-hover:block group-hover:opacity-100 hidden w-0 opacity-0 transition duration-100 ease-in-out">
              delete question
            </span>
          </button>
          <Link
            href={"/home"}
            className="flex gap-2 justify-center text-sm items-center bg-green-500 p-3 rounded-2xl hover:scale-120 cursor-pointer hover:bg-green-700 transition-all duration-200 ease-in-out"
          >
            <IoMdArrowBack className="w-5 h-5" /> Go back{" "}
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Page;
