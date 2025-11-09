import { sessiontypes } from "@/Types/server_side/types";
import { supabaseServer } from "@/utils/SupabaseDB/supabase";
import { NextResponse } from "next/server";

export async function CreateSession(creds: { email: string, token: string }) {
    const { email, token } = creds;
    if (!token) return NextResponse.json({ success: false, message: "unAuthorized!" }, { status: 404 });
    else {
        try {
            const { data, error } = await supabaseServer.from("users").select("id").eq("email", email).single();
            if (error) {
                console.log(error);
            }
            if (!data) return NextResponse.json({ success: false, message: "user invalid no user found" }, { status: 300 });
            else {
                await supabaseServer.from("sessions").delete().eq("user_id", data.id);
                const session: sessiontypes = {
                    Token: token,
                    user_id: data.id
                };
                const { error } = await supabaseServer.from("sessions").insert(session);
                if (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
            return NextResponse.json({ success: false, message: "failed to create session" }, { status: 500 });
        }
    }
}