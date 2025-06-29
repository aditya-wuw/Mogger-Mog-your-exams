import { NextResponse } from "next/server";
import crypto from 'crypto';
import bcrypt from "bcryptjs"
import { supabaseServerSide } from "@/utils/SupabaseDB/serverside/supabase";
import { cred } from "@/Types/server_side/types";


export async function POST(req: Request) {
    const { name, email, password } = await req.json();
    const supabase = supabaseServerSide();
    try {
        const hasedpass = await bcrypt.hash(password,10);
        const credentials: cred = {username:name,email:email,password:hasedpass,method:"Email"}
        const { error } = await supabase.from("users").insert(credentials)
        if(error){
            console.log(error)
            return NextResponse.json({success:false,message:"somthing went wrong while sending data"},{status:500})
        }
        const token = crypto.randomBytes(64).toString('hex');
        const response = NextResponse.json({ success: true });
        response.cookies.set('session_token', token, {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 60 * 60 * 24
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

