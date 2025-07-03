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
            const { prompt } = await req.json();
            const instrustion: string = `return an array of objects avoid using markdown code block and follow this example - [
  {"question": "1) What is the name of the protagonist in Persona 3 Reloaded?", "options": ["Makoto Yuki", "Yu Narukami", "Ren Amamiya", "Tatsuya Suou"]},
  {"question": "2) What new combat mechanic was introduced in Persona 3 Reloaded?", "options": ["Theurgy", "Baton Pass", "Technical", "Showtime"]},
  {"question": "3) Which of the following characters had new 'Link Episodes' added in Persona 3 Reloaded?", "options": ["Akihiko Sanada", "Yukari Takeba", "Mitsuru Kirijo", "Aigis"]},
  {"question": "4) What is the primary hub location for SEES in Persona 3 Reloaded?", "options": ["Iwatodai Dorm", "Yasogami High", "Leblanc", "Shujin Academy"]},
  {"question": "5) What is the name of the tower that appears during the Dark Hour in Persona 3 Reloaded?", "options": ["Tartarus", "Mementos", "TV World", "Abyss of Time"]}] and so on based on the users prompt in the quoats, strictly stick to only 4 options, make sure to only return the said format from the example, if the user dosen't send a specific prompt then simply generate 20 questions on general knowledge, if the user specified a topic but didn't mention the amount of questions then generate qustions in the range of 10 to 20, exclude the example questions don't return the example questions if the user didn't mention any perticuler topic or given any perticular passage and make sure all the questions are unique based on the user's prompt, here is the usera's prompt : ${prompt} ,also make sure to suffle the options properly,also generate a answer key for the questions and now we must have two sperate arrays one the question key and another the answer. Now wrap the both the keys in an object for example { "questions_key" : the question array, "answer_key" : the array of only the answers which is a string for example ["answer1","answer2"] } and return the final out put`
            const res = await Gemini(instrustion);
            return NextResponse.json({ success: true, message: res }, { status: 201 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false }, { status: 504 });
    }

}