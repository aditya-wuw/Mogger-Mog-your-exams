import { supabaseServerSide } from "@/utils/SupabaseDB/serverside/supabase";
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const cookie = await cookies();
        if (cookie.get('session_token')) {
            const insertdata = await request.json();
            console.log(insertdata);
            const supabase = supabaseServerSide();
            const { error } = await supabase.from('feedback').insert(insertdata);
            if (error) {
                return NextResponse.json({ success: false, message: "somthing went wrong while sending" }, { status: 404 })
            }
            else {
                return NextResponse.json({ success: true, message: "Thank you for sending your feed back!" }, { status: 200 })
            }
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "failed to send" }, { status: 500 })
    }
}