import { supabaseServer } from "@/utils/SupabaseDB/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const cookie = await cookies();
    if (!cookie.get("session_token")) return NextResponse.json({ success: false, message: "unAuthorized" }, { status: 500 });

    const { path, user_id, value } = await req.json();
    try {
        const { error } = await supabaseServer.from("notes_path").update({ "is_used": value }).eq("user_id", user_id).eq("path", path).single();
        if (error) {
            console.log(error);
            return NextResponse.json({ success: true, message: "no file matched" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "updated flag" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Failed to update flag" }, { status: 500 });
    }
}