"use client";
import steps from "@/data";
import Link from "next/link";
import { motion } from "motion/react";

export default function GettingStarted() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Getting Started with <span className="text-green-500">Mogger AI</span>
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Follow these simple steps to start practicing smarter with
          AI-generated mock tests.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="transition hover:shadow-xl cursor-pointer rounded-2xl bg-gradient-to-r to-green-500/20 backdrop-blur-2xl"
              initial={{ opacity: 0}}
              animate={{ opacity: 1}}
              transition={{ duration: 0.5+index, ease:"easeInOut" }}
            >
              <div className="flex items-start gap-4 p-6">
                <div className="shrink-0">{step.icon}</div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href={"/auth_/login"}
            className="bg-green-600 text-white hover:bg-green-700/60 rounded-2xl px-8 py-4 text-lg shadow-md transition ease-in-out"
          >
            Try Mogger AI Now
          </Link>
        </div>
      </div>
    </section>
  );
}
