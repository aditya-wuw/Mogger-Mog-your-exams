import { supabaseServer } from "@/utils/SupabaseDB/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req:Request) {
    const data = await req.json();
    const cookie = await cookies();
    if(!cookie.get('session_token')) return  NextResponse.json({success:false,message:"unAuthorized"},{status:500})
    try {
        const {error} = await supabaseServer.from('sessions').delete().eq('user_id',data.user_id);
        if(error) return NextResponse.json({success:false,message:"account failed to delete"},{status:500});
        // delete the the acount after verification 
        return NextResponse.json({success:true,message:"account deleted"},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false,message:"failed to delete account"},{status:500})
    }
}