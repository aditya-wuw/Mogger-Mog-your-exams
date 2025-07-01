"use client";

import ProfileContainer from "@/components/home/profile/ProfileContainer";
import Mogger from "@/components/Mogger";
import { data } from "@/data";
import { TestObject2 } from "@/utils/other/testdata";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft,FaArrowRight } from "react-icons/fa6";

const page = () => {
  const test_id = useParams();
  const [Answer,setAnswer] = useState<Array<string>>([])
  const [count,setCount] = useState(0);
  const [TestObject,setTestObject] = useState(TestObject2);

  useEffect(() => {

  }, []);

  function HandleBackNForth(direct:string) {
    if(direct==="Left"){
      setCount(Math.max(0,count-1))    
    }
    else{
      setCount(Math.min(TestObject.length-1,count+1));
    }
  }
  function HandleAnswer(ans:string,i:number) {
    let Ans:Array<string> = [...Answer];
    Ans[i] = ans;
    setAnswer(Ans);
  }
  function handlesubmit() {
    console.log(Answer);
  }
  return (
    <div className="relative min-h-screen">
      <nav className="p-3  mb-5 px-10 flex justify-between items-center">
        <Mogger />
        <div>
          <ProfileContainer/>
        </div>
      </nav>
      <main className="mx-3 md:flex-row flex flex-col gap-2">
        <div className="md:w-[120%] md:h-120   p-2  select-none">
          <h1 className="md:text-5xl text-3xl mb-3 select-none ">
            Answer the following questions
          </h1>
          <section className="questions relative overflow-hidden break-words h-[89%] rounded-md border border-green-900">
            <h1 className="text-2xl mb-5 bg-green-200 p-2">{TestObject[count].question}</h1>
            <div>
              {TestObject[count].options.map((i:string, index:number) => (
                <div key={index} className="text-xl m-5 ">
                  <input type="radio" value={i} onChange={(e)=>HandleAnswer(e.target.value,count)} name={`qustion-${count}`} checked={Answer[count]=== i } className="cursor-pointer"/> <span className="select-none w-full">{i}</span>
                </div>
              ))}
            </div>
            <div className="md:absolute md:p-0 p-3 right-5 bottom-5 flex gap-2 justify-end">
              <button className="cursor-pointer bg-green-700 p-3 w-10 text-white hover:w-16 transtion-w duration-100 ease-in-out" onClick={()=>{HandleBackNForth("Left")}}><FaArrowLeft/></button>
              {count+1 === TestObject.length ? <button disabled={Answer.length === 0} className={` bg-green-700 p-3 text-white hover:bg-green-400 ${Answer.length === 0 ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={handlesubmit}>Submit</button> 
              : <div>
                <button className="cursor-pointer bg-green-700 p-3 w-10 text-white hover:w-16 duration-100 ease-in-out flex justify-end" onClick={()=>{HandleBackNForth("Right")}}><FaArrowRight/></button>
              </div>  
              }    
            </div>
          </section>
        </div>
        <div className="w-full bg-green-400 md:h-120 p-2  rounded-md">
          <nav className="flex justify-between mx-3">
            <h1 className="text-xl text-white">Check questions</h1>
            <div className="timer"> timer</div>

          </nav>

          <div className="questions_index p-3">
            {TestObject.map((_,index)=>(<span key={index} className="p-3 m-1 bg-green-600 cursor-pointer" onClick={()=>setCount(index)}>{index+1}</span>))}
          </div>
        </div>
      </main>
      <footer className="absolute bottom-0 p-2 bg-green-200 w-full justify-center flex">
         {data.footer.text}
      </footer>
    </div>
  );
};

export default page;
