"use client";
import NavBar from "@/components/NavBar";
import { CreateContext } from "@/Context/ContextProvider";
import { data } from "@/data.js";
import { easeInOut, motion } from "motion/react";
export default function Home() {
  const { count, setcount } = CreateContext();
  return (
    <>
      <div className="relative w-full min-h-screen">
        <div className="bg-gradient-to-r from-green-300 to-green-100 z-[-1] backdrop-blur-2xl blur-3xl rounded-full w-[50%] h-[25%] absolute top-50 md:left-50 left-20"></div>
        <div>
          <div className="flex justify-center">
            <NavBar />
          </div>
          <main className="flex flex-col justify-center items-center h-full">
            <section className="min-h-[30vh] px-5">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeInOut }}
                className="md:text-4xl text-2xl text-center font-bold md:mt-10 mt-5"
              >
                <h1>{data.Hero.title.t1}</h1>
                <h1>{data.Hero.title.t2}</h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeInOut }}
                className="md:text-xl text-sm text-center md:mt-15 mt-5"
              >
                <h1>{data.Hero.des}</h1>
              </motion.div>
            </section>
            <section className="md:mt-0 mt-10 md:flex md:flex-row flex flex-col gap-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeInOut }}
              >
                <button className="p-4  bg-gradient-to-br from-green-500/70 to-green-300 hover:to-green-100 backdrop-blur-md rounded-2xl w-50 text-green-900 hover:text-white text-2xl hover:from-green-500/50 transition-all hover:cursor-pointer gap-2 flex justify-center">
                  Get started
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeInOut }}
              >
                <button className="p-4 group bg-gradient-to-br from-green-500/70 to-green-300 hover:to-green-100 backdrop-blur-md rounded-2xl w-50 text-green-900 hover:text-white text-2xl hover:from-green-500/50 transition-all hover:cursor-pointer gap-2 flex">
                  Try out
                  <span className="text-white group-hover:text-green-900 transition-colors duration-200 group">
                    Mocker
                  </span>
                </button>
              </motion.div>
            </section>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <p className="text-2xl mt-10">{data.tutorial_section.header}</p>
            </motion.div>
            <section className="min-h-[49.3vh] md:flex gap-10">
              <div></div>
              <motion.div
                initial={{ opacity: 0,y:50 }}
                animate={{ opacity: 1, y:0 }}
                transition={{ duration: 2 }}
                className="bg-gradient-to-bl  h-76 mt-10 mb-10 md:mb-0 backdrop-blur-md from-green-200 text-green-900 md:w-140 to-transparent rounded-2xl p-2"
              >
                <iframe
                  src="https://www.youtube.com/embed/5AFF24YSdBk"
                  title="YouTube video"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  autoFocus
                  className="md:w-[530px] md:h-[300px] rounded-2xl w-[350px] h-[250px]"
                ></iframe>
              </motion.div>
            </section>
          </main>
          <footer className=" text-white text-sm w-full text-center p-2 bg-green-800 absolute bottom-0">
            {data.footer.text}
            <span>
              <a href="" className="hover:text-green-500 hover:underline">
                {data.footer.terms}
              </a>
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}
