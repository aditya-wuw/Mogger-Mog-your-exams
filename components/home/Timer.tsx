"use client"
import React, { useEffect, useState } from 'react'

const Timer = ({duration}:{duration:number}) => {

  const [timeleft,setTimer] = useState<number>(duration);
   
  useEffect(()=>{
      const endtime:number = Date.now()+ (duration*1000);

      const interval = setInterval(() => {
        const remaining:number = endtime - Date.now();   
        setTimer(remaining > 0 ? remaining : 0);

        if(remaining<=0) {
            // alert("Submited");
            clearInterval(interval);
        }    

    }, 1000);

    return ()=>{
        clearInterval(interval);
    }
  },[duration,setTimer]);

   const hours:number = Math.floor(timeleft/(3600000));
   const minuite:number = Math.floor((timeleft%3600000)/60000);
   const seconds:number = Math.floor((timeleft%60000)/1000);

  return (
    <div className={`p-2 text-2xl text-white transtion-bg duration-500 ease-in-out ${ timeleft < (duration*0.1*1000) ? "bg-red-500"  : timeleft < (duration*0.5*1000) ? "bg-yellow-400 text-yellow-950" : "bg-green-700" } rounded-2xl`}>
       {String(hours).padStart(2,"0")}:{String(minuite).padStart(2,"0")}:{String(seconds).padStart(2,"0")}
    </div>
  )
}

export default Timer
