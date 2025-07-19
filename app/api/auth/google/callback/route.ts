import { google_cred } from "@/Types/server_side/types";
import { NextResponse } from "next/server";
import { CreateSession } from "../../session/action";
import crypto from 'crypto'
import { supabaseServer } from "@/utils/SupabaseDB/supabase";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code")
    const err = searchParams.get("error");
    if(err === "access_denied") return NextResponse.redirect(`${process.env.NEXT_PUBLIC_baseURL}/auth_/login`);

    if (!code) {
        return NextResponse.json({ success: false, message: "No code provided" }, { status: 400 });
    }
    
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            code,
            client_id: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID!,
            client_secret: process.env.NEXT_PUBLIC_AUTH_GOOGLE_SECRET!,
            redirect_uri: process.env.NEXT_PUBLIC_baseURL + "/api/auth/google/callback",
            grant_type: "authorization_code",
        }),
    });
    const tokenData = await tokenRes.json();
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userData = await userRes.json();
    const { data } = await supabaseServer.from('users').select('email').eq('email', userData.email).single();
    if (data) {
        return await session(userData.email);
    }
    const creds: google_cred = {
        username: userData.name,
        email: userData.email,
        method: "Google",
        profile_pic: userData.picture
    }

    const { error } = await supabaseServer.from('users').insert(creds)
    if (error) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_baseURL}/auth_/login?error=failed`);
    }
    else {
        return await session(userData.email);
    }
}

async function session(userData:string) {
    const token = crypto.randomBytes(64).toString('hex');
    const week: number = Number(process.env.NEXT_PUBLIC_AGE);
    const response = NextResponse.redirect(process.env.NEXT_PUBLIC_baseURL + "/home");
    response.cookies.set('session_token', token, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * week
    });
    await CreateSession({ email: userData, token: token })
    return response;
}