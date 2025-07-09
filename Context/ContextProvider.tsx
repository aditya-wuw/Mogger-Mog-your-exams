"use client";
import { resulttype, users_details_ } from "@/Types/others/types";
import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const Context = createContext<null | any>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [count, setcount] = useState(0);
  const [isSidebar, setsidebar] = useState(true);
  const [OpenProfile, setOpenProfile] = useState(false);
  const ProfileIconRef = useRef<HTMLDivElement>(null);
  const MainContainerRef = useRef<HTMLElement>(null);
  const [questions, setquestions] = useState([]);
  const [result, setresult] = useState<resulttype>();
  const [user_details, setUser] = useState<users_details_>();
  const [loader, setloader] = useState(false);
  const [Answer, setAnswer] = useState<Array<string>>([]);
  const [profile, setprofile] = useState<string | null>(null);
  const [TimerUser, setTimer] = useState<number>(0);
  const [TimerSlider,SetTimerSlider] = useState(false);
  const [feedbackform,setFeedbackForm] = useState(false);
  async function GetUser() {
    const res = await axios.get("/api/auth/session");
    setUser(res.data.message);
  }

  const value = {
    count,
    setcount,
    isSidebar,
    setsidebar,
    OpenProfile,
    setOpenProfile,
    ProfileIconRef,
    MainContainerRef,
    questions,
    setquestions,
    result,
    setresult,
    user_details,
    loader,
    setloader,
    GetUser,
    Answer,
    setAnswer,
    profile,
    setprofile,
    TimerUser,setTimer,
    TimerSlider,SetTimerSlider,feedbackform,setFeedbackForm
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const CreateContext = () => useContext(Context);
