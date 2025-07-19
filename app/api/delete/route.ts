import { supabaseServer } from "@/utils/SupabaseDB/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request:Request) {
    try {
        const cookie = await cookies();
        if(!cookie){
            return NextResponse.json({success:false,message:"unAuthorized"},{status:300});
        }
        else{
            const { searchParams } = new URL(request.url);
            const id:string|null = searchParams.get('id');
            const user_id:string|null = searchParams.get('user_id');

            const { error } = await supabaseServer.from('history').delete().eq('id',id).eq('user_id',user_id).single();
            if(error){
                return NextResponse.json({success:false,message:"failed to delete item"},{status:300});
            }
            else{
                return NextResponse.json({success:true,message:"deleted"},{status:200});
            }
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,message:"Somthing went wrong"},{status:500});
    }
    
}