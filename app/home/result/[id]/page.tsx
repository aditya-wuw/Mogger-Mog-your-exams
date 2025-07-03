"use client";
import Mainbodynav from "@/components/home/BodyNav";
import Sidebar from "@/components/home/Sidebar";
import NavBar from "@/components/NavBar";
import { CreateContext } from "@/Context/ContextProvider";
import { testObject, valided_answers } from "@/Types/others/types";
import React, { useEffect, useState } from "react";

const page = () => {
  // Example test data for res_details structure
  // const res_details = {
  //   qustions_details: {
  //     id: "afb79efa348",
  //     title: "generate me 10 questions",
  //     created_at: "2025-07-03T15:53:55.564875+00:00",
  //     answers: [
  //       "Makoto Yuki",
  //       "Theurgy",
  //       "Akihiko Sanada",
  //       "Iwatodai Dorm",
  //       "Tartarus",
  //       "Rewind function",
  //       "Elizabeth",
  //       "Climbing stairs",
  //       "Mortality and the acceptance of death",
  //       "Mitsuru Kirijo",
  //     ],
  //     questions: [
  //       {
  //         question:
  //           "1) What is the default name given to the male protagonist of Persona 3 Reloaded?",
  //         options: [
  //           "Makoto Yuki",
  //           "Minato Arisato",
  //           "Yu Narukami",
  //           "Ren Amamiya",
  //         ],
  //       },
  //       {
  //         question:
  //           "2) What new combat mechanic was introduced in Persona 3 Reloaded that allows for powerful ultimate attacks?",
  //         options: [
  //           "Theurgy",
  //           "All-Out Attack",
  //           "Persona Fusion",
  //           "Shuffle Time",
  //         ],
  //       },
  //       {
  //         question:
  //           "3) Which of the following male characters received expanded storylines focusing on their daily lives in Persona 3 Reloaded?",
  //         options: [
  //           "Akihiko Sanada",
  //           "Junpei Iori",
  //           "Shinjiro Aragaki",
  //           "Ken Amada",
  //         ],
  //       },
  //       {
  //         question:
  //           "4) What is the primary hub location for the Specialized Extracurricular Execution Squad (SEES) in Persona 3 Reloaded?",
  //         options: [
  //           "Iwatodai Dorm",
  //           "Paulownia Mall",
  //           "Gekkoukan High",
  //           "Tartarus",
  //         ],
  //       },
  //       {
  //         question:
  //           "5) What is the name of the colossal tower that appears during the Dark Hour in Persona 3 Reloaded?",
  //         options: ["Tartarus", "Mementos", "Yabbashah Block", "Arqa Block"],
  //       },
  //       {
  //         question:
  //           "6) What quality-of-life feature was added to Persona 3 Reloaded to revisit previous dialogue choices and battles?",
  //         options: [
  //           "Auto-battle",
  //           "Fast travel",
  //           "Skill inheritance",
  //           "Rewind function",
  //         ],
  //       },
  //       {
  //         question:
  //           "7) What is the name of the Velvet Room attendant who assists the protagonist in Persona 3 Reloaded?",
  //         options: ["Elizabeth", "Margaret", "Caroline", "Justine"],
  //       },
  //       {
  //         question:
  //           "8) What is the primary method of exploring and ascending Tartarus in Persona 3 Reloaded?",
  //         options: [
  //           "Elevator",
  //           "Climbing stairs",
  //           "Escalator",
  //           "Teleportation",
  //         ],
  //       },
  //       {
  //         question:
  //           "9) What is the central philosophical theme prominently explored throughout the story of Persona 3 Reloaded?",
  //         options: [
  //           "Mortality and the acceptance of death",
  //           "Friendship and teamwork",
  //           "Power and responsibility",
  //           "Hope and despair",
  //         ],
  //       },
  //       {
  //         question:
  //           "10) Which member of SEES uses a katana as their primary weapon in Persona 3 Reloaded?",
  //         options: [
  //           "Mitsuru Kirijo",
  //           "Akihiko Sanada",
  //           "Junpei Iori",
  //           "Koromaru",
  //         ],
  //       },
  //     ],
  //   },
  //   Validated_answers: [
  //     { q_index: 0, given_answer: true, correct_answer: "Makoto Yuki" },
  //     { q_index: 1, given_answer: true, correct_answer: "Theurgy" },
  //     { q_index: 2, given_answer: false, correct_answer: "Akihiko Sanada" },
  //     { q_index: 3, given_answer: false, correct_answer: "Iwatodai Dorm" },
  //     { q_index: 4, given_answer: false, correct_answer: "Tartarus" },
  //     { q_index: 5, given_answer: false, correct_answer: "Rewind function" },
  //     { q_index: 6, given_answer: false, correct_answer: "Elizabeth" },
  //     { q_index: 7, given_answer: false, correct_answer: "Climbing stairs" },
  //     {
  //       q_index: 8,
  //       given_answer: false,
  //       correct_answer: "Mortality and the acceptance of death",
  //     },
  //     { q_index: 9, given_answer: false, correct_answer: "Mitsuru Kirijo" },
  //   ],
  // };

  const { result, setresult } = CreateContext();

  useEffect(() => {
    // setresult(res_details);
  }, []);

  const correct = result?.Validated_answers.filter(
    (ans: valided_answers) => ans.given_answer === true
  ).length;
  const wrong = result?.Validated_answers.filter(
    (ans: valided_answers) => ans.given_answer === false
  ).length;
  const total = result?.Validated_answers.length;

  return (
    <>
      <nav className="absolute w-[98%] top-0 left-0 flex ml-[1%] md:px-2 px-3">
        <Mainbodynav />
      </nav>
      <main className="flex">
        <Sidebar />
        <div className="mt-20 px-2 w-full">
          <section className="result_bord bg-green-500 rounded-2xl p-2 mb-3">
            <div className="score_card">
              <div>you got {correct}correct </div>
              <div>you got {wrong} wrong </div>
              <div>out of {total}</div>
            </div>
          </section>
          <p>Here is the Mock test details </p>
          <section>
            {result?.qustions_details?.questions.map((i:testObject,index:number)=>(<div key={index} className="questions-x">
              <h1 className="questions my-2">
                {i.question}
              </h1>
               {i.options.map((i,optIdx)=>(<div key={optIdx} className="options pl-5"> <input type="radio" readOnly checked={i===result?.Validated_answers[index].correct_answer} name={`option-${index}`}  /> {i}</div>))}
     
            </div>))}
            
          </section>
        </div>
      </main>
    </>
  );
};

export default page;
