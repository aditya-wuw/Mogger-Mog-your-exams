import {createClient} from "@supabase/supabase-js"

const ProjectURL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const Annon = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

export const supabaseClientSide = () => createClient(ProjectURL,Annon)
