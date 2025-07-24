
import { supabaseServer } from "@/utils/SupabaseDB/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookie = await cookies();
    const token = cookie.get('session_token')
    if(!token?.value) return NextResponse.json({success:false,message:"unAuthorized"},{status:200});
    else{
        try {
            const {data, error } = await supabaseServer.from('sessions').select('user_id, users ( username, email, profile_pic)').eq('Token',token.value).single();
            if(error){
                console.log(error)
                cookie.delete('session_token');
                return NextResponse.json({success:false,message:"unAuthorized! no session found"},{status:200});
            }
            if(!data) return NextResponse.json({success:false,message:"unAuthorized! no session found"},{status:404});
            else{
                return NextResponse.json({success:true,message:data},{status:200});
            }
        } catch (error) {
            console.log(error)
            return NextResponse.json({success:false,message:"something went wrong"},{status:500});
        }
    }
    
}