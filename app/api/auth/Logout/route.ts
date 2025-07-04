import { supabaseServerSide } from "@/utils/SupabaseDB/serverside/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookie = await cookies();
    const token = cookie.get('session_token');
     cookie.delete('session_token');
     const supabase = supabaseServerSide()
     const {error }  = await supabase.from('sessions').delete().eq('Token',token?.value).single()
     if(error) {
        console.log(error)
        return NextResponse.json({success:false})
     }
     return NextResponse.json({success:true})
}