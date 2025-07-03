import { validation_ } from "@/Types/server_side/types";
import { supabaseServerSide } from "@/utils/SupabaseDB/serverside/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { id, submitted_answers } = await req.json();
    console.log(id);
    const cookie = await cookies();
    if (!cookie.get("session_token")) return NextResponse.json({ success: false, message: "Unauthorized! login to perform action" }, { status: 404 });
    else {
        try {
            const supabase = supabaseServerSide();
            const { data } = await supabase.from('history').select('*').eq('id', id).single(); //for now just doing with the uid of the test for quick build but in final verson it should be with user email to uniquely identify each record
            console.log(data);
            const validated: Array<validation_> = submitted_answers.map((i: string, index: number) => {
                return (data.answers[index] === i) ? {
                    q_index: index,
                    given_answer: true,
                    correct_answer: data.answers[index]
                } : {
                    q_index: index,
                    given_answer: false,
                    correct_answer: data.answers[index]
                }
            })

            const res_details = {
                "qustions_details": data,
                "Validated_answers": validated
            }
            return NextResponse.json({success:true,message:res_details},{status:200});
        } catch (error) {
            console.log(error)
            return NextResponse.json({success:true,message:"somthing went wrong"},{status:500});
        }

    }

}