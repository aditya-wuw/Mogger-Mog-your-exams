"use client"
import { createContext, useContext, useEffect, useRef, useState } from "react";

const Context = createContext<null | any>(null);

export const ContextProvider = ({children}:{children:React.ReactNode}) => {
    
    const [count,setcount] = useState(0)
    const [isSidebar, setsidebar] = useState(true);
    const [OpenProfile, setOpenProfile] = useState(false); 
    const ProfileIconRef = useRef<HTMLDivElement>(null);
    const MainContainerRef = useRef<HTMLElement>(null)
    const value = {count,setcount,isSidebar,setsidebar,OpenProfile, setOpenProfile,ProfileIconRef,MainContainerRef}
    return <Context.Provider value = {value}>{children}</Context.Provider>
}

export const CreateContext = ()=> useContext(Context);