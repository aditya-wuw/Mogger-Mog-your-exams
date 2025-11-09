"use client";
import Feedback from "@/components/Feedbackform/feedback";
import Feedbackform from "@/components/Feedbackform/Feedbackform";
import InputField from "@/components/home/InputField";
import Loader from "@/components/Loader";
import Toast from "@/components/Toast";
import { CreateContext } from "@/Context/ContextProvider";
import React, { useEffect } from "react";

import { Bounce, ToastContainer } from "react-toastify";
const Page = () => {
  const {
    setsidebar,
    loader,
    setloader,
    SetTimerSlider,
    feedbackform,
    setuploader,
    loadermessage,
    SETloadermessAGE,
    ToastMount,
    ToastMessage,
    setselectedfile,
  } = CreateContext();
  useEffect(() => {
    setloader(false);
    setsidebar(true);
    SETloadermessAGE("");
    setselectedfile([]);
  }, [setloader, setsidebar, setselectedfile, SETloadermessAGE]);

  if (loader)
    return (
      <div className="w-full flex justify-center items-center">
        <Loader message={loadermessage} />
      </div>
    );
  return (
    <div>
      {ToastMount && <Toast message={ToastMessage} type_of="err" />}
      <main>
        <section
          className="mainContaine md:h-[90vh] h-[86vh] relative"
          onClick={() => {
            SetTimerSlider(false);
            setuploader(false);
          }}
        >
          {feedbackform && (
            <div className="flex justify-center items-center relative md:top-[-5%] top-[10%] z-6">
              <Feedbackform />
            </div>
          )}
        </section>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
            style={{
              transform : "scale(0.8)"
            }}
          />
        <InputField />
      </main>

      <footer className="absolute bottom-0 left-1/2 -translate-x-1/2  w-full justify-end flex">
        <Feedback />
      </footer>
    </div>
  );
};

export default Page;
