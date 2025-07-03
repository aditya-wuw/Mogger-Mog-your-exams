"use client"
import React, { useEffect } from 'react'

const page = () => {
    // I pass the id here if the user want to 
    useEffect(()=>{
      
    },[])
  return (
    <div>
       this is the result page
       will show the result with the questions 
       how many questions we got right, how many questions we got wrong and which questions,
       user can see the questions and the right answer in thsi format 
          9/10 questions correct 1 incorrect answer 
        <div>
             1) What is the name of the protagonist in Persona 3 Reloaded?", 
                <div>
                "options": "Makoto Yuki"
                </div>
                <div>
                "options": "Makoto Yuki"  <span> ✅This is the correct answer</span>
                </div>
                <div>
                "selected": "Makoto Yuki" <span> ❌</span>
                </div>
                <div>
                "options": "Makoto Yuki"
                </div>

        </div>
    </div>
  )
}

export default page
