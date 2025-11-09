import { createClient } from "@supabase/supabase-js";

const ProjectURL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const Service = process.env.NEXT_SERVICE_KEY as string;

const supabaseServerSide = () => createClient(ProjectURL, Service);

export const supabaseServer = supabaseServerSide(); 