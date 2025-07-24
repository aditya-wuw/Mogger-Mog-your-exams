import { cookies } from "next/headers";
import { NextResponse } from "next/server"
import Gemini from "./Gemini";

export async function POST(req: Request) {
    try {
        const cookie = await cookies();
        if (!cookie.get('session_token')) {
            return NextResponse.json({ success: false, message: "unauthorized ! Please login" }, { status: 304 });
        }
        else {
            const { prompt, filepath } = await req.json();
            const instrustion: string = `Return a JavaScript object containing two arrays: questions_key and answer_key.
1. questions_key should be an array of question objects formatted like this:
[
  {
    "question": "1) Sample question?",
    "options": ["Option A", "Option B", "Option C", "Option D"]
  },
  ...
]
2. answer_key should be a simple array of correct answers (strings), matching the order of the questions.
Requirements:
- Always return exactly one object in this format: { "questions_key": [...], "answer_key": [...] }.
- Each question must have **4 shuffled options**.
- All questions must be **unique and based on the user's prompt**.
- If the user provides no prompt or a generic prompt, generate 20 general knowledge questions (exclude the example questions).
- If the user specifies a topic but not a quantity, generate between 10 to 20 questions.
- Do **not** use markdown or code blocks.
- Do **not** include the example questions in the actual output.
- if a file was attached then avoid using words like "According to the documents" for questions 
- Maintain proper numbering for each question.
- Ensure the correct answer is included in the options and appears in the answer_key.
User Prompt: ${prompt}
`            
            let res;
            if (!filepath) {
                 res = await Gemini(instrustion,'');

            } else {
                 res = await Gemini(instrustion, filepath);
                
            }
            return NextResponse.json({ success: true, message: res }, { status: 201 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false }, { status: 504 });
    }

}