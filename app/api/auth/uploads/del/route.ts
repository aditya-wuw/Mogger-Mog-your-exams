import { supabaseServer } from "@/utils/SupabaseDB/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const Data = await req.json();
    const cookie = await cookies();
    if (!cookie.get("session_token")) return NextResponse.json({ success: false, error: "unAuthorized" }, { status: 404 });
    try {
        const { data } = await supabaseServer.from("notes_path").select("path").eq("user_id", Data.user_id).eq("file_name", Data.file_name).single();
        if (data) {
            const path: string = data.path as string;
            if (path) {
                const { data, error } = await supabaseServer.storage.from("notes").remove([path]);
                if (data) {
                    const { error } = await supabaseServer.from("notes_path").delete().eq("path", path);
                    if (error) return NextResponse.json({ success: false, message: "failed to delete file index" }, { status: 500 });
                    else return NextResponse.json({ success: true, message: "file deleted" }, { status: 200 });
                }
                if (error) return NextResponse.json({ success: false, message: "failed to delete file" }, { status: 500 });
            }
        }
        return NextResponse.json({ success: false, message: "no file found" }, { status: 404 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Failed to delete somthing went wrong!" }, { status: 500 });
    }
}