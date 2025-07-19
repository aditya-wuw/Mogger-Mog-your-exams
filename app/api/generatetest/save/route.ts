import { supabaseServer } from "@/utils/SupabaseDB/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const savedata = await req.json();
    const cookie = await cookies();
    if(!cookie.get("session_token"))return NextResponse.json({success:false, message:"Unauthorized! login to perform action"},{status:404});
    else{
        try {
            const {error} = await supabaseServer.from('history').insert(savedata);
            if(error){
                console.log(error)
                return NextResponse.json({success:false, message:"can't save data"},{status:404});
            }
            return NextResponse.json({success:true, message:"data saved"},{status:201});

        } catch (error) {
            console.log(error)
            return NextResponse.json({success:false, message:"504 somthing went wrong"},{status:504});
        }
    }
    
}