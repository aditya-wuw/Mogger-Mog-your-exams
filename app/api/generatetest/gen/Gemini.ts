import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";
import os from "os";
import fs from 'fs/promises'
import path from 'path'
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API
});

async function Gemini(prompt: string, filePath: string) {
  if (filePath === '') {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt+"based on the instuction generate me questions",
    });
    const res = response.text;
    return res;
  }
  else {
    const path = await downloadPDFtoLocal(filePath);
    const myfile = await ai.files.upload({
      file: path as unknown as File,
      config: { mimeType: "application/pdf" },
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: createUserContent([
        createPartFromUri(myfile.uri as string, myfile.mimeType as string),
        prompt + "based on the instuction generate me questions from the given file",
      ]),
    });
    const res = response.text;
    await fs.unlink(path);
    return res;
  }
}

async function downloadPDFtoLocal(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to download file");
  const buffer = await res.arrayBuffer();

  const uploadsDir = path.join(os.tmpdir(), "pdf-uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const filePath = path.join(uploadsDir, crypto.randomUUID() + ".pdf");

  await fs.writeFile(filePath, Buffer.from(buffer));

  return filePath;
}

export default Gemini;