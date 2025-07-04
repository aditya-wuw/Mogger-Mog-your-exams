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
  const [result,setresult] = useState<resulttype>();
  const [user_details,setUser] = useState<users_details_>();

  async function GetUser() {
    const res = await axios.get('/api/auth/session');
    setUser(res.data.message);
  }
  useEffect(()=>{
    GetUser()
  },[]);


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
    result,setresult,
    user_details
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const CreateContext = () => useContext(Context);
