  "use client";
  import ProfileContainer from "@/components/home/profile/ProfileContainer";
  import Timer from "@/components/home/Timer";
  import Loader from "@/components/Loader";
  import Mogger from "@/components/Mogger";
  import { CreateContext } from "@/Context/ContextProvider";
  import { data } from "@/data";
  import { testObject } from "@/Types/others/types";
  import axios from "axios";
  import { useParams, useRouter } from "next/navigation";
  import React, { useCallback, useEffect, useState } from "react";
  import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
  import { FaHome } from "react-icons/fa";

  const Page = () => {
    const test_id = useParams();
    const router = useRouter();
    const [count, setCount] = useState(0);
    const [TestObject, setTestObject] = useState<Array<testObject>>([
      {
        question: "",
        options: [],
      },
    ]);
    const {
      setquestions,
      Answer,setAnswer,
      HandleAnswer,
      user_details,
      loader,
      setloader,
      GetUser,
      TimerUser,
      setTimer,
      handlesubmit,
      setselectedfile
    } = CreateContext();

    const fetchQuestions = useCallback(async () => {
      if (user_details?.user_id !== undefined && test_id.id) {
        const res = await axios.get(
          `/api/getQuestions?id=${test_id.id}&user_id=${user_details?.user_id}`
        );
        setTestObject(res.data.message.questions);
        setloader(false)
      }
    }, [test_id.id,user_details?.user_id,setloader]);

    function HandleBackNForth(direct: string) {
      if (direct === "Left") {
        setCount(Math.max(0, count - 1));
      } else {
        setCount(Math.min(TestObject.length - 1, count + 1));
      }
    }
    
    useEffect(() => {
      if(user_details && user_details?.user_id){
        fetchQuestions();
      }
    }, [user_details,fetchQuestions])

    useEffect(() => {
      setTimer(Number(sessionStorage.getItem("duration")));
      setAnswer([]);
      GetUser();
    }, [setTimer, setTestObject, GetUser,setAnswer]);

    async function handleMogging() {
      const prompt: boolean = confirm("Are you sure you want to stop mogging ?");
      if (prompt) {
        const prompt: boolean = confirm("The questions will be saved and can be accesed through History page");
        if (prompt) {
          setquestions([]);
          localStorage.removeItem("endtime");
          sessionStorage.removeItem("duration");
          router.push("/home");
        } else {
          setloader(false);
        }
      } else {
        setloader(false);
      }
    }
    function handleHome() {
      const prompt = confirm(
        "Are you sure you want to leave and go Home ? (The test will be saved)"
      );
      setloader(true);
      if (prompt) {
        localStorage.removeItem("endtime");
        sessionStorage.removeItem("duration");
        setselectedfile([]);
        router.push("/home");
      } 
      else{
        setloader(false)
      }
    }

    
    if (TestObject.length === 1 )
      return (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      );
    else if (loader)
      return (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      );
    return (
      <div className="relative min-h-screen mt-5">
        <main className="mx-3 lg:flex-row flex flex-col gap-2">
          <div className="lg:w-full md:h-120   p-2  select-none">
            <h1 className="md:text-5xl text-3xl mb-3 select-none ">
              Answer the following questions
            </h1>
            <section className="questions relative overflow-hidden warp-break-words h-[89%] rounded-md border border-green-900">
              <h1 className="text-2xl mb-5 bg-green-200 p-2">
                {TestObject[count]?.question}
              </h1>
              <div>
                {TestObject[count]?.options.map((i: string, index: number) => (
                  <div key={index} className="text-xl m-5 ">
                    <input
                      type="radio"
                      value={i}
                      onChange={(e) => HandleAnswer(e.target.value, count)}
                      name={`qustion-${count}`}
                      checked={Answer[count] === i}
                      className="cursor-pointer"
                    />{" "}
                    <span className="select-none w-full">{i}</span>
                  </div>
                ))}
              </div>
              <div className="md:absolute md:p-0 p-3 right-5 bottom-5 flex gap-2 justify-end">
                <button
                  className="cursor-pointer bg-green-700 p-3 w-10 text-white hover:w-16 transtion-w duration-100 ease-in-out"
                  onClick={() => {
                    HandleBackNForth("Left");
                  }}
                >
                  <FaArrowLeft />
                </button>
                {count + 1 === TestObject.length ? (
                  <button
                    disabled={Answer.length === 0}
                    className={` bg-green-700 p-3 text-white hover:bg-green-400 ${Answer.length === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={() => handlesubmit(test_id.id,Answer)}
                  >
                    Submit
                  </button>
                ) : (
                  <div>
                    <button
                      className="cursor-pointer bg-green-700 p-3 w-10 text-white hover:w-16 duration-100 ease-in-out flex justify-end"
                      onClick={() => {
                        HandleBackNForth("Right");
                      }}
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
          <div className="w-full relative select-none bg-green-400 md:min-h-120 p-2 rounded-md mb-20">
            <nav className="flex justify-between mx-3 items-center">
              <h1 className="md:text-xl text-sm text-white">Check questions</h1>
              <div className="flex gap-2 items-center ">
                <h1 className="md:text-2xl text-sm text-green-900">Time Left</h1>
                <Timer duration={TimerUser} />
              </div>
            </nav>
            <div className="questions_index p-2 grid md:grid-cols-12 md:grid-rows-6 grid-cols-5 grid-rows-5 mt-2  mb-12">
              {TestObject.map((_, index) => (
                <span
                  key={index}
                  className="p-3 m-1 bg-green-600 cursor-pointer hover:bg-green-500 transition-bg duration-300 ease-in-out text-center"
                  onClick={() => setCount(index)}
                >
                  {index + 1}
                </span>
              ))}
            </div>
            <footer className="absolute bottom-0 right-5 mb-2">
              <button
                className="p-3 bg-red-500 text-white rounded-xl cursor-pointer hover:bg-red-600 mt-10"
                onClick={() => {
                  setloader(true);
                  handleMogging();
                }}
              >
                End Mogging
              </button>
            </footer>
          </div>
        </main>
        <footer className="absolute bottom-0 p-2 bg-green-200 w-full justify-center flex">
          {data.footer.text}
        </footer>
      </div>
    );
  };

  export default Page;
