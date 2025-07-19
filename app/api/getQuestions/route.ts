import { supabaseServer } from "@/utils/SupabaseDB/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    try {
        const  { searchParams  } = new URL(request.url);
        const id:string|null = searchParams.get('id');
        const user_id:number|null = Number(searchParams.get('user_id'));
        const cookie = await cookies();
        if(cookie.get("session_token")) {
            const { data } = await supabaseServer.from('history').select('questions').eq('id',id).eq('user_id',user_id).single();
            if(data) {
                return NextResponse.json({success:true,message:data},{status:200})
            }
            else{
                return NextResponse.json({success:false,message:"can't find the questions"},{status:300})
            }
        }
        else{
            return NextResponse.json({success:false,message:"unAuthorized!"},{status:300})
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false},{status:500})
    }
}