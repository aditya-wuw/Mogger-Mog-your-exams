import { supabaseServer } from "@/utils/SupabaseDB/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const cookie = await cookies();
    if (!cookie.get('session_token')) return NextResponse.json({ success: false, message: "unAuthorized" }, { status: 500 });
    else {
        try {
            const { searchParams } = new URL(req.url);
            const uid: number = searchParams.get("user_id") as unknown as number;
            const { data } = await supabaseServer.from('notes_path').select('*').eq('user_id', uid);
            if (data) {
                for (let i = 0; i < data?.length; i++) {
                    if (data[i].is_used === false) {
                        const { error: notes_bucket_error } = await supabaseServer.storage.from('notes').remove([data[i].path]);
                        if (notes_bucket_error) {
                            console.log(notes_bucket_error)
                        }
                        const { error: path_table_error } = await supabaseServer.from('notes_path').delete().eq('id', data[i].id).single();
                        if (path_table_error) {
                            console.log(path_table_error)
                        }
                    }
                }
            }
            return NextResponse.json({ success: true, message: "upload cache cleared" }, { status: 200 })
        } catch (error) {
            console.log(error)
            return NextResponse.json({ success: false, message: "somthing went wrong while deleteing" }, { status: 500 })
        }
    }
}