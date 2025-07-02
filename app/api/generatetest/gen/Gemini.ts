import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API
});

async function Gemini(prompt:string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `return an array of objects avoid using markdown code block and follow this example - [
  {question: "1) What is the name of the protagonist in Persona 3 Reloaded?", options: ["Makoto Yuki", "Yu Narukami", "Ren Amamiya", "Tatsuya Suou"]},
  {question: "2) What new combat mechanic was introduced in Persona 3 Reloaded?", options: ["Theurgy", "Baton Pass", "Technical", "Showtime"]},
  {question: "3) Which of the following characters had new 'Link Episodes' added in Persona 3 Reloaded?", options: ["Akihiko Sanada", "Yukari Takeba", "Mitsuru Kirijo", "Aigis"]},
  {question: "4) What is the primary hub location for SEES in Persona 3 Reloaded?", options: ["Iwatodai Dorm", "Yasogami High", "Leblanc", "Shujin Academy"]},
  {question: "5) What is the name of the tower that appears during the Dark Hour in Persona 3 Reloaded?", options: ["Tartarus", "Mementos", "TV World", "Abyss of Time"]}] and so on based on the users prompt in the quoats, strictly stick to only 4 options, make sure to only return the said format from the example, if the user dosen't send a specific prompt then simply generate 20 questions on general knowledge, if the user specified a topic but didn't mention the amount of questions then generate qustions in the range of 10 to 20 and make sure all the questions are unique based on the user's prompt, here is the usera's prompt : "${prompt}"`,
  });
  const res = response.text;
  return res;
}

export default Gemini;