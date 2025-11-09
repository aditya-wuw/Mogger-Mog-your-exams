import { supabaseServer } from "@/utils/SupabaseDB/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const cookie = await cookies();
        if (!cookie.get("session_token")) return NextResponse.json({ success: false, message: "unAuthorized" }, { status: 300 });
        const { searchParams } = new URL(request.url);
        const id: number = Number(searchParams.get("id"));
        const { data, error } = await supabaseServer.from("history").select("id,title").eq("user_id", id);
        if (error) return NextResponse.json({ success: false, message: "Somthing went wrong" }, { status: 404 });
        if (data) {
            return NextResponse.json({ success: true, message: data }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false }, { status: 500 });
    }

}