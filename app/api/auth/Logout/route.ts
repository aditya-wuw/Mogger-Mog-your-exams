import { supabaseServer } from "@/utils/SupabaseDB/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
   const cookie = await cookies();
   const token = cookie.get("session_token");
   cookie.delete("session_token");
   const { error } = await supabaseServer.from("sessions").delete().eq("Token", token?.value).single();
   if (error) {
      console.log(error);
      return NextResponse.json({ success: false });
   }
   return NextResponse.json({ success: true });
}