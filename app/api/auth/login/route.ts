import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { CreateSession } from "../session/action";
import { supabaseServer } from "@/utils/SupabaseDB/supabase";
export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const { data, error } = await supabaseServer.from("users").select("*").eq("email", email).single();

        if (error) {
            console.log(error);
            return NextResponse.json({ success: false, message: "somthing went wrong! try again later" }, { status: 504 });
        }

        if (data === null) {
            return NextResponse.json({ success: false, message: "Account not found,user dosn't exist" }, { status: 404 });
        }

        const matched = await bcrypt.compare(password, data.password);
        if (matched) {
            const response = NextResponse.json({ success: true });
            const token = crypto.randomBytes(64).toString("hex");
            response.cookies.set("session_token", token, {
                httpOnly: true,
                secure: true,
                path: "/",
                sameSite: "lax",
                maxAge: 60 * 60 * 24
            });
            const creds = {
                email: email,
                token: token
            };
            await CreateSession(creds);
            return response;
        }
        else {
            return NextResponse.json({ success: false, message: "wrong password" }, { status: 401 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false }, { status: 400 });
    }

}