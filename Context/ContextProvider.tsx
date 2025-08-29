"use client";
import { resulttype, users_details_ } from "@/Types/others/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

const Context = createContext<null | any>(null);

export const ContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const Router = useRouter();
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
  const [TimerSlider, SetTimerSlider] = useState(false);
  const [feedbackform, setFeedbackForm] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [uploader, setuploader] = useState(false);
  const [loadermessage, SETloadermessAGE] = useState("");
  const [file, setselectedfile] = useState<Array<File>>([]);
  const [ToastMount, setToastMount] = useState(false);
  const [filepath, setfilepath] = useState("");
  const [ToastMessage, setToastMessage] = useState("");
  const [isEditing,setisEditing] = useState<boolean| undefined>(false)
  const GetUser = useCallback(async (): Promise<void> => {
    if (userLoaded) return;
    setUserLoaded(true);
    const res = await axios.get("/api/auth/session");
    setUser(res.data.message);
  }, [userLoaded]);

  function HandleAnswer(ans: string, i: number) {
    const Ans: Array<string> = [...Answer];
    Ans[i] = ans;
    setAnswer(Ans);
  }

  async function handlesubmit(test_id: string, Ans: Array<String>) {
    localStorage.removeItem("endtime");
    sessionStorage.removeItem("duration");
    const res = await axios.post("/api/validate", {
      id: test_id,
      userid: user_details?.user_id,
      submitted_answers: Ans,
    });
    if (res.data.success) {
      localStorage.removeItem("endtime");
      sessionStorage.removeItem("duration");
      setresult(res.data.message);
      Router.push(`/home/result/${test_id}`);
    } else {
      Router.push("/error");
    }
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
    TimerUser,
    setTimer,
    TimerSlider,
    SetTimerSlider,
    feedbackform,
    setFeedbackForm,
    Router,
    handlesubmit,
    HandleAnswer,
    uploader,
    setuploader,
    file,
    setselectedfile,
    loadermessage,
    SETloadermessAGE,
    ToastMount,
    setToastMount,
    filepath,
    setfilepath,
    ToastMessage,setToastMessage
    ,isEditing,
    setisEditing

  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const CreateContext = () => useContext(Context);
