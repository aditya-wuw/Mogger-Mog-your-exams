"use client";
import GreenBlob from "@/components/GreenBlob";
import Logo from "@/components/logo";
import NavBar from "@/components/NavBar";
import { data } from "@/data.js";
import axios from "axios";
import { Heart } from "lucide-react";
import { color, easeInOut, motion, Variants } from "motion/react";
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

  const hueShiftVariant: Variants = {
    cycle: {
      borderColor: ["#10B981", "#3B82F6", "#EF4444", "#10B981"],
      transition: {
        duration: 5,
        ease: "easeIn",
        repeat: Infinity,
      },
    },

    hover: {
      filter: "hue-rotate(0deg)",
      backgroundColor: "#34D399",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const hueShiftBG: Variants = {
    cycle: {
      filter: [
        "hue-rotate(0deg)",
        "hue-rotate(45deg)",
        "hue-rotate(90deg)",
        "hue-rotate(45deg)",
        "hue-rotate(360deg)",
      ],
      transition: {
        duration: 5,
        ease: "easeIn",
        repeat: Infinity,
      },
    },
    hover: {
      filter: "hue-rotate(0deg)",
    },
  };

  const SuddenJump: Variants = {
    reset: {
      translateY: [0,-30, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay:2
      },
    },
  };
  return (
    <>
      <div className="relative w-full min-h-screen">
        <GreenBlob />
        <div>
          <div className="flex justify-center">
            <NavBar />
          </div>
          <main className="flex flex-col justify-center items-center h-full">
            <section className="min-h-[30vh] px-5 mt-5">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeInOut }}
                className="md:text-4xl text-2xl text-center font-bold md:mt-10 mt-5"
              >
                <div className="flex gap-2 justify-center items-center">
                  <h1>{data.Hero.title.t1}</h1>
                  <motion.h1 variants={SuddenJump} animate="reset">
                    {data.Hero.title.t2}
                  </motion.h1>
                </div>
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
            <motion.div
              className="md:text-2xl text-xl mt-10 mb-5 flex gap-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: easeInOut }}
            >
              <Logo />
              {data.tutorial_section.header}
            </motion.div>
            <section className="md:mt-20 mt-10 md:flex md:flex-row flex flex-col gap-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeInOut }}
              >
                <Link
                  href={"/GettingStarted"}
                  className="p-4  bg-linear-to-br from-green-500/70 to-green-300 hover:to-green-100 backdrop-blur-md rounded-2xl w-50 text-green-900 hover:text-white text-2xl hover:from-green-500/50 transition-all hover:cursor-pointer gap-2 flex justify-center"
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
                  className="p-4 group bg-linear-to-br from-green-500/70 to-green-300 hover:to-green-100 backdrop-blur-md rounded-2xl w-50 text-green-900 hover:text-white text-2xl hover:from-green-500/50 transition-all hover:cursor-pointer gap-2 flex"
                >
                  Try out
                  <span className="text-white group-hover:text-green-900 transition-colors duration-200 group">
                    Mogger
                  </span>
                </Link>
              </motion.div>
            </section>
          </main>
          <section className="flex justify-between items-end mx-5 mt-3 h-60 max-md:pb-10">
            <div />
            <motion.div
              className="p-2 rounded-xl bg-green-600 broder border border-green-900 w-fit h-fit text-white max-md:text-xs flex items-center gap-2"
              variants={hueShiftVariant}
              whileHover="hover"
              animate="cycle"
            >
              developed by
              <motion.a
                className="text-green-300 hover:text-blue-500"
                href="https://nullfaceddev.xyz"
                target="_blank"
                variants={hueShiftBG}
                animate="cycle"
                whileHover="hover"
              >
                @NullFacedDev
              </motion.a>
              with <Heart size={14} />
              and コーヒー
            </motion.div>
          </section>
          <footer className=" text-green-700 text-sm w-full text-center p-1 bg-green-400/50 absolute bottom-0">
            {data.footer.text}
            <Link
              href={"/tos"}
              className="hover:text-green-900 hover:underline"
            >
              {data.footer.terms}
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
}
