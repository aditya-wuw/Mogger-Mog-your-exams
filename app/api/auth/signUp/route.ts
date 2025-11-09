import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { cred } from "@/Types/server_side/types";
import { CreateSession } from "../session/action";
import { supabaseServer } from "@/utils/SupabaseDB/supabase";


export async function POST(req: Request) {
    const { name, email, password } = await req.json();
    try {
        const hasedpass = await bcrypt.hash(password, 10);
        const credentials: cred = { username: name, email: email, password: hasedpass, method: "Email" };
        const { data } = await supabaseServer.from("users").select("email").eq("email", email).single();
        if (data) {
            return NextResponse.json({ success: false, message: "account already exists" }, { status: 200 });
        }
        else {
            const { error } = await supabaseServer.from("users").insert(credentials);
            if (error) {
                console.log(error);
                return NextResponse.json({ success: false, message: "somthing went wrong while sending data" }, { status: 500 });
            }
            const token = crypto.randomBytes(64).toString("hex");
            const response = NextResponse.json({ success: true }, { status: 200 });
            response.cookies.set("session_token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24
            });
            const creds = {
                email: email,
                token: token
            };
            await CreateSession(creds);
            return response;
        }

    } catch (error) {
        console.log(error);
    }
}

