"use client";
import Mainbodynav from "@/components/home/BodyNav";
import Sidebar from "@/components/home/Sidebar";
import Loader from "@/components/Loader";
import { CreateContext } from "@/Context/ContextProvider";
import { res_details, stringArray } from "@/data";
import { testObject, valided_answers } from "@/Types/others/types";
import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const test_id = useParams();
  const { result, setresult, setsidebar,Answer,setAnswer,user_details } = CreateContext();
  const Router = useRouter();

  useEffect(() => {
    // setAnswer(stringArray);
    // setresult(res_details);
  }, [user_details?.user_id]);
  
  async function handledelete() {
    const Prompt:boolean = confirm("you want to delele the questions ?");
    if(Prompt){
      const res  = await axios.delete(`/api/delete?id=${test_id.id}&user_id=${user_details?.user_id}`)
      if(res.data.success){
        Router.push('/home')
      }
    }
  }

  const correct = result?.Validated_answers.filter(
    (ans: valided_answers) => ans?.given_answer === true
  ).length;
  const wrong = result?.Validated_answers.filter(
    (ans: valided_answers) => ans?.given_answer === false
  ).length;
  const total = result?.Validated_answers.length;


  if(!result) return <div className="flex justify-center items-center w-full h-screen"><Loader/></div>
  return (
    <>
      <nav className="absolute w-[98%] top-0 left-0 flex ml-[1%] md:px-2 px-3">
        <Mainbodynav />
      </nav>
      <main className="flex">
        <Sidebar />
        <div className="mt-18 px-2 w-full md:h-[90vh] md:overflow-y-scroll scroll-smooth scroll-me-1" onClick={()=>setsidebar(true)}>
          <section className="result_bord select-none bg-green-500 rounded-2xl p-2 mb-3 md:w-[30%] mx-auto text-white">
            <div className="score_card">
              <div>you got {correct}correct </div>
              <div>you got {wrong} wrong </div>
              <div>out of {total}</div>
            </div>
          </section>
          <p className="text-xl md:text-2xl font-bold md:mx-[10%] mx-2">Answer Review</p>
          <section className="mx-2 md:mx-[10%] bg-green-200 p-5 mb-2 rounded-2xl text-green-900">
            {result?.qustions_details?.questions.map((i:testObject,index:number)=>(<div key={index} className="questions-x">
              <h1 className="questions my-2 md:text-[19px] font-bold">
                {i.question}
              </h1>
               {i.options.map((i,optIdx)=>(<div key={optIdx} className="options pl-5"> <input className="accent-green-500 " type="radio" readOnly checked={i===result?.Validated_answers[index]?.correct_answer} name={`option-${index}`}/> {i} {i===result?.Validated_answers[index]?.correct_answer && <span>✅</span>}</div>))}
               <div className={`p-2 w-fit rounded ${result?.Validated_answers[index]?.given_answer ? "bg-green-500 text-green-950":"bg-red-500 text-white"}`}> 
                Given answers: {Answer[index]}</div>
            </div>
          ))}
          </section>
          <section className="flex justify-end md:mx-[10%] mx-2 gap-2 hover:gap-5 transition-gap ease-in-out duration-150 mb-10 text-white">
            <button onClick={handledelete} className="flex gap-2 justify-center items-center bg-red-500 p-3 rounded-2xl hover:scale-120 cursor-pointer hover:bg-red-700 transition-all duration-200 ease-in-out text-nowrap overflow-hidden group"><MdDelete className="w-5 h-5"/> <span className="group-hover:w-fit group-hover:block group-hover:opacity-100 hidden w-0 opacity-0 transition duration-100 ease-in-out">delete question</span></button>
            <Link href={'/home'} className="flex gap-2 justify-center items-center bg-green-500 p-3 rounded-2xl hover:scale-120 cursor-pointer hover:bg-green-700 transition-all duration-200 ease-in-out"><IoMdArrowBack className="w-5 h-5"/> Go back </Link >
          </section>
        </div>
      </main>
    </>
  );
};

export default page;
