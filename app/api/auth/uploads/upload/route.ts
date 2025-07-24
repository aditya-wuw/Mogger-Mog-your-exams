import { uploads_notes } from "@/Types/server_side/types";
import { supabaseServer } from "@/utils/SupabaseDB/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const cookie = await cookies();
        if (!cookie.get('session_token')) {
            return NextResponse.json({ error: "unauthorized" }, { status: 500 })
        }
        const data = await req.formData();
        const file: File = data.get('Files') as File;
        const userid: string = data.get('userid') as string;

        const { data: prexisting_file } = await supabaseServer.from('notes_path').select('*').eq('file_name', file.name).single();
        if (prexisting_file) return NextResponse.json({ success: true, message: `https://qxfvaamdxsuiqolfuaqc.supabase.co/storage/v1/object/public/notes/${prexisting_file.path}` }, { status: 200 });
        if (!prexisting_file) {
            const upload: uploads_notes = {
                user_id: parseInt(userid),
                file_name: file.name,
                path: `${userid}/${file.name}-${Date.now()}-${crypto.randomUUID()}`
            }
            try {
                const { error: insertError } = await supabaseServer
                    .from("notes_path")
                    .insert(upload);
                if (insertError) {
                    console.error("Error inserting to notes_path:", insertError.message);
                    return NextResponse.json({ error: "Insert to index table failed" }, { status: 500 });
                }
            } catch (error) {
                console.log(error)
                return NextResponse.json({ error: "Somthing went wrong while saving data" }, { status: 500 })
            }
            try {
                await supabaseServer.storage.from('notes').update(upload.path, file, {
                    cacheControl: '3600',
                    upsert: false
                })
            } catch (error) {
                console.log(error)
                return NextResponse.json({ error: "Somthing went wrong while uplaoding" }, { status: 500 })
            }
            return NextResponse.json({ success: true, message: `https://qxfvaamdxsuiqolfuaqc.supabase.co/storage/v1/object/public/notes/${upload.path}` }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "failed to upload" }, { status: 500 })
    }
}