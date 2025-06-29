"use client"
import { createContext, useContext, useState } from "react";

const Context = createContext<null | any>(null);

export const ContextProvider = ({children}:{children:React.ReactNode}) => {
    const [count,setcount] = useState(0)
    const [isSidebar, setsidebar] = useState(true);
    const value = {count,setcount,isSidebar,setsidebar}
    return <Context.Provider value = {value}>{children}</Context.Provider>
}

export const CreateContext = ()=> useContext(Context);