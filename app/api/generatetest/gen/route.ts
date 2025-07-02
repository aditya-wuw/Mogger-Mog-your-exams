import { cookies } from "next/headers";
import { NextResponse } from "next/server"
import Gemini from "./Gemini";

export async function POST(req:Request) {
    try {
        const cookie = await cookies();
        if(!cookie.get('session_token')) {
            return NextResponse.json({success:false,message:"unauthorized ! Please login"},{status:304});
        }
        else{
            const { prompt } = await req.json();
            const res = await Gemini( prompt );
            return NextResponse.json({success:true,message:res},{status:201});
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false},{status:504});
    }
    
}