"use client";
import GreenBlob from "@/components/GreenBlob";
import NavBar from "@/components/NavBar";
import { data } from "@/data.js";
import axios from "axios";
import { easeInOut, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const Router = useRouter();
  useEffect(() => {
    const session = async () => {
      const res = await axios.get("/api/auth/session");
      if (res.data.success) {
        Router.push("/home");
      }
    };
    session();
  }, [Router]);

  return (
    <>
      <div className="relative w-full min-h-screen">
        <GreenBlob />
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
                <h1 className="md:mx-50 mx-2">{data.Hero.des}</h1>
              </motion.div>
            </section>
            <motion.p
              className="text-2xl mt-10 mb-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: easeInOut }}
            >
              {data.tutorial_section.header}
            </motion.p>
            <section className="md:mt-0 mt-10 md:flex md:flex-row flex flex-col gap-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeInOut }}
              >
                <Link
                  href={"/GettingStarted"}
                  className="p-4  bg-gradient-to-br from-green-500/70 to-green-300 hover:to-green-100 backdrop-blur-md rounded-2xl w-50 text-green-900 hover:text-white text-2xl hover:from-green-500/50 transition-all hover:cursor-pointer gap-2 flex justify-center"
                >
                  Get started
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeInOut }}
              >
                <Link
                  href={"/auth_/login"}
                  className="p-4 group bg-gradient-to-br from-green-500/70 to-green-300 hover:to-green-100 backdrop-blur-md rounded-2xl w-50 text-green-900 hover:text-white text-2xl hover:from-green-500/50 transition-all hover:cursor-pointer gap-2 flex"
                >
                  Try out
                  <span className="text-white group-hover:text-green-900 transition-colors duration-200 group">
                    Mogger
                  </span>
                </Link>
              </motion.div>
            </section>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            ></motion.div>
            <section className="min-h-[20vh] md:flex gap-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
                className="bg-gradient-to-bl  h-76/2 mt-10 mb-10 md:mb-0 backdrop-blur-md from-green-200 text-green-900 md:w-140 to-transparent rounded-2xl p-2 mx-2"
              >
                <p className="mt-2 text-center">
                  Created by{" "}
                  <a
                    className="text-green-600"
                    href="https://nullfaceddev.xyz"
                    target="_blank"
                  >
                    @NullFacedDev
                  </a>{" "}
                  <br /> with 💖 and コーヒー
                </p>
              </motion.div>
            </section>
          </main>
          <footer className=" text-green-700 text-sm w-full text-center p-2 bg-green-400/50 absolute bottom-0">
            {data.footer.text}
            <span>
              <a href="" className="hover:text-green-900 hover:underline">
                {data.footer.terms}
              </a>
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}
