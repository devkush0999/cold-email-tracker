import { supabase } from "../../lib/supabaseClient"

export async function GET() {
  const { data, error } = await supabase
    .from("companies")
    .select("*")

  return Response.json({ data, error })
}